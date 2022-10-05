export interface Item {
  url: string,
  isShowVaButton: boolean,
  seo: {
    title: string,
    description: string,
    isNoIndex: boolean;
  },
  onsiteSearchIndexing: string[]
}

export interface EntryGraphQL {
  total: number,
  limit: number,
  items: Item[]
}