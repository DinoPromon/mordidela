export const getDDDFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, "");
  return cleanedTelefone.substring(0, 2);
};

export const getNumberFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, "");
  return cleanedTelefone.substring(2);
};

export function clearPhoneNumber(number: string) {
  const clearPattern = /[\s\(\)-]/g;
  if (!number.length) return number;
  return number.replaceAll(clearPattern, "");
}
