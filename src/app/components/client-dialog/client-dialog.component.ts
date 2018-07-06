import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientService, Client } from '../../services/client.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  isNew = false;
  client: Client;

  ngOnInit() {
    this.isNew = this.data.isNew;
    this.client = this.data.client;
  }

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    private ClientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let updated_list: any;
    if (!this.isNew) {
      updated_list = this.ClientService.updateClient(this.client);
    } else {
      updated_list = this.ClientService.newClient(this.client);
    }
    this.dialogRef.close({ obs$: updated_list, row: this.client});
  }

}
