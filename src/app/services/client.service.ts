import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";

export interface Client {
  id: number,
  CompanyName: string,
  Alias: string,
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

}
