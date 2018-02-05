import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import {ProductCatalogComponent } from "../product-catalog/product-catalog.component";
import {FilterComponent} from "../filter/filter.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  queryString: string = '';
  limit:number;
  filterParams: any = {};
  result:object=[]
  sortOrder:string="asc";
  sortField:string="default";
  public loading = false;
  constructor(private prodService: ProductService) { }
  onNameKeyUp(event: any) {
    this.queryString = event.target.value;
    
  }
  updateSortField(event:any){
    this.sortField=event.target.value;
    this.getProducts();
  }
  updateSortOrder(event:any){
  console.log(event.target.checked)
    if (event.target.checked){
      this.sortOrder="desc";
    }
    else{
      this.sortOrder="asc";
    }
    this.getProducts();
  }
  submitSearch(event: any) {
    this.filterParams={};
    this.filterParams.q = this.queryString;
    this.getProducts();
    
  }
  getLimit(){
   let viewport =(window.screen.width);
   let loaditems:number;
   if (viewport<768){
      loaditems=20;
   }
    else if(viewport<992){
      loaditems=30;
    }
    else{
      loaditems=48;
    }
    return loaditems;
  };
    updateGlobalFilter(data:any) : any{
    let newArray:Array<string>=[];
    console.log("data recdeived is",data);
   let filterSelected=data.selectedParent;
   if(this.filterParams.hasOwnProperty(filterSelected)){
     let existingArray=this.filterParams[filterSelected];
     if(data.addFilter){
     existingArray.push(data.selectedValue);
      
     }
    else{
      let index = existingArray.indexOf(data.selectedValue);
      if (index > -1) {
      existingArray.splice(index, 1);
      }
    }
    if(existingArray.length>0){
     this.filterParams[filterSelected]=existingArray;
    }
    else{
      delete this.filterParams[filterSelected];
    }
   }
    else{
      newArray.push(data.selectedValue);
      this.filterParams[filterSelected]=newArray;
    }
    console.log("filter params are",this.filterParams);
  this.getProducts();
  }

  getProducts() {
    this.loading = true;
    
    this.filterParams.sortField=this.sortField;
    this.filterParams.sortOrder=this.sortOrder;
    this.filterParams.limit=this.getLimit();
    this.prodService.getProducts(this.filterParams)
     .subscribe( res => { 
        this.result = res;
        this.loading = false;
     	      console.log(this.result);
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )
}
    
      
  ngOnInit(){
    this.getProducts();
    
  }


}
