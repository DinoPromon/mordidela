export const treatErrorMessage = (message: string) => {
  const splittedMessage = message.split(' ');
  splittedMessage.shift();
  return splittedMessage.join(' ');
};