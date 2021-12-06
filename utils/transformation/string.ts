export function removeSpaces(string: string) {
  return string.replaceAll(" ", "-");
}

export function toCamelCase(string: string) {
  const pattern = /^[a-z]/;
  if (pattern.test(string)) {
    const firstLetter = string.charAt(0);
    return firstLetter.toUpperCase() + string.slice(1);
  }

  return string;
}
