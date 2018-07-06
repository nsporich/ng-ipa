import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';


export interface Client {
  id: number,
  Alias: string,
  CompanyName: string,
  AppleCertificate: string,
  ActivationName: string,
  ActivationCode: string,
  EncryptedName: string,
  EncryptedCode: string,
  ProfileFolder: string,
  Active: boolean
}


@Injectable()

export class ClientService {

  constructor(private http: Http) { }

  getAllClients() {
    return this.http.get('api/clients')
      .pipe(map(res => res.json()));
  }


  updateClient(client: Client): Observable<Client[]> {
    return this.http.put('api/clients/' + client.id, client)
      .pipe(
        map(x => <Client[]>x.json())
      );
  }

  newClient(data: Client): Observable<Client[]> {
    return this.http.post('api/clients', data)
      .pipe(
        map(x => <Client[]>x.json())
      );;
  }
}
