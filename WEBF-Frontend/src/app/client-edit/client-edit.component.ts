import { ClientsService } from '../clients.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Client } from '../client';
import * as $ from 'jquery';

@Component({
  selector: 'app-client-edit',
  template: `
    <form *ngIf="client">
      <h2>{{client.id ? 'Bearbeite Kunden:' : 'Erstelle neuen Kunden:'}}</h2>
      <p *ngIf="client.id">
        <label for="id">ID:</label>
        <input type="number" [value]="client.id" id="id" name="id" readonly>
      </p>
      <p>
        <label for="firstname">Vorname: </label>
        <input [(ngModel)]="client.firstname" id="firstname" name="firstname" required minlength="2">
      </p>
      <p>
        <label for="lastname">Nachname: </label>
        <input [(ngModel)]="client.lastname" id="lastname" name="lastname" required minlength="2">
      </p>
      <p>
        <label for="birthday">Geburtstag: </label>
        <input type="date" [(ngModel)]="client.birthday" id="birthday" name="birthday">
      </p>
      <p>
        <label for="activated">Aktiviert: </label>
        <input type="checkbox" [(ngModel)]="client.activated" id="activated" name="activated">
      </p>
      <p>
        <button class="btn btn-outline-primary" (click)="finishWithOk()">Ok</button>
        <button class="btn btn-outline-danger" (click)="finishWithCancel()">Abbrechen</button>
      </p>
    </form>
  `,
  styles: [`
    form {
      margin-top: 15px;
    }
    button {
      margin-right: 5px;
    }
  `]
})
export class ClientEditComponent implements OnInit {
  @Output() ok = new EventEmitter<Client>();
  @Output() cancel = new EventEmitter();
  client: Client;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
  }

  startEditingClient(id: number) {
    this.clientsService.retrieve(id).then(
      client => this.client = client
    );
  }

  startAddingClient() {
    this.client = new Client();
  }

  finishWithOk() {
    this.updateOrCreate().then(
      () => {
        this.ok.emit(this.client);
        this.client = null;
      }
    );
  }

  finishWithCancel() {
    this.cancel.emit();
    this.client = null;
  }

  updateOrCreate() {
    if (this.client.id) {
      return this.clientsService.update(this.client);
    } else {
      return this.clientsService.create(this.client);
    }

  }


}
