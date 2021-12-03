import { clearPhoneNumber } from "@utils/transformation/phone";

export function formatPhoneNumber(input: string) {
  const dddPattern = /^(\d{0,2})/g;
  const first5Match = /^(\d{5})/g;
  let formatedDDD = "";
  let phoneNumber = "";
  if (dddPattern.test(input)) {
    formatedDDD = `(${input.match(dddPattern)})`;
    phoneNumber = input.slice(2);
  }

  if (first5Match.test(phoneNumber)) {
    phoneNumber = `${phoneNumber.match(first5Match)}-${phoneNumber.slice(5)}`;
  }
  return `${formatedDDD} ${phoneNumber}`;
}

export function phoneNumberChangeHandler(curNumber: string, prevNumber: string) {
  const failPattern = /(\D)$/;
  const clearPattern = /[\s\(\)-]/g;

  if (curNumber.length < 2) return curNumber;
  if (curNumber === prevNumber.slice(0, -1)) return curNumber;

  const clearNumber = clearPhoneNumber(curNumber);
  if (failPattern.test(curNumber) || clearNumber.length > 11) return prevNumber;

  return formatPhoneNumber(clearNumber);
}
