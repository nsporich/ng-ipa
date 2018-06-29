import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter, debounceTime } from 'rxjs/operators';
import { ClientService, Client } from '../../services/client.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clients: Client[];
  clientControl = new FormControl();
  filteredClients: Observable<any[]>;

  //Table Columns
  displayedColumns: string[] = ['id', 'alias', 'companyName', 'appleCertificate', 'activationName', 'activationCode', 'profileFolder', 'active'];

  
  // TEST_DATA: Client[] = [
  //   {id: 1, CompanyName:"Casamba, Inc.", Alias:"casqa", AppleCertificate:"Casamba, Inc.", ActivationName:"casqaPro", ActivationCode:"casqa2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"Casamba", Active: true}, 
  //   {id: 2, CompanyName:"Adams County", Alias:"ACMH", AppleCertificate:"Adams County Medical", ActivationName:"ACMHPro", ActivationCode:"ACMH2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"ACMH", Active: true},
  //   {id: 3, CompanyName:"EnduraCare", Alias:"Endura", AppleCertificate:"Casamba, Inc.", ActivationName:"EnduraPro", ActivationCode:"Endura2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"Casamba", Active: true},
  //   {id: 4, CompanyName:"HealthPRO", Alias:"Heritage", AppleCertificate:"Heritage", ActivationName:"HeritagePro", ActivationCode:"Heritage2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"Heritage", Active: true},
  //   {id: 5, CompanyName:"Rehab Care", Alias:"Kindred", AppleCertificate:"Casamba, Inc.", ActivationName:"KindredPro", ActivationCode:"Kindred2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"Casamba", Active: true},
  //   {id: 6, CompanyName:"SynerTx", Alias:"SynerTx", AppleCertificate:"Casamba, Inc.", ActivationName:"SynerTxPro", ActivationCode:"SynerTx2018", EncryptedName:"", EncryptedCode:"", ProfileFolder:"Casamba", Active: true}
  // ]

  
  constructor(
    private ClientService: ClientService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllClients();
  }
  
  getAllClients() {
    this.ClientService.getAllClients().subscribe(clients => {
      this.clients = clients;

      this.filteredClients = this.clientControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => this._filter(value))
      );
    });
  }

  //Filter Function
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clients
        .filter(client => client.CompanyName ? client.CompanyName.toLowerCase().includes(filterValue) : false)
        .map(client => client.CompanyName);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
