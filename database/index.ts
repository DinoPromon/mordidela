import Mysql from "serverless-mysql";

const mysql = Mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export function serialize<T>(data: T[]) {
  const array: T[] = [];
  for (const key in data) {
    array.push({ ...data[key] } as T);
  }
  return array;
}

export default mysql;
