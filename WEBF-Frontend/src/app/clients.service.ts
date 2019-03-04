import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client';


const ROOT_URL = 'http://localhost:8080/admin/resources/clients';

@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  fetchClients(): Promise<Client[]> {
    return this.httpClient.get<Client[]>(ROOT_URL).toPromise();
  }

  create(client: Client): Promise<any> {
    return this. httpClient.post(ROOT_URL, client).toPromise();
  }

  search(name: string): Promise<Client[]> {
    return this.httpClient.get<Client[]>(ROOT_URL + '/' + name).toPromise();
  }

  delete(id: number): Promise<any> {
    return this.httpClient.delete<Client>(ROOT_URL + '/' + id).toPromise();
  }

  retrieve(id: number): Promise<Client> {
    return this.httpClient.get<Client>(ROOT_URL + '/' + id).toPromise();
  }

  update(client: Client): Promise<any> {
    return this.httpClient.put(ROOT_URL + '/' + client.id, client).toPromise();
  }

}
