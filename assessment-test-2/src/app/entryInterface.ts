export interface IEntry {
  isShowVaButton: boolean;
  onsiteSearchIndexing: string[];
  seo: {
    entryTitle: string;
    description: string;
    isNoIndex: boolean;
    title: string;
  }
  template: any;
  url: string;
}