import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientService, Client } from '../../services/client.service';
import { MatTableDataSource, MatDialog, Sort } from '@angular/material';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clients: Client[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['alias', 'companyName', 'appleCertificate', 'activationName', 'activationCode', 'profileFolder', 'active'];

  constructor(
    private ClientService: ClientService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllClients();
  }
  
  // OnInit GET Request
  getAllClients() {
    this.ClientService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource = new MatTableDataSource(this.clients);
    });
  }


  // Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Click Functions
  onRowClicked(row) {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {client: { ...row }, isNew: false}
    });
    dialogRef.afterClosed().subscribe(modalResult => {
      if (modalResult) {
        modalResult.obs$.subscribe(clients => {
          row = Object.assign(row, modalResult.row);
          this.cdr.detectChanges();
        });
      }
    });
  }

  onClickNew() {
    let row = {};
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {client: row, isNew: true}
    });
    dialogRef.afterClosed().subscribe(clients$ => {
      if (clients$) {
        clients$.subscribe(clients => {
          this.clients = clients;
          this.cdr.detectChanges();
        });
      }
    });
  }

}

