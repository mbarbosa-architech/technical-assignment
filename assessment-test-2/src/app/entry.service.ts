import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { GET_ENTRY } from './graphql/graphql.queries';
import { EntryJson } from './entries/entryJson';
import { Item } from './entries/entryGraphQL';
import { Config } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private apollo: Apollo) { }

  /**
   * Fetches the entries using GraphQL
   * based on the amount of items per page, current page, and filter by title.
   * @param params limit, skip, title
   * @returns Observable
   */
  fetchGraphQLEntries(params: { limit: number, skip: number, title: string }) {
    return this.apollo.watchQuery<any>({
      query: GET_ENTRY,
      variables: params
    }).valueChanges
  }

  /**
   * Returns the GraphQL data in a specific JSON format
   * @param data 
   * @returns 
   */
  contentToJson(data: Item[]) {
    let contentJson: EntryJson[] = []

    if (data) {
      contentJson = data.map((result: Item) => {
        return {
          url: `${Config.BASE_URL}${result.url.replace(Config.HOME_PATH_URL, '')}`,
          title: result.seo.title.replace(Config.TITLE_REPLACE.FROM, Config.TITLE_REPLACE.TO).trim(),
          description: result.seo.description.substring(0, Config.DESC_SIZE),
          isNoIndex: result.seo.isNoIndex,
          category: this.extractCategoryFromURL(result.url)
        }
      })
    }
    return contentJson
  }

  /**
   * Formats the category with the first and second keywords after /home 
   * with the first letter capitalized
   * @param url URL string
   * @returns 
   */
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
