import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { ProductCatalogComponent } from '../product-catalog/product-catalog.component';
import { FilterComponent } from '../filter/filter.component';
import $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  queryString: string;
  limit: number;
  index: number = 0;
  prevPageFlag: boolean = true;
  nextPageFlag: boolean = false;
  filterParams: any = {};
  result: object = {};
  sortOrder: string = 'asc';
  sortField: string = 'default';
  public loading = false;
  constructor(private prodService: ProductService) { }

  // this function updates the value of search field after focus out

  updateSearchVal(event: any) {
    this.queryString = event.target.value;
  }

  //  these functions are used to call previous and next pages

  loadNextPage(event: any) {
    const totalItems = this.result.numFound;
    this.prevPageFlag = false;
    const limit = this.getLimit();
    const totalPage: number = (totalItems / limit);
    if (this.index < totalPage) {
      this.index += 1;
      this.getProducts();
    } else {
      this.nextPageFlag = true;
    }
  }

  loadPrevPage(event: any) {
    const totalItems = this.result.numFound;
    this.nextPageFlag = false;
    if (this.index > 1) {
      this.index -= 1;
      this.prevPageFlag = false;
      this.getProducts();
    } else {
      this.prevPageFlag = true;
    }
  }

  //  this function updates sortField dependiong upon the dropdown value selected
  updateSortField(event: any) {
    this.sortField = event.target.value;
    this.getProducts();
  }

  // this function updates the sort order depending on switch state

  updateSortOrder(event: any) {
    if (event.target.checked) {
      this.sortOrder = 'desc';
    } else {
      this.sortOrder = 'asc';
    }
    this.getProducts();
  }

  //  this function is fired after a search query has been fired using search button
  submitSearch(event: any) {
    this.filterParams = {};
    this.filterParams.q = this.queryString;
    this.getProducts();
  }

  // this function is used to find the no. of items to be loaded depending on viewport

  getLimit() {
    const viewport = (window.screen.width);
    let loaditems: number;
    if (viewport < 768) {
      loaditems = 20;
    } else if (viewport < 992) {
      loaditems = 30;
    } else {
      loaditems = 48;
    }
    return loaditems;
  }

  //  this function updates the filterParams variable after selecting filters

  updateGlobalFilter(data: any): any {
    const newArray: Array<string> = [];
    const filterSelected = data.selectedParent;
    if (this.filterParams.hasOwnProperty(filterSelected)) {
      const existingArray = this.filterParams[filterSelected];
      if (data.addFilter) {
        existingArray.push(data.selectedValue);

      } else {
        const index = existingArray.indexOf(data.selectedValue);
        if (index > -1) {
          existingArray.splice(index, 1);
        }
      }
      if (existingArray.length > 0) {
        this.filterParams[filterSelected] = existingArray;
      } else {
        delete this.filterParams[filterSelected];
      }
    } else {
      newArray.push(data.selectedValue);
      this.filterParams[filterSelected] = newArray;
    }
    this.getProducts();
  }

  //  this function is used to call service from product service component

  getProducts() {
    this.loading = true;
    this.filterParams.index = this.index;
    this.filterParams.sortField = this.sortField;
    this.filterParams.sortOrder = this.sortOrder;
    this.filterParams.limit = this.getLimit();
    this.prodService.getProducts(this.filterParams)
      .subscribe(res => {
        this.result = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
      );
  }

  ngOnInit() {
    this.getProducts();
  }
}
