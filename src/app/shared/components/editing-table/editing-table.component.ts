import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface IColumn {
  property: string;
  label: string;
  options?: string[];
  width?: string;
}

export interface ITableData {
  currentData: any;
  editable: boolean;
  originalData: any;
  validator: any;
}

@Component({
  selector: 'app-editing-table',
  templateUrl: './editing-table.component.html',
  styleUrls: ['./editing-table.component.scss'],
})
export class EditingTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input() editableFields: string[] = [];

  @Output() startEditing = new EventEmitter<any>();
  @Output() edited = new EventEmitter<ITableData>();
  @Output() created = new EventEmitter<ITableData>();
  @Output() deleted = new EventEmitter<any>();

  ELEMENT_DATA: ITableData[] = [];
  displayedColumns: string[] = [];
  columnNames: any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  editForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const names: any = {};
    this.displayedColumns = [
      ...this.columns.map((col) => col.property),
      'actions',
    ];
    this.columns.forEach((col) => (names[col.property] = col.label));
    this.columnNames = names;
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.setData(this.data);
  }

  private setData(data: any[]): void {
    const arr: any[] = [];
    const editForm = (e: any) => {
      const form: any = {};
      this.editableFields.forEach(
        (field) =>
          (form[field] = new FormControl(e[field], Validators.required))
      );
      return new FormGroup(form);
    };
    data.forEach((element) => {
      arr.push({
        currentData: element,
        originalData: element,
        editable: false,
        validator: editForm(element),
      });
    });
    this.dataSource.data = arr;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.firstChange) {
      this.setData(changes.data.currentValue);
    }
  }

  deleteRow(row: ITableData, i: number): void {
    if (row.currentData.id) {
      this.deleted.emit(row);
    } else {
      const data = this.dataSource.data;
      data.splice(this.paginator.pageIndex * this.paginator.pageSize + i, 1);
      this.dataSource.data = data;
    }
  }

  confirmEditCreate(row: ITableData): void {
    row.currentData = row.validator.value;
    row.originalData.id ? this.edited.emit(row) : this.created.emit(row);
    row.editable = false;
  }

  startEdit(row: ITableData): void {
    this.startEditing.emit(row);
    row.editable = true;
  }

  cancelOrDelete(row: ITableData, i: any): void {
    if (row.editable && row.currentData.id) {
      row.editable = false;
      Object.keys(row.validator.controls).forEach((item) => {
        row.validator.controls[item].patchValue(row.currentData[item]);
      });
    } else {
      this.deleteRow(row, i);
    }
  }

  addRow(): void {
    const empty: any = {};
    Object.keys(this.dataSource.data[0].currentData).forEach(
      (key) => (empty[key] = '')
    );
    const editForm = (e: any) => {
      const form: any = {};
      this.editableFields.forEach(
        (field) =>
          (form[field] = new FormControl(e[field], Validators.required))
      );
      return new FormGroup(form);
    };
    this.dataSource.data = [
      ...this.dataSource.data,
      {
        currentData: empty,
        originalData: empty,
        editable: true,
        validator: editForm(empty),
      },
    ];
    this.paginator.lastPage();
  }

  removeLastRow(): void {
    this.dataSource.data.pop();
    this.dataSource.data = this.dataSource.data.slice();
  }
}
