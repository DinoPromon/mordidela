export function removeAditionalSpaces(input: string) {
  input = input.trim();
  const duplicateSpacePattern = /\s+/g;
  return input.replace(duplicateSpacePattern, " ");
}
