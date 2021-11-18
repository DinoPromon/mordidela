import mysql from "database";

export const getUserByEmail = async (email: string) => {
  const query = `SELECT email, senha, autorizacao, nome, id_usuario FROM usuario WHERE email=?`;

  try {
    const result = (await mysql.query(query, [email])) as any;
    await mysql.end();
    return result[0] as {
      email: string;
      senha: string;
      id_usuario: string;
      autorizacao: string;
      nome: string;
    };
  } catch (e) {
    const error = e as Error;
    return null;
  }
};
