export interface EntryJson {
  url: string;
  title: string;
  description: string;
  isNoIndex: boolean;
  category: Record<number, string>
}