import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {scrubService} from '../service/invokeApi.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatSidenavModule, MatMenuModule,
  MatTableModule, MatToolbarModule, MatTooltipModule, MatProgressSpinnerModule, MatCheckboxModule, MatTabsModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule
} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { CdkTableModule } from '@angular/cdk/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTableComponent } from './my-table/my-table.component';

@Component({
	selector: 'utilization-management-app',
	template: `<div ui-view></div> 
                <router-outlet></router-outlet>`
})
export class UmAppRootComponent {
    constructor(
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef
    ) {
        // setTimeout(() => {
        //     this.runZone();
        // }, 1000);
    }

    private runZone = () => {
        this.zone.run(() => {
            this.changeDetector.detectChanges();
        });

        setTimeout(() => {
            this.runZone();
        }, 1000);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
