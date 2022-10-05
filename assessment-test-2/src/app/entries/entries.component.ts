import { Component, OnInit } from '@angular/core';

import { Config } from './../config/config';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  jsonFromData: any[] = []
  graphQLEntries: any = {}
  currentPage: number = Config.DEFAULT_PAGE_NUMBER
  titleInput: string = ''

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.fetchEntries()
  }

  fetchEntries() {
    this.entryService.fetchGraphQLEntries({ limit: 10, skip: (this.currentPage - 1) * 10, title: this.titleInput })
      .subscribe(({ data }) => {
        this.graphQLEntries = data.pageTemplateCollection
        this.jsonFromData = this.entryService.contentToJson(this.graphQLEntries.items)
      });
  }

  getCategoriesValues(categoryMap: any) {
    return Object.values(categoryMap).join(` ${Config.CATEGORY_WORD_SEPARATOR} `)
  }
}
