export function hasLetters(str) {
  return str.trim() !== "" && /[a-zA-Z]/.test(str);
}
