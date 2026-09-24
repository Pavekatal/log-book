import { getDb } from '../../../../lib/db';
import { TaskInput, TaskType } from '@/src/shared-types/sharedTypes';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  const db = await getDb();
  const rows = await db.all<TaskType[]>('SELECT * FROM tasks');

  // Приведем к нужному типу
  return NextResponse.json(rows as TaskType[]);
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as TaskInput;

  if (!body?.title || !body.typeTask) {
    return NextResponse.json(
      { error: 'title and typeTask are required' },
      { status: 400 },
    );
  }
  try {
    const id =
      body._id ?? Date.now().toString() + Math.random().toString(16).slice(2);
    const now = new Date().toISOString();
    const db = await getDb();

    await db.run(
      `INSERT INTO tasks (_id, title, createDate, updateDate, deadline, progress, checked, typeTask) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.createDate ?? now,
        body.updateDate ?? null,
        body.deadline ?? null,
        body.progress ?? '',
        typeof body.checked === 'boolean' ? (body.checked ? 1 : 0) : 0,
        body.typeTask,
      ],
    );

    return NextResponse.json({ id });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
