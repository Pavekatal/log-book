import path from 'path';
import fs from 'fs';
import os from 'os';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const DB_DIR = path.join(os.homedir(), '.log-book');
const DB_PATH = path.join(DB_DIR, 'log-book.db');
let dbPromise: Promise<Database> | null = null;

async function schemaDb(db: Database) {
  await db.exec(`PRAGMA foreign_keys = ON;`);

  // Создаем таблицу users
  await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
   _id TEXT PRIMARY KEY,
   username TEXT NOT NULL, 
   login TEXT NOT NULL UNIQUE)
    `);

  // Создаем таблицу days
  await db.exec(`
      CREATE TABLE IF NOT EXISTS days (
        _idDay TEXT PRYMARY KEY,
        currentDay TEXT,
        userId TEXT,
        FOREIGN KEY (userId) REFERENCES users(_id)
      )
      `);

  // Таблица tasks: добавляем dayId, если его еще нет
  const cols = await db.all<{ name: string }[]>('PRAGMA table_info(tasks)');
  const hasDayId = cols?.some((c) => c.name === 'dayId');

  if (!hasDayId) {
    await db.exec(`ALTER TABLE tasks ADD COLUMN dayId TEXT`);
  }

  const hasUserId = cols?.some((c) => c.name === 'userId');

  if (!hasUserId) {
    await db.exec(`ALTER TABLE tasks ADD COLUMN userId TEXT`);
  }

  // Индексируем для быстрого поиска
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_days_userid ON days(userId)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_tasks_dayid ON tasks(dayId)`);

  // Сидируем тестового пользователя для тестирования
  const user = await db.get('SELECT 1 FROM users WHERE _id = ?', ['demo']);

  if (!user) {
    await db.run('INSERT INTO users(_id, username, login) VALUES (?, ?, ?)', [
      'demo',
      'Demo User',
      'firstuser',
    ]);
  }
}

async function getDbInternal(): Promise<Database> {
  // Создаем директорию, если ее нет
  await fs.promises.mkdir(DB_DIR, { recursive: true });

  // Открываем БД
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  // Создаем таблицу tasks
  await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
        _id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        createDate TEXT,
        updateDate TEXT,
        deadline TEXT,
        progress TEXT,
        checked INTEGER DEFAULT 0,
        typeTask TEXT NOT NULL CHECK(typeTask IN ('daily', 'current'))
        )`);

  // инициализация схемы (если она еще не была выполнена)
  await schemaDb(db);
  return db;
}

export async function getDb(): Promise<Database> {
  // Если инциализация уже запущена или заевршена, возвращаем этот же промис
  if (!dbPromise) {
    dbPromise = getDbInternal();
  }
  return dbPromise;
}
