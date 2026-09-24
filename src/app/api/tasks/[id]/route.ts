import { getDb } from '../../../../../lib/db';
import { TaskType } from '@/src/shared-types/sharedTypes';
import { error } from 'console';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const db = await getDb();
    const task = await db.get<TaskType>(
      'SELECT * FROM tasks WHERE _id = ?',
      id,
    );

    if (!task) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json(task as TaskType);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  contex: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await contex.params;
    const body = await request.json();
    const db = await getDb();

    // Собираем только те поля, которые пришли в запросе
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    // Поля для обновления
    const allowedFields = [
      'title',
      'deadline',
      'progress',
      'checked',
      'typeTask',
    ];

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updates.push(`${key} = ?`);

        if (key === 'checked' && typeof body[key] === 'boolean') {
          values.push(body[key] ? 1 : 0);
        } else {
          values.push(body[key]);
        }
      }
    }

    // Если в запросе пустой JSON
    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 },
      );
    }

    // Всегда обновляем дата изменения задачи
    updates.push(`updateDate = ?`);
    values.push(new Date().toISOString());

    // Добавляем id  в конец массива параметров (для WHERE _id = ?)
    values.push(id);

    const sql = `UPDATE tasks SET ${updates.join(',')} WHERE _id = ?`;

    const result = await db.run(sql, values);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ succes: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const db = await getDb();

    const result = await db.run('DELETE FROM tasks WHERE _id = ?', id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
