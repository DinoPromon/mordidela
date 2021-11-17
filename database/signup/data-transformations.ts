export const transformDate = (date: string) => {
  const fragmentedDate = date.split('/');
  fragmentedDate.reverse();
  const formatedDate = fragmentedDate.join('-');

  return formatedDate;
};

export const getDDDFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, '');
  return cleanedTelefone.substring(0, 2);
};

export const getNumberFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, '');
  return cleanedTelefone.substring(2);
};