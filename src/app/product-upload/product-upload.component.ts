import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-product-upload',
    templateUrl: './product-upload.component.html',
    styleUrl: './product-upload.component.css'
})
export class ProductUploadComponent {
    
    public orders: any[] = [];
    public skippedOrders: any[] = [];
    
    constructor(
        private API: ApiService
    ){}
    
    onFileChange(event: any): void {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        
        fileReader.onload = (e: any) => {
            const arrayBuffer = e.target.result;
            this.parseExcel(arrayBuffer);
        };
        
        fileReader.readAsArrayBuffer(file);
    }
    
    parseExcel(arrayBuffer: any): void {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(arrayBuffer).then((workbook) => {
            let jsonData: any[] = [];
            workbook.eachSheet((worksheet, sheetId) => {
                worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                    let rowData: any = {};
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        let colName = '';
                        if(colNumber == 1) colName = 'customer_name';
                        if(colNumber == 2) colName = 'phone';
                        if(colNumber == 3) colName = 'delivery_address';
                        if(colNumber == 4) colName = 'delivery_district';
                        if(colNumber == 5) colName = 'billing_address';
                        if(colNumber == 6) colName = 'billing_district';
                        if(colNumber == 7) colName = 'product_id';
                        if(colNumber == 8) colName = 'order_type';
                        if(colNumber == 9) colName = 'payment_status';
                        if(colNumber == 10) colName = 'transaction_id';
                        if(colNumber == 11) colName = 'payment_method';
                        if(colNumber == 12) colName = 'order_date';
                        if(colNumber == 13) colName = 'order_channel';
                        rowData[colName] = cell.value;
                    });
                    // this.createUser(rowData);
                    jsonData.push(rowData);
                    // this.createOrder(rowData);
                });
            });
            console.log(jsonData)
            // let database = [];
            // for(let data of jsonData){
            //     const payload = {
            //         phone: data.phone,
            //         address: data.address,
            //         product_id: data.product_id,
            //         total_purchase: data.total_purchase,
            //         total_sales: data.total_sales,
            //         order_date: data.order_date
            //     }
            //     database.push(payload);
            // }
            // console.log(JSON.stringify(database, null, 2));
        });
    }

    // CREATE ORDER
    createOrder(order: any){
        console.log(order)
    }
  

}
