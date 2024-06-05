import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ExcelExportComponent } from './excel-export/excel-export.component';

const routes: Routes = [
  { path: 'upload', component: UploadExcelComponent },
  { path: 'upload/product', component: ProductUploadComponent },
  { path: 'export', component: ExcelExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
