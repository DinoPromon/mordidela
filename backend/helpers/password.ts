import Bcrypt from "bcrypt";

export class PasswordHasher {
  private HASH_SALT = 10;

  constructor() {}

  public async hash(password: string) {
    const salt = await Bcrypt.genSalt(this.HASH_SALT);
    const hashedPassword = await Bcrypt.hash(password, salt);

    return hashedPassword;
  }

  public async compare(hashedPassword: string, password: string) {
    const salt = await Bcrypt.genSalt(this.HASH_SALT);
    const hash = await Bcrypt.hash(password, salt);

    return await Bcrypt.compare(hashedPassword, hash);
  }
}
