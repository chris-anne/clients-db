import { ClientsService } from './../clients.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Client } from '../client';

@Component({
  selector: 'app-client-list',
  template: `
  <form>
    <div class="form-group">
      <input type="text" class="form-control" name="searchTerm" placeholder="Search By Name" style="width:300px" [(ngModel)]="searchTerm" />
    </div>
  </form>
    <div id="clientList">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vorname</th>
            <th scope="col">Nachname</th>
            <th scope="col">Geburtstag</th>
            <th scope="col">aktiviert</th>
            <th></th>
            <th></th>
           </tr>
         </thead>
         <tbody>
          <tr *ngFor="let client of selectedClients">
            <td>{{client.id}}</td>
            <td>{{client.firstname}}</td>
            <td>{{client.lastname}}</td>
            <td>{{client.birthday | date: 'dd.MM.yyyy'}}</td>
            <td>{{client.activated}}</td>
            <td><button type="button" class="btn btn-outline-primary" (click)="editClient(client)">bearbeiten</button></td>
            <td><button type="button" class="btn btn-outline-danger" (click)="deleteClient(client)">löschen</button></td>
          </tr>
        </tbody>
        </table>
    </div>
    <button type="button" class="btn btn-primary" id="ClientAdd" (click)="addClient()">Neuen Kunden erstellen</button>
  `,
  styles: []
})
export class ClientListComponent implements OnInit {
  @Output() private edit = new EventEmitter<number>();
  @Output() private add = new EventEmitter();
  clients: Client[];
  selectedClients: Client[];

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.selectedClients = this.searchClients(value);
  }

  searchClients(searchString: string) {
    return this.clients.filter(client =>
      client.firstname.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
        || client.lastname.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {

    // this.selectedClients = this.clients;
    this.refresh();

  }

  refresh() {
    this.clientsService.fetchClients()
      .then(clients => this.clients = clients)
      .then(clients => this.selectedClients = this.clients);
  }

  deleteClient(client: Client) {
    if (confirm('Wollen Sie diesen Kunden wirklich löschen?')) {
      this.clientsService.delete(client.id)
      .then(() => this.refresh());
    }
  }

  editClient(client: Client) {
    this.edit.emit(client.id);
  }

  addClient() {
    this.add.emit();
  }
}
