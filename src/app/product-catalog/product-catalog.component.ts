import { Component, OnInit,Input,OnChanges,ChangeDetectionStrategy } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit,OnChanges {
 @Input()
 catalogData:any;

  constructor() { }
 prodData:object;
 createModalData(event){
   console.log(event);
   
   let target=event.target;
   let modalData=target.getAttribute('data-current');
    $('#myModal').on('show.bs.modal', function(e) {
            
            var $modal = $(this),
                esseyId = e.relatedTarget.id;
            
                    $modal.find('.edit-content').html("pappu");
        })
  
 }
   
  ngOnInit() {
    this.prodData=this.catalogData;
  }
   ngOnChanges(){
    console.log("data Changed",this.catalogData);
    this.prodData=this.catalogData;
   
  }

}
