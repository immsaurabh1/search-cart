import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { LoadingModule } from 'ngx-loading';


import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    FilterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,LazyLoadImagesModule,LoadingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
