import mv from "mv";
import type { File as FormidableFile } from "formidable";

export class ImageHandler {
  private _path = "./public/images/products";
  private file: FormidableFile;

  constructor(file: FormidableFile, directoryPath?: string) {
    this.file = file;
    if (directoryPath) this._path = directoryPath;
  }

  protected getFileExtension() {
    if (!this.file.originalFilename) return null;

    const splittedName = this.file.originalFilename.split(".");
    console.log(splittedName);
    const extension = splittedName[splittedName.length - 1];

    return extension;
  }

  public getFileName(newName?: string) {
    if (newName) {
      const fileExtension = this.getFileExtension();
      if (fileExtension) return `${newName}.${fileExtension}`;
    }

    return this.file.originalFilename;
  }

  moveToPublic(newName?: string) {
    const oldPath = this.file.filepath;
    const newPath = `${this._path}/${this.getFileName(newName)}`;

    let moved = true;
    mv(oldPath, newPath, (err) => {
      if (err) moved = false;
    });

    return moved;
  }
}
