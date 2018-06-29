import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clients: any[];

  constructor(
    private ClientService: ClientService,
  ) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.ClientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

}
