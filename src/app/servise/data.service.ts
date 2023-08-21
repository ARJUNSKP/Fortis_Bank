import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// overloading headers
const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // method to add token in api header
  createHeader(){
    // httpHeaders
    const headers= new HttpHeaders()

    // access token form localStorage
    if(localStorage.getItem("token")){
      var token=JSON.parse(localStorage.getItem("token") || " ")
      
      // add token into header
      options.headers=headers.append('access_token',token)
    }
    return options
  }

  signupApi(acno:any,uname:any,psw:any){
    const bodyData={
      acno,
      uname,
      psw
    }
    return this.http.post('http://localhost:3000/express/user/user-register',bodyData)
  }
  loginApi(acno:any,psw:any){
    const bodyData={
      acno,
      psw
    }
    return this.http.post('http://localhost:3000/express/user/user-login',bodyData)
  }
  userProfile(acno:any){
    return this.http.get('http://localhost:3000/express/user/user-profile/'+acno,this.createHeader())
  }
  userBalanceApi(acno:any){
    return this.http.get('http://localhost:3000/express/user/user-balance/'+acno,this.createHeader())
  }
  moneyFranser(fromAcno:any,toAcno:any,psw:any,amount:any,date:any){
    const bodyData={
      fromAcno,
      toAcno,
      psw,
      amount,
      date
    }
    return this.http.post('http://localhost:3000/express/user/user-moneyTransfer',bodyData,this.createHeader())
  }

  transactionHistory(acno:any){
    return this.http.get('http://localhost:3000/express/user/transationHistory/'+acno,this.createHeader())
  }

  deleteAccount(acno:any){
    return this.http.delete('http://localhost:3000/express/user/delete-account/'+acno,this.createHeader())
  }
}
