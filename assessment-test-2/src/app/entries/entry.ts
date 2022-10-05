export interface Metadata {
  fields: Record<string, any>;
  metadata: Record<string, any>;
  sys: Record<string, any>;
}
export interface Seo {
  entryTitle: string;
  description: string;
  isNoIndex: boolean;
  title: string;
}

export interface Entry {
  isShowVaButton: boolean;
  onsiteSearchIndexing: string[];
  seo?: Seo;
  template?: Record<string, any>;
  url: string;
}