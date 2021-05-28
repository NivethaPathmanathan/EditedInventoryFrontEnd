import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/product.service';
import { PurchaseService } from './../../purchase.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  products: Product[] = [];

  addForm: FormGroup;
  submitted = false;
  //model;
  
  //public dateValue: Date = new Date ("05/27/2021");
  //selected;
  //: {startdDate: Moment, endDate: Moment};

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private purchaseservice: PurchaseService) {

  }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      ProductId: [""],
      PurchaseDate: [new Date()],
      NoReceived: ["", Validators.required],
      SupplierName: [""]
    });

    this.productService.getproduct().subscribe(resp => {
      this.products = resp;
    })

  }

  showMsg: boolean = false;

  onSubmit() {
    // debugger;
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.purchaseservice.createpurchase(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-purchase']);
        if (this.addForm.status) {
          this.showMsg = true;
          this.addForm.reset();
        }
      },
        error => {
          alert(error);
        });

  }


}
