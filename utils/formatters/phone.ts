import { clearPhoneNumber } from "@utils/transformation/phone";

export function formatPhoneNumber(input: string) {
  const dddPattern = /^(\d{0,2})/g;
  const number = /(\d{9})$/g;
  let formatedDDD = "";
  let phoneNumber = "";
  if (dddPattern.test(input)) {
    formatedDDD = `(${input.match(dddPattern)})`;
    phoneNumber = input.slice(2);
  }

  if (number.test(phoneNumber)) {
    phoneNumber = `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 9)}`;
  }
  return `${formatedDDD} ${phoneNumber}`;
}

export function phoneNumberChangeHandler(curNumber: string, prevNumber: string) {
  const failPattern = /(\D)$/;
  const clearNumber = clearPhoneNumber(curNumber);

  if (clearNumber.length < 2) return clearNumber;
  if (curNumber === prevNumber.slice(0, -1)) return curNumber;

  if (failPattern.test(curNumber) || clearNumber.length > 11) return prevNumber;

  return formatPhoneNumber(clearNumber);
}
