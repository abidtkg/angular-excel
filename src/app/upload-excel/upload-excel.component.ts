import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-upload-excel',
    templateUrl: './upload-excel.component.html',
    styleUrl: './upload-excel.component.css'
})
export class UploadExcelComponent {

    public coreUsers: any[] = [];
    public profies: any[] = [];
    
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
                        if(colNumber == 1) colName = 'name';
                        if(colNumber == 2) colName = 'phone';
                        if(colNumber == 3) colName = 'address';
                        if(colNumber == 4) colName = 'date'
                        rowData[colName] = cell.value;
                    });
                    this.createUser(rowData);
                    jsonData.push(rowData);
                });
            });
            console.log(jsonData)
            // console.log(JSON.stringify(jsonData, null, 2));
        });
    }

    // IMPORT CUSTOME

    createUser(user: any) {
        const user_payload = {
            name: user.name,
            phone: user.phone,
            email: '',
            apiKey: "A6R6WXK-0X0MQSK-NHPCR0V-P5FTCM5"
              
        }
        this.API.createCoreUser(user_payload)
        .subscribe({
            next: (data) => {
                this.coreUsers.push(user.phone)
                const profile_payload = {
                    userId: data.userId,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    date: user.date
                }

                this.API.createProfile(profile_payload)
                .subscribe({
                    next: (data) => {
                        this.profies.push(user.phone);
                        // console.log(data);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

  
    
}
