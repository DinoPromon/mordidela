export const emailValidation = (email: string) => {
  const regex = /^[\w][\w\d.]+@([\w]{3,}).([\w.]{3,})/;

  return !!email.trim().match(regex);
};

export const passwordValidation = (password: string) => {
  const regex = /\d+/g;

  return (password.trim().length > 8 && !!password.match(regex));
}