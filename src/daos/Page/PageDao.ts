import { IPage } from "@entities/Page";
import IDatabase from "@daos/Database";

class PageDao {

  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  public add(page: IPage): IPage {
    this.db.pages.push(page);
    return page;
  }

  public updatePageLikes(pageId: string): IPage|undefined {
    const page = this.getPageById(pageId);
    if (!page) return;

    page.noOfLikes += 1;
  }

  public getPageById(pageId: string): IPage|undefined {
    return this.db.pages.find(page => page.id === pageId);
  }
}

export default PageDao;