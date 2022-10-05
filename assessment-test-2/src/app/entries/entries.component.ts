import { Config } from './../config/config';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { GET_ENTRY } from './../graphql/graphql.queries';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit, OnDestroy {
  graphQLEntries: any
  jsonFromData: any[] = []

  currentPage: number = Config.DEFAULT_PAGE_NUMBER

  titleInput: string = ''

  private querySubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.fetchGraphQLEntries()
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  fetchGraphQLEntries() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ENTRY
    }).valueChanges.subscribe(({ data }) => {
      this.graphQLEntries = data.pageTemplateCollection.items
      this.contentToJson(this.graphQLEntries)
    });
  }

  contentToJson(data: any) {
    if (data) {
      this.jsonFromData = data.map((result: any) => {
        return {
          url: `${Config.BASE_URL}${result.url.replace(Config.HOME_PATH_URL, '')}`,
          title: result.seo.title.replace(Config.TITLE_REPLACE.FROM, Config.TITLE_REPLACE.TO).trim(),
          description: result.seo.description.substring(0, Config.DESC_SIZE),
          isNoIndex: result.seo.isNoIndex || null,
          category: this.extractCategoryFromURL(result.url)
        }
      })
    }
  }

  extractCategoryFromURL(url: string) {
    return url.replace(Config.HOME_PATH_URL, '')
      .replaceAll(Config.CATEGORY_WORD_SEPARATOR, ' ')
      .split(Config.CATEGORY_SEPARATOR)
      .reduce((accumulator: any, currentValue: string, index: number) => {
        return index > Config.TOTAL_CATEGORIES ? accumulator : {
          ...accumulator,
          [index]: currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
        }
      })
  }

  getCategoriesValues(categoryMap: any) {
    return Object.values(categoryMap).join(` ${Config.CATEGORY_WORD_SEPARATOR} `)
  }

}
