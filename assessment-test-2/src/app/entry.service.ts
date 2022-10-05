import { Config } from './config/config';
import { GET_ENTRY } from './graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private apollo: Apollo) { }

  fetchGraphQLEntries(params: { limit: number, skip: number, title: string }) {
    return this.apollo.watchQuery<any>({
      query: GET_ENTRY,
      variables: params
    }).valueChanges
  }

  contentToJson(data: any) {
    let contentJson: any[] = []
    if (data) {
      contentJson = data.map((result: any) => {
        return {
          url: `${Config.BASE_URL}${result.url.replace(Config.HOME_PATH_URL, '')}`,
          title: result.seo.title.replace(Config.TITLE_REPLACE.FROM, Config.TITLE_REPLACE.TO).trim(),
          description: result.seo.description.substring(0, Config.DESC_SIZE),
          isNoIndex: result.seo.isNoIndex || null,
          category: this.extractCategoryFromURL(result.url)
        }
      })
    }
    return contentJson
  }

  extractCategoryFromURL(url: string) {
    return url.replace(Config.HOME_PATH_URL, '')
      .split(Config.CATEGORY_SEPARATOR)
      .reduce((accumulator: any, currentValue: string, index: number) => {
        return index > Config.TOTAL_CATEGORIES ? accumulator : {
          ...accumulator,
          [index]: currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
        }
      })
  }
}
