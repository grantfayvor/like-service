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

  /**
   * Minimal Transactions API to implement READ/WRITE locks on particular collections 
   * in order to prevent race collections when multiple are trying to update the collection
   *  at the same time.
   * 
   * The API is built as a Promise so that internal waits can remain non-blocking and 
   * performance would not be hurt.
   * 
   * A while loop is used to implement a simplistic watch on the collections lock state and 
   * is only released when the collection is unlocked.
   * 
   * A callback is used to pass the transactional event that would run for each process.
   */
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