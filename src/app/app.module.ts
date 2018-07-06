import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//MaterialModules
import { MaterialModule } from './material/material.module';

//Services
import { ClientService } from './services/client.service';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ClientDialogComponent
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})

export class AppModule { }
