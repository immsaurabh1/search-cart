import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient ) { }
  baseUrl: string = "http://api.shortlyst.com/v1/products?";
  apiKey: string ="apikey=2aac3b7ba599424cad9620fa6449d482";
  public constructUrl(data:object){
    let filterCriteria:string="";
    for(let propName in data) {
    if(data.hasOwnProperty(propName)) {
       let objVal=data[propName];
       if(objVal.constructor === Array){
        filterCriteria+=propName+"="+objVal.join()+"&";
       }
      else{
        filterCriteria+=propName+"="+objVal+"&";
      }
    }

  }
      return this.baseUrl+filterCriteria+this.apiKey;
}
    getProducts(filterParams:any){
    let requestUrl=this.constructUrl(filterParams);
    console.log(requestUrl);
    return this.http.get(requestUrl)
      // .toPromise()
      // .then(response => {
      //   console.log(response);
      //   this.results=response.json()
      // })
      // .catch(console.log);
  };
    
  
}
