import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entry, Metadata } from './entries/entry';
import { Config } from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Technical Assessment - Test 2';
  apiURL = Config.API_URL

  entries: Entry[] = []
  items: Metadata[] = []
  includes: Record<string, Metadata[]> = {}

  constructor(private http: HttpClient) {
    this.fetchRestAPIEntries()
  }

  /**
   * Fetch Entries using REST API call
   */
  fetchRestAPIEntries() {
    this.getConfig().subscribe((data) => {
      this.items = data.items
      this.includes = data.includes

      this.items.forEach((item: Metadata) => {
        const seo = this.includes[item.sys['type']].find((include) => item.fields['seo'].sys.id === include.sys['id']);
        const template = this.includes[item.sys['type']].find((include) => item.fields['template'].sys.id === include.sys['id']);

        const entry = { ...item.fields }

        entry['seo'] = seo ? seo.fields : null
        entry['template'] = template ? template.fields : null

        this.entries.push(entry as Entry)
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
