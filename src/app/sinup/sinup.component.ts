import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../servise/data.service';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent {

  //pswMach sey=ting
  pswMatch:boolean=false

  // model for signup form

  signUpModelForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
  })
  constructor(private route:Router,private fb:FormBuilder,private ds:DataService){
  }
  signup(){
    var path=this.signUpModelForm.value
    var acno=path.acno
    var uname=path.uname
    var psw=path.psw
    var cpsw=path.cpsw
    // this.route.navigateByUrl("")
    if(this.signUpModelForm.valid){
      if(psw==cpsw){
        this.pswMatch=false
        this.ds.signupApi(acno,uname,psw).subscribe((Response:any)=>{
          // console.log(Response)
          alert(`${Response.uname} registerd successfully..........`)
          this.route.navigateByUrl("")
        },
        Response=>{
          alert(Response.error)
        })
      }
      else{
        this.pswMatch=true
      }
    }
    else{
      alert('invalid Form')
    }
  }

}
