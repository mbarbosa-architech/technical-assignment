import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEntry } from './entryInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Technical Assessment - Test 2';
  apiURL = 'https://cdn.contentful.com/spaces/8utyj17y1gom/entries?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37&content_type=pageTemplate&include=1&fields.url=%2Fhome%2Fsupport'

  entries: IEntry[] = []
  items: any = []
  includes: any = []

  constructor(private http: HttpClient) {
    this.fetchRestAPIEntries()
  }

  /**
   * Fetch Entries using REST API call
   */
  fetchRestAPIEntries() {
    this.getConfig().subscribe((data: any) => {
      this.items = data.items
      this.includes = data.includes

      this.items.forEach((item: any) => {
        const seo: any = this.includes[item.sys.type].find((include: any) => item.fields.seo.sys.id === include.sys.id);
        const template: any = this.includes[item.sys.type].find((include: any) => item.fields.template.sys.id === include.sys.id);

        const entry = { ...item.fields }

        entry.seo = seo ? seo.fields : null
        entry.template = template ? template.fields : null

        this.entries.push(entry)
      });
    })
  }

  /**
   * Formatting GET request
   * @returns subscribe
   */
  getConfig() {
    return this.http.get<any>(this.apiURL);
  }
}
