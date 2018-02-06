import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient ) { }
  baseUrl: string = 'http://api.shortlyst.com/v1/products?';
  apiKey: string = 'apikey=2aac3b7ba599424cad9620fa6449d482';

  // function to construct url using base url and apikey

    public constructUrl(data: object) {
      let filterCriteria: string = '';
      for (const propName in data) {
      if (data.hasOwnProperty(propName)) {
        const objVal = data[propName];
        if (objVal.constructor === Array) {
          filterCriteria += propName + '=' + objVal.join() + '&';
        } else {
          filterCriteria += propName + '=' + objVal + '&';
        }
      }
    }
        return this.baseUrl + filterCriteria + this.apiKey;
  }

  //  this function is used to make service call to the api with request params

    getProducts(filterParams: any) {
    const requestUrl = this.constructUrl(filterParams);
    return this.http.get(requestUrl);
  }
}
