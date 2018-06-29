import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clientControl = new FormControl();
  clients: string[] = ['One', 'Two', 'Three']; //Need to update
  filteredClients: Observable<any[]>;

  constructor(
    private ClientService: ClientService,
  ) { }

  ngOnInit() {
    //this.getAllClients();
    this.filteredClients = this.clientControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAllClients() {
    this.ClientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(option => option.toLowerCase().includes(filterValue));
  }

}
