import Page from "@entities/Page";
import { Database } from "@daos/Database";

class PageDao {

  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public add(page: Page): Page {
    this.db.pages[page.id] = page;
    return page;
  }

  public update(pageId: string): Promise<Page | undefined> {
    return this.db.withTransaction("pages", next => {
      const page = this.getPageById(pageId);
      if (!page) return;

      page.noOfLikes += 1;
      next(page);
    })
      .then(res => res as Page | undefined);
  }

  public getPageById(pageId: string): Page | undefined {
    const page = this.db.pages[pageId];
    if (!page || typeof page === "boolean") return;

    return page;
  }
}

export default PageDao;