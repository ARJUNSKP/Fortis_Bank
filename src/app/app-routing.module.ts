import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SinupComponent } from './sinup/sinup.component';
import { HomeComponent } from './home/home.component';
import { AccountstatementComponent } from './accountstatement/accountstatement.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'signup', component:SinupComponent},
  { path: 'home', component:HomeComponent},
  { path: 'accountstatement', component:AccountstatementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
