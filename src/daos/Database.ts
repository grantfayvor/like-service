import Page from "@entities/Page";

export default interface IDatabase {
  pages: {
    [key: string]: Page | undefined
  };
}