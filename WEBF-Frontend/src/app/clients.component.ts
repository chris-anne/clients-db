import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  template: `
  <h1>Kundenverwaltung</h1>

  <app-client-list #list (add)="input.startAddingClient()" (edit)="input.startEditingClient($event)"></app-client-list>
  <app-client-edit #input (ok)="list.refresh()"></app-client-edit>
  `,
  styles: []
})
export class ClientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
