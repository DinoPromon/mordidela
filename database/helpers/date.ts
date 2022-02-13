import { createDate } from "@utils/transformation/date";

export class DateOwner {
  protected getSerializedDate(date: Date | number | string | null) {
    if (date) {
      const newDate = createDate(date);
      return newDate.getTime();
    }
    return null;
  }
}
