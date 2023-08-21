import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(transactionArray:any[],searchTerm:string,searchType:string): any[] {
    
    const result:any=[]
    if(!transactionArray || !searchTerm || !searchType){
      return transactionArray
    }
    else{
    transactionArray.forEach(item => {
      if(item[searchType].includes(searchTerm)){
          result.push(item)
      }
    })
  }

    return result
  }


}
