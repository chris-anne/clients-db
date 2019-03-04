import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
