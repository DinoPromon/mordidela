import { parse as uuidParse, stringify as uuidStringify, v4 } from "uuid";

export class UUIDParse {
  public static createStringUUID() {
    return v4();
  }

  public static createBinUUID() {
    return UUIDParse.getBinUUID(UUIDParse.createStringUUID());
  }

  public static getBinUUID(uuid: string) {
    return Buffer.from(uuidParse(uuid) as Array<number>);
  }

  public static getStringUUID(uuid: Buffer) {
    return uuidStringify(uuid);
  }
}
