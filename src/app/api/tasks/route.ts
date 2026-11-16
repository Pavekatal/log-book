import { getDb } from '../../../../lib/db';
import { TaskInput, TaskType } from '@/src/shared-types/sharedTypes';
import { NextResponse } from 'next/server';
import { extractUserIdFromRequest } from '../days/route';
import { error } from 'console';

export async function GET(): Promise<Response> {
  const db = await getDb();
  const rows = await db.all<TaskType[]>('SELECT * FROM tasks');

  // Приведем к нужному типу
  return NextResponse.json(rows as TaskType[]);
}

export async function POST(request: Request): Promise<Response> {
  // 1) проверяем авторизацию
  const userIdFromAuth = extractUserIdFromRequest(request);
  const body = (await request.json()) as TaskType;
  const userIdFinal = userIdFromAuth ?? body.userId ?? 'demo';

  if (!userIdFinal) {
    return NextResponse.json({ error: 'No authentication' }, { status: 401 });
  }

  // 2) проверяем обязательные поля, включая daiId
  if (!body?.title || !body.typeTask || !body.dayId) {
    return NextResponse.json(
      { error: 'title, typeTask and dayId are required' },
      { status: 400 },
    );
  }

  try {
    const id = body._id ?? crypto.randomUUID();
    const now = new Date().toISOString();
    const db = await getDb();

    // 3) Сохранеям задачу с привязкой в dayId и userId
    await db.run(
      `INSERT INTO tasks (_id, title, createDate, updateDate, deadline, progress, checked, typeTask, dayId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.createDate ?? now,
        body.updateDate ?? null,
        body.deadline ?? null,
        body.progress ?? '',
        typeof body.checked === 'boolean' ? (body.checked ? 1 : 0) : 0,
        body.typeTask,
        body.dayId, // привязка к текущему дню
        userIdFinal, // привязка к пользователю
      ],
    );

    return NextResponse.json({ id });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
