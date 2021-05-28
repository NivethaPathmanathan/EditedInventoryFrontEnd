import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Product } from 'src/app/model/product.model';
import { SalesService } from './../../sales.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  products: Product[] = [];
  model;

  addForm: FormGroup;
  submitted = false;

  public dateValue: Date = new Date ("05/27/2021");
  
  constructor(private formBuilder: FormBuilder,
     private router: Router,
      private salesservice: SalesService,
      private productService: ProductService) {
       }
  

    ngOnInit() {
      this.addForm = this.formBuilder.group({
        ProductId:["", Validators.required],
        SalesDate:[""],
        NoOfSales: ["", Validators.required],
        CustomerName:["", Validators.required]       
      });

      this.productService.getproduct().subscribe(resp => {
        this.products = resp;
      })
    }

    showMsg: boolean = false;

    onSubmit(){
     // debugger;
      this.submitted = true;
      if(this.addForm.invalid){
        return;
      }
      this.salesservice.createsales(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-sales']);
        if(this.addForm.status){
          this.showMsg = true;
          this.addForm.reset();
        }
      },
        error => {
          alert(error);
        });
    }

}
