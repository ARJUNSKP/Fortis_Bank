import { Component, OnInit } from '@angular/core';
import { DataService } from '../servise/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css']
})
export class AccountstatementComponent implements OnInit {

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder,private DatePipe:DatePipe){}

  acno:any
  transaction:any=[]
  date:any
  searchKey:any=''
  ngOnInit(): void {

    this.date=new Date()

    if(localStorage.getItem('AccountNumber')){
      this.acno=localStorage.getItem('AccountNumber')
    }
    this.ds.transactionHistory(this.acno).subscribe((Response:any)=>{
      this.transaction=Response
      console.log(Response)
    })
  }
  
  backHome(){
    this.router.navigateByUrl('home')
  }

  searchKeyChange(key:any){
    this.searchKey=key
  }


  searchDate:any=''
  datedata(event:any){
    this.searchDate = this.DatePipe.transform(event.target.value, 'shortDate');
  }

  convertPdf(){
    // create an object for jspdf
    var pdf=new jspdf()

    let col=['Type','Amount','Account HolderName','Date']

    // row
    let row:any=[]

    // style set

    // size
    pdf.setFontSize(16)

    // title
    pdf.text("Account Statement",80,10)

    // text color
    pdf.setTextColor(99)

    // text size
    pdf.setFontSize(12)

    // array of objects convert to array of array(nested array)

    var allitem=this.transaction
    for(let i of allitem){
      let rowData=[i.type,i.amount,i.user,i.date]
      row.push(rowData)
    }

    // nested array convert to pdf
    (pdf as any).autoTable (col,row,{startY:15})

    // opean pdf into New window
    pdf.output('dataurlnewwindow')

    // pdf download
    pdf.save('miniStatenemt.pdf')
  }
}
