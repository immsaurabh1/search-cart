import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit, OnChanges {
 @Input()
 catalogData: any;

  constructor() { }
 prodData: object;
  ngOnInit() {
    this.prodData = this.catalogData;
  }
   ngOnChanges() {
    this.prodData = this.catalogData;
}
  }

