import Page from "@entities/Page";
import IDatabase from "@daos/Database";

class PageDao {

  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  public add(page: Page): Page {
    this.db.pages.push(page);
    return page;
  }

  public update(pageId: string): Page|undefined {
    const page = this.getPageById(pageId);
    if (!page) return;

    page.noOfLikes += 1;
    return page;
  }

  public getPageById(pageId: string): Page|undefined {
    return this.db.pages.find(page => page.id === pageId);
  }
}

export default PageDao;