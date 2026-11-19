import { getDb } from '@/lib/db';
import { DaysType, TaskType } from '@/src/shared-types/sharedTypes';
import { NextResponse } from 'next/server';

// Утилита для извлечения userId
export function extractUserIdFromRequest(req: Request): string | null {
  // через query param
  const url = new URL(req.url);
  const qUser = url.searchParams.get('userId');
  if (qUser) return qUser;

  // через cookie-токен
  const cookie = req.headers.get('cookie');

  if (!cookie) return null;

  const cookies = cookie.split(';').reduce(
    (acc, c) => {
      const [k, v] = c.trim().split('=');
      if (k && v) acc[k] = v;
      return acc;
    },
    {} as Record<string, string>,
  );

  const token = cookies['auth'];
  if (!token) return null;

  try {
    // формат base64(JSON {userId, ts})
    const json = Buffer.from(token, 'base64').toString();
    const payload = JSON.parse(json);
    return payload?.userId ?? null;
  } catch {
    return null;
  }
}

// API получение списка с пагинацией
export async function GET(req: Request): Promise<Response> {
  try {
    const db = await getDb();

    // 1) пагинация и параметры из URL
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '20'));
    const offset = (page - 1) * limit;

    // 2) авторизация с сидированным пользователем 'demo'
    const userIdFromQuery = extractUserIdFromRequest(req);
    const userIdFromUrl = url.searchParams.get('userId');
    const userIdFinal = userIdFromQuery ?? userIdFromUrl ?? 'demo';

    if (!userIdFinal) {
      return new Response(JSON.stringify({ error: 'No authentication' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3) получаем дни для пользователя с пагинацией
    const daysSql = `
  SELECT _idDay, currentDay
  FROM days 
  WHERE userId = ?
  ORDER BY currentDay DESC 
  LIMIT ? OFFSET ?
  `;
    const days = await db.all<{ _idDay: string; currentDay: string }[]>(
      daysSql,
      [userIdFinal, limit, offset],
    );

    const daysIds = days.map((d) => d._idDay);
    if (daysIds.length === 0) {
      return NextResponse.json<DaysType[]>([]);
    }

    // 4) получаем задачи по выбранным дням
    const placeholders = daysIds.map(() => '?').join(',');
    const tasksSql = `
  SELECT 
  t._id AS tid,
  t.title,
  t.createDate,
  t.updateDate,
  t.deadline,
  t.progress,
  t.checked,
  t.typeTask,
  t.dayId,
  t.userId
  FROM tasks t 
  WHERE t.dayId IN (${placeholders})
  AND t.userId = ? 
  ORDER BY t.dayId, t.createDate ASC
  `;

    const rows = await db.all<
      {
        tid?: string;
        title?: string;
        createDate?: string;
        updateDate?: string;
        deadline?: string | null;
        progress?: string;
        checked?: boolean;
        typeTask?: string;
        dayId?: string;
        userId?: string;
      }[]
    >(tasksSql, [...daysIds, userIdFinal]);

    // 5) группируем по дням
    const map = new Map<string, DaysType>();

    for (const d of days) {
      map.set(d._idDay, {
        _idDay: d._idDay,
        currentDay: d.currentDay,
        daily: [],
        current: [],
      });
    }

    for (const r of rows) {
      const dayObj = map.get(r.dayId!);
      if (!dayObj) continue;

      const task: TaskType = {
        _id: r.tid!,
        title: r.title!,
        createDate: r.createDate!,
        updateDate: r.updateDate,
        deadline: r.deadline ?? null,
        progress: r.progress,
        checked: Boolean(r.checked),
        typeTask: r.typeTask!,
        dayId: r.dayId,
        userId: r.userId,
      };

      if (r.typeTask === 'daily') dayObj.daily.push(task);
      else dayObj.current.push(task);
    }

    const result: DaysType[] = Array.from(map.values()).sort((a, b) =>
      a.currentDay < b.currentDay ? 1 : -1,
    );

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.log('GET /api/days error: ', error);
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// API добавление дня
export async function POST(req: Request): Promise<Response> {
  try {
    const db = await getDb();

    // читаем тело запроса
    const body = await req.json();
    const { date, userId } = body;

    // пытаемся получить userId из токена, если не пришел в теле запроса
    const userIdFromAuth = extractUserIdFromRequest(req);
    const userIdFinal = userIdFromAuth ?? userId ?? 'demo';

    if (!userIdFinal) {
      return new Response(JSON.stringify({ error: 'No authentication' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dayId = crypto.randomUUID();
    const currentDay = date ?? new Date().toISOString().slice(0, 10);

    // проверяем, создан ли уже такой день
    const existingDay = await db.get<{ _idDay: string }>(
      'SELECT _idDay FROM days WHERE currentDay = ? AND userId = ?',
      [currentDay, userIdFinal],
    );

    if (existingDay) {
      return NextResponse.json(
        { error: `День с датой ${currentDay} уже существует` },
        { status: 409 },
      );
    }

    // ищем последний созданный пользователем день
    const lastDay = await db.get<{ _idDay: string }>(
      'SELECT _idDay FROM days WHERE userId = ? ORDER BY currentDay DESC LIMIT 1',
      [userIdFinal],
    );

    // 1) создать день
    await db.run(
      'INSERT INTO days(_idDay, currentDay, userId) VALUES (?, ?, ?)',
      [dayId, currentDay, userIdFinal],
    );

    // 2) собрать задачи из вчерашнего дня
    // все daily-задачи, у все устанавливаем checked = 0
    // current-задачи, у котороых checked = 0
    const templates = lastDay
      ? await db.all<
          {
            _id: string;
            title: string;
            createDate?: string;
            updateDate?: string;
            deadline?: string | null;
            progress?: string;
            checked?: boolean;
            typeTask?: string;
          }[]
        >(
          `SELECT _id, title, createDate, updateDate, deadline, progress, checked, typeTask FROM tasks WHERE dayId = ? AND userId = ? AND (typeTask = 'daily' OR (typeTask = 'current' AND checked = 0))`,
          [lastDay._idDay, userIdFinal],
        )
      : [];

    // 3) скопировать задачи в новый день со сброшенным checked
    const now = new Date().toISOString();
    const createdDaily: TaskType[] = [];
    const createdCurrent: TaskType[] = [];

    for (const t of templates) {
      const newId = crypto.randomUUID();

      const type = t.typeTask ?? 'daily';

      await db.run(
        `INSERT INTO tasks( _id, title, createDate, updateDate, deadline, progress, checked, typeTask, dayId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newId,
          t.title,
          t.createDate,
          t.updateDate ?? null,
          t.deadline ?? null,
          t.progress ?? null,
          0, // checked = false
          type,
          dayId,
          userIdFinal,
        ],
      );

      const createdTask: TaskType = {
        _id: newId,
        title: t.title,
        createDate: t.createDate ?? now,
        updateDate: t.updateDate ?? undefined,
        deadline: t.deadline ?? null,
        progress: t.progress ?? undefined,
        checked: false,
        typeTask: type,
        dayId,
        userId: userIdFinal,
      };

      if (type === 'daily') createdDaily.push(createdTask);
      else createdCurrent.push(createdTask);
    }

    // 4) вернуть созданный день со списком задач
    return NextResponse.json({
      _idDay: dayId,
      currentDay,
      daily: createdDaily,
      current: createdCurrent,
    });
  } catch (error: unknown) {
    console.log('POST api/days error: ', error);
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
