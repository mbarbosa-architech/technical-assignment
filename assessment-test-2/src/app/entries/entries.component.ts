import { Component, OnInit } from '@angular/core';

import { Config } from './../config/config';
import { EntryJson } from './entryJson';
import { EntryGraphQL } from './entryGraphQL';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  jsonFromData: EntryJson[] = []
  graphQLEntries?: EntryGraphQL = undefined;
  currentPage: number = Config.DEFAULT_PAGE_NUMBER
  titleInput: string = ''
  itemsPerPage: number = Config.ITEMS_PER_PAGE

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.fetchEntries()
  }

  fetchEntries() {
    this.entryService.fetchGraphQLEntries({ limit: this.itemsPerPage, skip: (this.currentPage - 1) * this.itemsPerPage, title: this.titleInput })
      .subscribe(({ data }) => {
        this.graphQLEntries = data.pageTemplateCollection
        if (this.graphQLEntries) {
          this.jsonFromData = this.entryService.contentToJson(this.graphQLEntries.items)
        }
      });
  }

  getCategoriesValues(categoryMap: Record<number, string>) {
    return Object.values(categoryMap).join(` ${Config.CATEGORY_WORD_SEPARATOR} `)
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber
    this.fetchEntries()
  }
}
