import { Component } from '@angular/core';
import { TableService,data } from '../table.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';  

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['id','product_type','product_name','product','cost','product_material','description','product_image'];
  dataSource:any = [];
  values:data={
    createdAt:'',
    product_name:'',
    product_image:'',
    product_type:'',
    cost:'',
    description:'',
    product_material:'',
    product:'',
    id:''
  }
  constructor(private Service:TableService){}
  Subscription: Subscription = new Subscription();
Canshow:boolean=false;
anshow:boolean=false;
myshow:boolean=false;
  get(){
    this.Service.loadProductList().subscribe((res: any) => {
      let table = []
      for (let i = 0; i < res.length-1; i++) {
        let obj = {'product_name':res[i].product_name, 
        'product':res[i].product, 
        'cost':res[i].cost,
          'product_image':res[i].product_image,
          'product_material':res[i].product_material,
        'description':res[i].description,
        'id':res[i].id,
        'product_type':res[i].product_type
      };
          table.push(obj);
      }
      
      this.dataSource = table;
    })

  }
   read(productId: string) {
    this.Service.getProductById(productId).subscribe(
      (data) => {
        this.values = data;
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }
  Insert(Form:NgForm) {
    console.log();
    this.Subscription = this.Service.add(Form.value).subscribe({
      next: (Data:any) => {
        if ('errorNum' in Data) {
        } else {
          this.Canshow=false;
          alert("success");
          this.get();
        
        }
       
      }
    }
    )
  }
  update() {
    this.Subscription=this.Service.updateProduct(this.values).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        // Handle success or other operations if needed
        this.read(this.values.id);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  
  }
  delete() {
    if (this.values.id) {
      this.Subscription=this.Service.deleteProductById(this.values.id).subscribe(
        () => {
          console.log('Product deleted successfully');
          // Handle success or other operations if needed
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.warn('Product ID is missing. Unable to delete.');
    }
  }
  pop(){
    this.Canshow=true;
    this.anshow=false;
    this.myshow=false;
    this.dataSource=[];
  }
  pp(){
    this.anshow=true;
    this.myshow=false;
this.Canshow=false;
this.dataSource=[];

  }
  pp2(){
    this.myshow=true;
this.Canshow=false;
this.anshow=false;
this.dataSource=[];


  }
}
 export interface PeriodicElement {
 }
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// /**
//  * @title Basic use of `<table mat-table>`
//  */

