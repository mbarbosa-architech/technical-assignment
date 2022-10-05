import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { EntriesComponent } from './entries/entries.component';
import { FilterEntriesPipe } from './filter/filter-entries.pipe'

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    FilterEntriesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
