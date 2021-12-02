export function cupomFormat(text: string) {
  const pattern = /[a-zA-Z0-9]$/;
  if (pattern.test(text)) return text.toLocaleUpperCase();
  return text.slice(0, text.length - 1);
}
