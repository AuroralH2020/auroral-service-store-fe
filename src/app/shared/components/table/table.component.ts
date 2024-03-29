// Angular imports
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

// Angular Material imports
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// App own modules and services imports
import { IColumnButton, ITableConfig } from './table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  @Input() config: ITableConfig = {} as ITableConfig;
  @Input() isLoadingTable = false;
  @Input() areRowClickable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild('changes') changes!: TemplateRef<any>;

  @Output() rowClicked = new EventEmitter<any>();
  @Output() action = new EventEmitter<{ action: string; row: any }>();
  @Output() columnButtonClicked = new EventEmitter<any>();
  @Output() modified = new EventEmitter<{
    row: any;
    field: string;
    value: string;
  }>();
  @Output() selected = new EventEmitter<MatTableDataSource<any>>();
  @Output() contextMenu = new EventEmitter<{
    event: MouseEvent;
    object: any;
  }>();

  public dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  editing: HTMLDivElement = {} as HTMLDivElement;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.config.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.config.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, key) => {
        if (item[key] && item[key].text) {
          return item[key].text || 'Ω';
        }
        return item[key] || 'Ω';
      };
    }
  }

  ngOnChanges(): void {
    this.displayedColumns = this.config.columns
      .filter((column) => column.type !== 'actions')
      .map((column) => column.prop);
    const actions = this.config.columns.find(
      (column) => column.type === 'actions'
    );
    if (actions) {
      this.displayedColumns.push('actionButtons');
    }
    if (this.config.actions) {
      this.displayedColumns.push('actions');
    }
    this.dataSource.data = this.data;
  }

  buttonAction(evento: MouseEvent, row: any, action: string): void {
    evento.stopPropagation();
    this.action.emit({ action, row });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  change(input: HTMLInputElement, evento: KeyboardEvent): void {
    if (evento.key === 'Enter') {
      input.blur();
    }
  }

  lostFocus(row: any, field: string, input: HTMLInputElement): void {
    if (row[field] !== input.value) {
      this.modified.emit({ row, field, value: input.value });
    } else {
      this.editing = {} as HTMLDivElement;
    }
  }

  columnButton(event: MouseEvent, row: any, column: string): void {
    event.stopPropagation();
    this.columnButtonClicked.emit({ column, row });
  }

  changeValue(row: any, rowIdField: string): void {
    let foundRow = this.dataSource.data.find(
      (r) => r[rowIdField] === row[rowIdField]
    );
    foundRow = row;
    this.editing = {} as HTMLDivElement;
  }

  check(): void {
    this.selected.emit(this.dataSource);
  }

  setEditable(editable: HTMLDivElement): void {
    this.editing = editable;
    setTimeout(() => {
      editable.getElementsByTagName('input').item(0)?.focus();
    });
  }

  actions(event: MouseEvent, action: IColumnButton, row: any, i: number): void {
    event.stopPropagation();
    this.columnButtonClicked.emit({ button: action, row, buttonIndex: i });
  }
}
