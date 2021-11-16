import mysql from "database";

export const getUserByEmail = async (email: string) => {
  const query = `SELECT email, senha FROM usuario WHERE email=?`;

  try {
    const result = await mysql.query(query, [email]) as any;
    await mysql.end();
    console.log(result);
    return (result[0] as { email: string, senha: string });
  } catch (e) {
    const error = e as Error;
    return null;
  }
};
