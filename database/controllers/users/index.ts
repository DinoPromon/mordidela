import mysql from "database";
import Usuario from '@models/usuario';

export const getUserByEmail = async (email: string) => {
  const query = `SELECT email, senha, autorizacao, nome, id_usuario FROM usuario WHERE email=?`;
  try {
    const result = (await mysql.query(query, [email])) as any;
    await mysql.end();
    return result[0] as Usuario
  } catch (e) {
    const error = e as Error;
    return null;
  }
};
