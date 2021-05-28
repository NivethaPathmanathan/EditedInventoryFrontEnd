import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseService } from './../../purchase.service';
import { first } from "rxjs/operators";
import { Purchase } from './../../model/purchase.model';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent implements OnInit {
  purchase: Purchase;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
      private purchaseservice: PurchaseService) { 
        
      }


      
  ngOnInit() {

    this.editForm = this.formBuilder.group({
      PurchaseID: [''],
      PurchaseDate: ['', Validators.required],
      NoReceived: ['', Validators.required],
      SupplierName: ['', Validators.required],
      ProductId: ['']
    });

    let PurchaseID = localStorage.getItem("editPurchaseID");

    // if(!PurchaseID){
    //   alert("Invalid action!!")
    //   this.router.navigate(['list-purchase']);
    //   return;
    // }
  

    this.purchaseservice.getpurchaseById(+PurchaseID)
    .subscribe(data => {
      this.editForm.setValue(data);
      })
  }

  showMsg: boolean = false;

  onSubmit(){
    this.purchaseservice.updatepurchase(this.editForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['list-purchase']);
        this.showMsg = true;
        this.editForm.reset();
      },
      error => {
        alert(error);
      });
  }
}

