function isValidAuth(str) {
  if (str.length < 6 || str.includes(' ')) {
    return false;
  } else return str;
}

export { isValidAuth };
