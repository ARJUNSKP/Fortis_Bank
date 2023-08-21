import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SinupComponent } from './sinup/sinup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AccountstatementComponent } from './accountstatement/accountstatement.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { DataPipe } from './dataPipe/data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SinupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountstatementComponent,
    DeleteComponent,
    DataPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
