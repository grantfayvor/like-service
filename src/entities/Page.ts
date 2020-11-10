export interface IPage {
  id: string;
  name: string;
  noOfLikes: number;
}

class Page {
  public id: string;
  public name: string;
  public noOfLikes: number;

  constructor(page: IPage) {
    this.id = page.id || Math.random().toString(32).replace(/^0./, "");
    this.name = page.name;
    this.noOfLikes = page.noOfLikes || 0;
  }
}

export default Page;