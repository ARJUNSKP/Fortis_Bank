import { Component, OnInit } from '@angular/core';
import { DataService } from '../servise/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data="Enjoy Your Dealing with"
  user:any=''
  sheareAcno:any=''

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder,private datepipe: DatePipe){}

  ngOnInit():void{
    if(localStorage.getItem('CurrentName')){
      this.user=localStorage.getItem('CurrentName')
    }
    if(!localStorage.getItem('AccountNumber')){
      this.router.navigateByUrl('')
    }
  }

  deleteAcno(){
    if(localStorage.getItem('AccountNumber')){
      this.sheareAcno=localStorage.getItem('AccountNumber')
    }
  }

  cancel(){
    this.sheareAcno=''
  }

  AccountDelete(event:any){
    console.log(event)
    this.ds.deleteAccount(event).subscribe((Responce:any)=>{
      alert(Responce)
    },
    Responce=>{
      alert(Responce.error)
    })
    localStorage.clear()
    this.router.navigateByUrl('')
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
