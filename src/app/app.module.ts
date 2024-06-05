import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ExcelExportComponent } from './excel-export/excel-export.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadExcelComponent,
    ProductUploadComponent,
    ExcelExportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
