import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../servise/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder,private datepipe: DatePipe){}

  ngOnInit():void{
    if(!localStorage.getItem('AccountNumber')){
      this.router.navigateByUrl('')
    }
  }
  home(){
    this.router.navigateByUrl('home')
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('')
  }

  profileData:any={}
  accountnumber:any
  balanceData:any={}
  message:any=''
  status:boolean=false
  

  profile(){
    if(localStorage.getItem('AccountNumber')){
      this.accountnumber=localStorage.getItem('AccountNumber')
    }
    this.ds.userProfile(this.accountnumber).subscribe((Response:any)=>{
      this.profileData=Response
    })
  }
  balance(){
    if(localStorage.getItem('AccountNumber')){
      this.accountnumber=localStorage.getItem('AccountNumber')
    }
    this.ds.userBalanceApi(this.accountnumber).subscribe((Response:any)=>{
      this.balanceData=Response
    })
  }

  formMoneyTransfer=this.fb.group({
    toAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })
  MTranser(){
    if(this.formMoneyTransfer.valid){
        var fromAcno=localStorage.getItem('AccountNumber')
        var path=this.formMoneyTransfer.value
        var toAcno=path.toAcno
        var amount=path.amount
        var psw=path.psw

        // date fetching using pipe in angular
        var dateTime=new Date()
        var dateData=this.datepipe.transform(dateTime, 'short');

        this.ds.moneyFranser(fromAcno,toAcno,psw,amount,dateData).subscribe((Response:any)=>{
          this.message=Response.message
          this.status=true
        },
        Response=>{
          this.message=Response.error.message
          this.status=false
        })
    }
    else{
      this.message="validation error"
      this.status=false
    }
  }
  accountstatement(){
    this.router.navigateByUrl("accountstatement")
  }

}
