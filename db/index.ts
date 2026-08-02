import Database, { Database as DatabaseType } from "better-sqlite3";
import fs from "fs";
import path from "path";

const schemaPath = path.resolve(process.cwd(), "db", "schema.sql");
const defaultDatabasePath = path.resolve(process.cwd(), "db", "todo.db");

export function initializeDatabase(databasePath = defaultDatabasePath): DatabaseType {
  const db = new Database(databasePath);
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schemaSql);
  return db;
}

const db = initializeDatabase();
export default db;
