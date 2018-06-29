import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable()

export class ClientService {

  constructor(private http: Http) { }

  getAllClients() {
    return this.http.get('api/clients')
      .pipe(map(res => res.json()));
  }

}
