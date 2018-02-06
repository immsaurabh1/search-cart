import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterValues: any;

  @Output()
  updateFilter: EventEmitter<object> = new EventEmitter();

  @Input()
  filterData: object;

  //  this function updates the filter value and emit it for parent component

  selectedFilter(event: any) {
    const target = event.target;
    const filterParent = target.getAttribute('data-parent');
    const filterValue = target.getAttribute('data-filter');
    const selectedFilter: any = {
      selectedParent: filterParent,
      selectedValue: filterValue
    };
    if (target.checked) {
      selectedFilter.addFilter = true;
    } else {
      selectedFilter.addFilter = false;
    }
     this.updateFilter.emit(selectedFilter);
  }

  constructor() { }

   generateArray(obj) {
   return Object.keys(obj).map((key) => { return key });
}
  ngOnInit() {
    this.filterValues = this.filterData;
  }
}
