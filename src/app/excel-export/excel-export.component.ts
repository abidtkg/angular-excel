import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrl: './excel-export.component.css'
})
export class ExcelExportComponent {

  constructor(
    private API: ApiService
  ){}

  export(){
    const data = [
      { Name: 'John Doe', Age: 30, City: 'New York' },
      { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
      // Add more data as needed
    ];

    this.API.generateExcel(data, 'x');
  }
}
