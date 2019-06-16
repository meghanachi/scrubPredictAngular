

import { Component, OnInit, AfterViewInit, OnDestroy  } from '@angular/core';
import {RootModal} from './models/rootModal';
import {ModalInput1} from './models/input1Modal';

import {scrubService} from '../service/invokeApi.service';

//service imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
   template: `
   <div class="form-group">
        <input type="file" (change)="onFileSelect($event.target)" name="myfile">
        <mat-table #table [dataSource]="dataSource" matSort>

        <ng-container matColumnDef="claimId">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ClaimId </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span class="mat-selectable-row"
                      [matTooltip]="row.claimId"
                      [matTooltipPosition]="'below'"
                      (click)="rowClicked(row)">
                    {{row.claimId}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="ProviderLastName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ProviderLastName </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.ProviderLastName" [matTooltipPosition]="'below'">
                    {{row.ProviderLastName}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="ProviderNPI">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ProviderNPI </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.ProviderNPI" [matTooltipPosition]="'below'">
                    {{row.ProviderNPI}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="ProviderAddress1">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ProviderAddress1 </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.ProviderAddress1" [matTooltipPosition]="'below'">
                    {{row.ProviderAddress1}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="CityName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> CityName </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.CityName" [matTooltipPosition]="'below'">
                    {{row.CityName}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="ZipCode">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ZipCode </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.ZipCode" [matTooltipPosition]="'below'">
                    {{row.ZipCode}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="GenderCode">
            <mat-header-cell *matHeaderCellDef mat-sort-header> GenderCode </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.GenderCode" [matTooltipPosition]="'below'">
                    {{row.GenderCode}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="PatAcct">
            <mat-header-cell *matHeaderCellDef mat-sort-header> PatAcct </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.PatAcct" [matTooltipPosition]="'below'">
                    {{row.PatAcct}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="HeaderChargeAmt">
            <mat-header-cell *matHeaderCellDef mat-sort-header> HeaderChargeAmt </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.HeaderChargeAmt" [matTooltipPosition]="'below'">
                    {{row.HeaderChargeAmt}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="AdmitDate">
            <mat-header-cell *matHeaderCellDef mat-sort-header> AdmitDate </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.AdmitDate" [matTooltipPosition]="'below'">
                    {{row.AdmitDate}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="SubmittypeCode">
            <mat-header-cell *matHeaderCellDef mat-sort-header> SubmittypeCode </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.SubmittypeCode" [matTooltipPosition]="'below'">
                    {{row.SubmittypeCode}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="IsCurrent">
            <mat-header-cell *matHeaderCellDef mat-sort-header> IsCurrent </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.IsCurrent" [matTooltipPosition]="'below'">
                    {{row.IsCurrent}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="PaidAmount">
            <mat-header-cell *matHeaderCellDef mat-sort-header> PaidAmount </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.PaidAmount" [matTooltipPosition]="'below'">
                    {{row.PaidAmount}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="IsCapitated">
            <mat-header-cell *matHeaderCellDef mat-sort-header> IsCapitated </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.IsCapitated" [matTooltipPosition]="'below'">
                    {{row.IsCapitated}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="IsScrubbed">
            <mat-header-cell *matHeaderCellDef mat-sort-header> IsScrubbed </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <span [matTooltip]="row.IsScrubbed" [matTooltipPosition]="'below'">
                    {{row.IsScrubbed}}
                </span>
            </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;" [ngClass]="{'highlight': selection.isSelected(row)}" (click)="selection.toggle(row)"></mat-row>
    </mat-table>
   

    <!-- Pagination Rows -->
    <mat-paginator #paginator
                   [pageSize]="10"
                   [pageSizeOptions]="[5, 10, 20]">
    </mat-paginator>
        </div>

   
  `,
  providers: [scrubService],
  styles: [`
  .mat-column-claimId{
    min-width: 70px;
    max-width: 200px;
} 

.mat-column-ProviderLastName{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-ProviderNPI{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-ProviderAddress1{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-CityName{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-ZipCode{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-GenderCode{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-PatAcct{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-HeaderChargeAmt{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-AdmitDate{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-SubmittypeCode{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-IsCurrent{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-PaidAmount{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-IsCapitated{
    min-width: 70px;
    max-width: 200px;
}
.mat-column-IsScrubbed{
    min-width: 70px;
    max-width: 200px;
}

.mat-header-row{
    min-width: 800px;
}

.mat-row{
    min-width: 800px;
}
  `]
})

export class AppComponent  implements OnInit, AfterViewInit, OnDestroy  {

    csvContent: string;
    dataModel: RootModal;
    apiUrl = 'https://ussouthcentral.services.azureml.net/workspaces/86a4021753874ee68e6ef949890b5533/services/01efe0bdf3d44a7b837c051dbcb755f5/execute?api-version=2.0&details=true';
    apiKey = "75lYrn06B2y3TdM0yeX6CQgmVVXnRmagtEIraZ4BhZNoxUr4E3DlHjGQiTFFAASjCSGqDZsgOaQhGAgoE1x5KQ== ";  // URL to web api
    displayedColumns = [
      'claimId',
      'ProviderLastName',
      'ProviderNPI',
      'ProviderAddress1',
      'CityName',
      'ZipCode',
      'GenderCode',
      'PatAcct',
      'HeaderChargeAmt',
      'AdmitDate',
      'SubmittypeCode',
      'IsCurrent',
      'PaidAmount',
      'IsCapitated',
      'IsScrubbed'
  ];
  dataSource: RootModal;
//   public fixedColumns = [
//       { value: 'ABC', displayValue: 'ABC' },
//       { value: 'description', displayValue: 'Description' }
//   ];
    constructor(public scrubService: scrubService, private http: HttpClient){
    }
    ngOnInit(){
    }

    onFileLoad(fileLoadedEvent) {
      
                const textFromFileLoaded = fileLoadedEvent.target.result;              
                this.csvContent = textFromFileLoaded; 
                 let obj = this.csvContent.split(/\r|\n|\r/);
                 let headers = obj[0].split(',');
 let lines = [];
                // console.log(obj);
                // alert(this.csvContent);
                this.dataModel = new RootModal();
                this.dataModel.input = new ModalInput1();
                this.dataModel.input.columnNames = headers;
                this.dataModel.input.values = Array<Array<string>>();
                for (let i = 1; i < obj.length; i++) {
                  // split content based on comma
                  let data = obj[i].split(',');
                  if (data.length === headers.length) {
                    let tarr = [];
                    this.dataModel.input.values.push(data);
           
                    // for (let j = 0; j < headers.length; j++) {
                    //   tarr.push(data[j]);
                    // }
              
                   // log each row to see output 
                  //  console.log(tarr);

                  //  lines.push(tarr);
                   //this.DataModel.Input.ColumnNames = lines[0];
                }
               }
               this.scrubService = new scrubService(this.http, );
              let result = this.scrubService.calltheAPI(this.dataModel).subscribe(scrub => console.log(scrub));
              //console.log(result);
        }

        ngAfterViewInit() {
        }
    
        ngOnDestroy() { }
      
        calltheAPI(request: RootModal): Observable<any> {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + this.apiKey
            })
            return this.http.post(this.apiUrl, request,  { headers: headers })
          }

        onFileSelect(input: HTMLInputElement) {
      
          const files = input.files;
          var content = this.csvContent;    
          
          if (files && files.length) {
             /*
              console.log("Filename: " + files[0].name);
              console.log("Type: " + files[0].type);
              console.log("Size: " + files[0].size + " bytes");
              */
      
              const fileToRead = files[0];
      
              const fileReader = new FileReader();
              fileReader.onload = this.onFileLoad;
      
              fileReader.readAsText(fileToRead, "UTF-8");
          }

    }
}
