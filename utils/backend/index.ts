import mysql from "database";

export const getUserByEmail = async (email: string) => {
  const query = `SELECT email, senha FROM usuario WHERE email=?`;

  try {
    const result = await mysql.query(query, [email]);
    await mysql.end();

    return (result as { email: string, senha: string });
  } catch (e) {
    const error = e as Error;
    return null;
  }
};
