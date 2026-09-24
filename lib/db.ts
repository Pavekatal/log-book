import path from 'path';
import fs from 'fs';
import os from 'os';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const DB_DIR = path.join(os.homedir(), '.log-book');
const DB_PATH = path.join(DB_DIR, 'log-book.db');
let dbPromise: Promise<Database> | null = null;

export async function getDbInstance(): Promise<Database> {
  // Если инциализация уже запущена или заевршена, возвращаем этот же промис
  if (!dbPromise) {
    dbPromise = (async () => {
      // Создаем директорию, если ее нет
      await fs.promises.mkdir(DB_DIR, { recursive: true });

      // Открываем БД
      const db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
      });

      // Создаем таблицу
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

      return db;
    })();
  }

  return dbPromise;
}

export { getDbInstance as getDb };
