import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from './product.service';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';  
import { UserPipe } from './user.pipe';
import { AddSalesComponent } from './Sales/add-sales/add-sales.component';
import { EditSalesComponent } from './Sales/edit-sales/edit-sales.component';
import { ListSalesComponent } from './Sales/list-sales/list-sales.component';
import { AddPurchaseComponent } from './Purchase/add-purchase/add-purchase.component';
import { EditPurchaseComponent } from './Purchase/edit-purchase/edit-purchase.component';
import { ListPurchaseComponent } from './Purchase/list-purchase/list-purchase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { NgxDaterangepickerMd } from 'ngx-datepicker-material';
//import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MdButtonModule, MdCardModule, MdToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    UserPipe,
    AddSalesComponent,
    EditSalesComponent,
    ListSalesComponent,
    AddPurchaseComponent,
    EditPurchaseComponent,
    ListPurchaseComponent,
    HeaderComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
   // BsDatepickerModule.forRoot(),

   // NgxDaterangepickerMd,
 //   DatePickerModule ,
  //  NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //TooltipModule.forRoot(),
    // MdToolbarModule,
    // MdButtonModule,
    // MdCardModule,
    RouterModule.forRoot([])
  ],
  providers: [ProductService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
