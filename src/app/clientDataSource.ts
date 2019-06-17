/** ----------------------------------------------------------------------
 * (C) Copyright 2019 Cognizant TriZetto Software Group, Inc.  All rights reserved. 
 * Confidential and Trade Secret Material.
 * ----------------------------------------------------------------------*/

/* tslint:disable */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSortable } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
// import { map } from 'rxjs';
// import { startWith } from 'rxjs';
import * as _ from 'lodash';



export class ClientSideDataSource<T> implements DataSource<T>{
    /** Stream that emits when a new data array is set on the data source. */
    private readonly _data: BehaviorSubject<T[]>;

    /** Stream that emits when a new filter string is set on the data source. */
    private readonly _filter = new BehaviorSubject<string>('');

    /** Stream that emits when a new filter string is set on the data source. */
    private readonly _delete = new BehaviorSubject<boolean>(false);

    private dataCollection: T[] = [];

    loadDataFunction: Function;
    addPostProcessingFunction: Function;
    deletePostProcessingFunction: Function;
    goToLastPageCondition: boolean = false;

    //paginator
    get paginator(): MatPaginator | null { return this._paginator; }
    set paginator(paginator: MatPaginator | null) {
        this._paginator = paginator;
        this.updateSubscription();
    }
    private _paginator: MatPaginator | null;

    //sort
    get sort(): MatSort | null { return this._sort; }
    set sort(sort: MatSort | null) {
        this._sort = sort;
        this.updateSubscription();
    }
    private _sort: MatSort | null;

    //filter
    get filter(): string { return this._filter.value; }
    set filter(filter: string) { this._filter.next(filter); }

    //displayed Columns
    get displayedColumns(): Array<string> {
        return this._displayedColumns;
    }
    set displayedColumns(columns: Array<string>) {
        this._displayedColumns = columns;
    }
    private _displayedColumns: Array<string> = [];

    //fixed Columns
    public fixedColumns: Array<Object> = [];

    //defaultSortColumnName
    public defaultSortColumn: string = '';

    public defaultSortOrder: string = '';

    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private renderChangesSubscription: Subscription;
    private totalItems: number = 0;

    //remove
    private filteredData: T[];
    public loading$ = this.loadingSubject.asObservable();

    //remove
    public displayedData = [];

    constructor() {
        this._data = new BehaviorSubject<T[]>([]);
        this.updateSubscription();
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        if (this.renderChangesSubscription) {
            this.renderChangesSubscription.unsubscribe();
        }

        this.dataSubject.complete();
        this.loadingSubject.complete();
        this._filter.complete();
        this._delete.complete();
    }

    public loadData = () => {
        this.loadingSubject.next(true);
        let promise = new Promise<boolean>((resolve, reject) => {

            if (this.loadDataFunction != undefined) {
                this.loadDataFunction().then((data) => {
                    if (this.paginator) {
                        this.paginator.length = data.totalCount;
                    }
                    this.dataCollection = data.results;
                    this.displayedData = this.dataCollection;
                    this._data.next(this.dataCollection);
                    this.loadingSubject.next(false);
                    this.resetSortingPagingParams();
                    resolve(true);
                }).catch(() => {
                    this.dataCollection = [];
                    this.filteredData = this.dataCollection;
                    this._data.next(this.dataCollection);
                    this.loadingSubject.next(false);
                    reject(false);
                });
            } else {
                this.dataCollection = [];
                this.filteredData = this.dataCollection;
                this._data.next(this.dataCollection);
                this.loadingSubject.next(false);
                throw this.getLoadDataFunctionError();
            }
        });

        return promise;
        
    }

    public delete = (data: T[]) => {
        //change the entity state of the data
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.dataCollection.length; j++) {
                if (_.isEqual(data[i], this.dataCollection[j])) {
                    // if (this.dataCollection[j].entityState !== EntityState.NewlyAdded) {
                    //     this.dataCollection[j].entityState = EntityState.Deleted;
                    //     break;
                    // } else {
                    //     this.dataCollection.splice(this.dataCollection.indexOf(this.dataCollection[j]), 1);
                    // }
                }
            }
        }

        //call the post process functions
        if (this.deletePostProcessingFunction != undefined) {
            this.dataCollection = this.deletePostProcessingFunction(this.dataCollection);
        }

        this._data.next(this.dataCollection);
    }

    public add = (data: T[]) => {
        //change the entity state of the data
        for (let i = 0; i < data.length; i++) {
            //set the entity state to newly added
            //data[i].entityState = EntityState.NewlyAdded;
            this.dataCollection.push(data[i]);
        }

        //call the post process functions
        if (this.addPostProcessingFunction != undefined) {
            this.dataCollection = this.addPostProcessingFunction(this.dataCollection);
        }

        this.resetSortingPagingParams();
        this.goToLastPageCondition = true;

        this._data.next(this.dataCollection);
    }

    private updateSubscription = () => {
        // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
        // Otherwise, use an empty observable stream to take their place.
        const sortChange = this._sort ? this._sort.sortChange : empty();
        const pageChange = this._paginator ? this._paginator.page : empty();

        if (this._sort) {
            this._sort.disableClear = true;
        }

        if (this.renderChangesSubscription) {
            this.renderChangesSubscription.unsubscribe();
        }

        //swap delete and filter and test
        this.renderChangesSubscription = this._data.pipe(
            // combineLatest(this._filter),
            // map(([data]) => this._filterData(data)),
            // combineLatest(this._delete),
            // map(([data]) => this._deleteData(data)),
            // combineLatest(sortChange.pipe(startWith(null!))),
            // map(([data]) => this._orderData(data)),
            // combineLatest(pageChange.pipe(startWith(null!))),
            // map(([data]) => this._pageData(data))
        ).subscribe((data) => {
            this.displayedData = data;
            this.dataSubject.next(data);
        });
    }


    private _pageData(data: T[]): T[] {
        if (!this.paginator) { return data; }

        this.paginator.length = this._deleteData(data).length;

        if (this.goToLastPageCondition) {
            //goes to the last page after an add operation
            this.goToLastPageCondition = false;
            const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
            this._paginator.pageIndex = lastPageIndex;
        }

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    }

    private _orderData(data: T[]): T[] {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort) { return data; }
        this.goToFirstPage();
        return this.sortData(data.slice(), this.sort);
    }

    private _deleteData(data: T[]): T[] {
        let returnData = [];

        for (let i = 0; i < data.length; i++) {
            // if (data[i].entityState !== undefined) {
            //     if (data[i].entityState !== EntityState.Deleted) {
            //         returnData.push(data[i]);
            //     }
            // } else {
            //     returnData.push(data[i]);
            // }
        }

        return returnData;
    }

    private sortData: ((data: T[], sort: MatSort) => T[]) = (data: T[], sort: MatSort): T[] => {
        const active = sort.active;
        const direction = sort.direction;
        if (!active || direction == '') { return data; }

        return data.sort((a, b) => {
            let valueA = this.sortingDataAccessor(a, active);
            let valueB = this.sortingDataAccessor(b, active);

            let comparatorResult = 0;
            if (valueA && valueB) {
                if (valueA > valueB) {
                    comparatorResult = 1;
                } else if (valueA < valueB) {
                    comparatorResult = -1;
                }
            } else if (valueA) {
                comparatorResult = 1;
            } else if (valueB) {
                comparatorResult = -1;
            }

            return comparatorResult * (direction == 'asc' ? 1 : -1);
        });
    }

    sortingDataAccessor: ((data: T, sortHeaderId: string) => string | number) =
        (data: T, sortHeaderId: string): string | number => {
            const value: any = data[sortHeaderId];
            return this._isNumberValue(value) ? Number(value) : value;
        }

    public _filterData(data: T[]) {
        let validData = this._deleteData(data);
        this.filteredData = validData.filter(obj => this.filterPredicate(obj, this.filter));

        if (this.paginator) { this._updatePaginator(this.filteredData.length); }
        return this.filteredData;
    }

    private filterPredicate: ((data: T, filter: string) => boolean) = (data: T, filter: string): boolean => {
        const accumulator = (currentTerm, key) => currentTerm + data[key];
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) != -1;
    }

    private _updatePaginator(filteredDataLength: number) {
        Promise.resolve().then(() => {
            if (!this.paginator) { return; }

            this.paginator.length = filteredDataLength;

            if (this.paginator.pageIndex > 0) {
                const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
                this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
            }
        });
    }

    private _isNumberValue(value: any): boolean {
        return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
    }

    private goToFirstPage = () => {
        if (!this.paginator) { return; }

        this.paginator.pageIndex = 0;
    }

    public getData = () => {
        return _.cloneDeep(this.dataCollection);
    }

    public updateData = (data: T[]) => {
        this.dataCollection = data;
        this.filteredData = this.dataCollection;
        this._data.next(this.dataCollection);
    }

    public resetSortingPagingParams = () => {
        this.filter = "";

        if (this.defaultSortColumn === "") {
            throw this.getDefaultSortColumnError();
        }

        if (this.defaultSortOrder !== '' && this.defaultSortOrder === 'desc') {
            let defaultSort: MatSortable = {
                id: this.defaultSortColumn,
                start: 'desc',
                disableClear: true
            };

            this._sort.direction = 'asc';
            this._sort.sort(defaultSort);
        } else {
            let defaultSort: MatSortable = {
                id: this.defaultSortColumn,
                start: 'asc',
                disableClear: true
            };

            this._sort.direction = 'desc';
            this._sort.sort(defaultSort);
        }
    }

    public columnSelectionChanged = (column) => {
        let index = this.displayedColumns.indexOf(column.value);
        if (index > -1) {
            this.displayedColumns.splice(index, 1);
        } else {
            let fixedIndex = this.fixedColumns.indexOf(column);
            this.displayedColumns.splice(fixedIndex, 0, column.value);
        }
    }
    
    public columnDisplayed = (column) => {
        return this.displayedColumns.indexOf(column) > -1;
    }

    private getDefaultSortColumnError = (): Error => {
        return Error("No 'defaultSortColumn' parameter provided. Specify 'defaultSortColumn' parameter to the dataSource.");
    }

    private getLoadDataFunctionError = (): Error => {
        return Error("No 'loadDataFunction' parameter provided. Specify 'loadDataFunction' parameter to the dataSource.");
    }
}

/* tslint:enable */