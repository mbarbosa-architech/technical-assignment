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
          url: `https://www.rogers.com${result.url.replace('/home', '')}`,
          title: result.seo.title.replace('| Rogers', '- Rogers').trim(),
          description: result.seo.description.substring(0, 80),
          isNoIndex: result.seo.isNoIndex || null,
          category: result.url.replace('/home', '')
            .replaceAll('-', ' ')
            .split('/')
            .reduce((accumulator: any, currentValue: string, index: number) => {
              return index > 2 ? accumulator : {
                ...accumulator,
                [index]: currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
              }
            })
        }
      })
    }
  }

  getCategories(categoryMap: any) {
    return Object.values(categoryMap).join(' - ')
  }

}
