import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalesService } from './../../sales.service';
import { first } from "rxjs/operators";
import { Sales } from './../../model/sales.model';

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.css']
})
export class EditSalesComponent implements OnInit {

  sales: Sales;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private salesservice: SalesService) {

     }

  ngOnInit() {
    let SalesID = localStorage.getItem("editSalesID");

    if(!SalesID){
      alert("Invalid action!!")
      this.router.navigate(['list-sales']);
      return;
    }
    this.editForm = this.formBuilder.group({
     SalesId: [""],
      SalesDate: ['', Validators.required],
      NoOfSales: ['', Validators.required],
      CustomerName: ['', Validators.required],
      ProductId: ['']
    });

    this.salesservice.getsalesById(+SalesID)
    .subscribe(data => {
      this.editForm.setValue(data);
      })
  }

  showMsg: boolean = false;

  onSubmit(){
    this.salesservice.updatesales(this.editForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['list-sales']);
        this.showMsg = true;
        this.editForm.reset();
      },
      error => {
        alert(error);
      });
  }
}
