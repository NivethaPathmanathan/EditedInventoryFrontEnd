import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ProductService } from './../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  
  addForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
      private productservice: ProductService) {
        
      }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      ProductId: [""],
      ProductName:["", Validators.required],
      BrandName: ["", Validators.required],
      Label:["", Validators.required],
      Quantity:[""]
    })
  }

  showMsg: boolean = false;

  onSubmit(){
   // debugger;
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.productservice.createproduct(this.addForm.value)
    .subscribe(data => {
      this.router.navigate(['list-product']);
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
