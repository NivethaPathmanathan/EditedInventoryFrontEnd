import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { first } from "rxjs/operators";
import { Product } from './../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
      private productservice: ProductService) {
        
       }

  ngOnInit() {
    
    let ProductID = localStorage.getItem("editProductID");

    if(!ProductID){
      alert("Invalid action!!")
      this.router.navigate(['list-product']);
      return;
    }
    this.editForm = this.formBuilder.group({
      ProductId: [""],
      ProductName: ['', Validators.required],
      BrandName: ['', Validators.required],
      Label: ['', Validators.required],
      Quantity: ['', Validators.required]
    });

    this.productservice.getproductById(+ProductID)
      .subscribe(data => {
      this.editForm.setValue(data);
      })
  }

  showMsg: boolean = false;

  onSubmit(){
    this.productservice.updateproduct(this.editForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['list-product']);
        this.showMsg = true;
        this.editForm.reset();
      },
      error => {
        alert(error);
      });
  }
}
