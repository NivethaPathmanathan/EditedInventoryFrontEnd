import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PurchaseService } from './../../purchase.service';
import { Observable } from "rxjs";
import { Purchase } from './../../model/purchase.model';

@Component({
  selector: 'app-list-purchase',
  templateUrl: './list-purchase.component.html',
  styleUrls: ['./list-purchase.component.css']
})
export class ListPurchaseComponent implements OnInit {

  public searchText : string;
  p: any;
  private _allPur: Observable<Purchase[]>;  
  public get allPur(): Observable<Purchase[]> {  
    return this._allPur;  
  }  

  public set allPur(value: Observable<Purchase[]>) {  
    this._allPur = value;  
  } 
  purchase: Purchase[] = [];
  constructor(private router: Router,
     private purchaseService: PurchaseService) {
       
      }

  loadDisplay(){
    //debugger;
    this.allPur = this.purchaseService.getpurchase();
  }

  ngOnInit() {
    this.purchaseService.getpurchase().subscribe(data => {
      this.purchase = data;
      this.loadDisplay();
    })
  }

  getpurchase(){
  }

  deletepurchase(purchase: Purchase): void {
    this.purchaseService.deletepurchase(purchase.PurchaseId)
      .subscribe(data => {
        this.purchase = this.purchase.filter(u => u !== purchase);
      })
  };

  editpurchase(purchase: Purchase): void {
    localStorage.removeItem("editPurchaseID");
    localStorage.setItem("editpurchaseID", purchase.PurchaseId.toString());
    this.router.navigate(['edit-purchase']);

  };

  addpurchase(): void {
    this.router.navigate(['add-purchase']);
  };
}

