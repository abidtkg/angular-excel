import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import * as ExcelJS from 'exceljs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    constructor(
        private http: HttpClient
    ) { }
    
    createProfile(user: any): Observable<any>{
        return this.http.post<any>(`http://localhost:3000/profile/import`, user)
        .pipe(
            catchError(this.errorHandeller)
        );
    }

    createCoreUser(user: any): Observable<any>{
        return this.http.post('https://core.bdassistant.com/auth/create/custom', user)
        .pipe(
            catchError(this.errorHandeller)
        );
    }

    generateExcel(data: any[], fileName: string): void {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        // Add headers
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);
        // Add data
        data.forEach((item) => {
            const row: any[] = [];
            headers.forEach((header) => {
                row.push(item[header]);
            });
            worksheet.addRow(row);
        });
        // Save the workbook to a blob
        workbook.xlsx.writeBuffer().then((buffer) => {
            var a = document.createElement('a');
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            a.href = URL.createObjectURL(blob);
            a.download = `${fileName}.xlsx`;
            a.click();
            //   saveAs(blob, `${fileName}.xlsx`);
        });
    }
    
    errorHandeller(error: HttpErrorResponse) {
        return throwError(() => error);
    }

}
