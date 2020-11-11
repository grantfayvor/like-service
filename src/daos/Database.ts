import Page from "@entities/Page";

interface Col {
  lock?: boolean;
}

interface PagesCol extends Col {
  [key: string]: Page | boolean | undefined;
}

export default interface IDatabase {
  pages: PagesCol;
}

// type transactionCb: function(next: function(value: any): void): void

export class Database implements IDatabase {
  public pages: PagesCol;

  constructor(pages: PagesCol) {
    this.pages = pages;
  }

  public withTransaction(colName: string, cb: (next: (value?: any) => void) => any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isValidProp(colName)) {
        return reject("Unrecognized collection name: " + colName);
      }

      const collection = this[colName] as Col;

      while (collection.lock) {
        continue;
      }

      collection.lock = true;
      cb(resolve);
      collection.lock = false;
    });
  }

  private isValidProp(prop: string): prop is keyof Database {
    return prop in this;
  }
}