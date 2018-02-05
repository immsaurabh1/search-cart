import { Component, OnInit ,Input, Output,EventEmitter,OnChanges} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit,OnChanges {

  filterValues:any;
  @Output()
  updateFilter:EventEmitter<object>=new EventEmitter();
  @Input()
  filterData:object;

  selectedFilter(event: any){
    let target= event.target
    let filterParent=target.getAttribute('data-parent');
    let filterValue=target.getAttribute("data-filter");
    let selectedFilter:any={
      selectedParent:filterParent,
      selectedValue:filterValue
    }
    if(target.checked){
      selectedFilter.addFilter=true;
    }
    else{
      selectedFilter.addFilter=false;
    }
     this.updateFilter.emit(selectedFilter);
  }
  constructor() { }
   generateArray(obj){
   return Object.keys(obj).map((key)=>{ return key});
}
  ngOnInit() {
    console.log(this.filterData);
    this.filterValues=this.filterData;
  }
   ngOnChanges(){
    // this.filterValues=this.filterData;
  }

}
