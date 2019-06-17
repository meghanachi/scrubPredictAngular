

import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RootModal } from './models/rootModal';
import { ModalInput1 } from './models/input1Modal';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';
import { scrubService } from '../service/invokeApi.service';

//service imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inputs } from './models/Inputs';
import { Output } from './models/output1';
import { Response } from './models/response';
import { Results } from './models/Results';
import { FinalResponse } from './models/FinalResponse';
import { Content } from './models/content';


@Component({
    selector: 'app-root',
    template: `
<app-my-table></app-my-table>
  `,
    providers: [scrubService],
    styles: [`
  

  
  `]
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    csvContent: string;
    dataModel: RootModal;
    InputModal: Inputs;
    ResponseModal: Output;
    Results: Results;
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
        'IsScrubbed',
        'ScoredLabels',
        'ScoredProbabilities'
    ];
    dataSource: MatTableDataSource<FinalResponse>;

    constructor(public scrubService: scrubService, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {
        // this.changeDetectorRefs.detectChanges();
    }
    ngOnInit() {
        this.dataSource = new MatTableDataSource<FinalResponse>();
        this.dataSource.data = new Array<FinalResponse>();
        let fakeresponseData: FinalResponse = {
            claimId: "A", ProviderLastName: "", ProviderNPI: "", ProviderAddress1: "", CityName: "", ZipCode: "", GenderCode: "",
            PatAcct: "", HeaderChargeAmt: "", AdmitDate: "", SubmittypeCode: "", IsCurrent: "", PaidAmount: "", IsCapitated: "",
            IsScrubbed: "", ScoredLables: "", ScoredProbabilities: ""
        }
        this.dataSource.data.push(fakeresponseData);

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
        this.dataModel.input1 = new ModalInput1();
        this.dataModel.input1.columnNames = headers;
        this.dataModel.input1.values = Array<Array<string>>();
        for (let i = 1; i < obj.length; i++) {
            // split content based on comma
            let data = obj[i].split(',');
            if (data.length === headers.length) {
                let tarr = [];
                this.dataModel.input1.values.push(data);

                this.InputModal = new Inputs();
                this.InputModal.Inputs = this.dataModel;
            }
        }
        this.scrubService = new scrubService(this.http, );
        this.Results = new Results();

        this.Results.Results = new Output();
        this.Results.Results.output1 = new Content();
        this.Results.Results.output1.value = new Response();
        this.Results.Results.output1.value.Values = Array<Array<string>>();

        this.scrubService.calltheAPI(this.InputModal).subscribe(scrub => {
            if (scrub != null) {
                this.Results = scrub
            }
            let finalresponse = new Array<FinalResponse>();
            let fakeresponseData: FinalResponse = {
                claimId: "", ProviderLastName: "", ProviderNPI: "", ProviderAddress1: "", CityName: "", ZipCode: "", GenderCode: "",
                PatAcct: "", HeaderChargeAmt: "", AdmitDate: "", SubmittypeCode: "", IsCurrent: "", PaidAmount: "", IsCapitated: "",
                IsScrubbed: "", ScoredLables: "", ScoredProbabilities: ""
            }


            for (let a = 0; a < this.Results.Results.output1.value.Values.length; a++) {
                let dataValues = this.Results.Results.output1.value.Values[a];

                //for(let v=0; v < dataValues.length; v++){
                finalresponse.push(fakeresponseData);

                finalresponse[a].claimId = dataValues[0];
                finalresponse[a].ProviderLastName = dataValues[1];
                finalresponse[a].ProviderNPI = dataValues[2];
                finalresponse[a].ProviderAddress1 = dataValues[3];
                finalresponse[a].CityName = dataValues[4];
                finalresponse[a].ZipCode = dataValues[5];
                finalresponse[a].GenderCode = dataValues[6];
                finalresponse[a].PatAcct = dataValues[7];
                finalresponse[a].HeaderChargeAmt = dataValues[8];
                finalresponse[a].AdmitDate = dataValues[9];
                finalresponse[a].SubmittypeCode = dataValues[10];
                finalresponse[a].IsCurrent = dataValues[11];
                finalresponse[a].PaidAmount = dataValues[12];
                finalresponse[a].IsCapitated = dataValues[13];
                finalresponse[a].IsScrubbed = dataValues[14];
                finalresponse[a].ScoredLables = dataValues[15];
                finalresponse[a].ScoredProbabilities = dataValues[16];
            }

            // this.dataSource = new MatTableDataSource<FinalResponse>();
            this.dataSource.data = new Array<FinalResponse>();
            this.dataSource.data = finalresponse;
            this.dataSource._updateChangeSubscription();


        });

    }

    ngAfterViewInit() {
        this.changeDetectorRefs.detectChanges();
    }


    ngOnDestroy() { }


    onFileSelect(input: HTMLInputElement) {

        const files = input.files;
        var content = this.csvContent;

        if (files && files.length) {
            const fileToRead = files[0];

            const fileReader = new FileReader();
            fileReader.onload = this.onFileLoad;

            //fileReader.readAsText(fileToRead, "UTF-8");
        }

    }
}
