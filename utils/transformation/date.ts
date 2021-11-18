export const transformDateFromDBToClient = (databaseDate: string) => {
  const date = new Date(databaseDate);
  const clientDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

  return clientDate;
};