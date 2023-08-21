import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../servise/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginvalidation=this.fb.group({

    uname:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  login(){
    if(this.loginvalidation.valid){
      var path=this.loginvalidation.value
      var acno=path.acno
      var uname=path.uname
      var psw=path.psw
      this.ds.loginApi(acno,psw).subscribe((Response:any)=>{
        // console.log(Response)
        alert(`${Response.uname} is logined.....`)
        localStorage.setItem("CurrentName",Response.uname)
        localStorage.setItem("AccountNumber",Response.acno)
        localStorage.setItem('token',JSON.stringify(Response.token))
        this.route.navigateByUrl('home')
      },
      Response=>{
        alert(Response.error)
      })
      
    }
    else{
      alert("invalid form")
    }
  }

  constructor(private route:Router,private fb:FormBuilder,private ds:DataService){

  }
  placeholddata="UserName"
  userpassword:any=""

  // userlogin(){
  //   alert(" event binding:- onclink event time function colling this")
  // }

  accnochange(event:any){
    console.log(event.target.value);   
  }
  passlogin(event:any){
    this.userpassword=event.target.value
    console.log(this.userpassword)
  }

  
  
 
}
