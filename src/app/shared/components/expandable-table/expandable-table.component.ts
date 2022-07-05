// Angular imports
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Angular material imports
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Third-party libraries imports
import { ReplaySubject } from 'rxjs';

// Module inner imports
import { ITableData } from '../editing-table/editing-table.component';

interface IDisplayedColumn {
  property: string;
  name: string;
  editable: boolean;
  type: 'string' | 'list' | 'select' | 'date' | 'multi-select-search';
  sort?: true;
  width?: string;
  datePipe?: string;
}

interface IAction {
  name: string;
  tooltip: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
}

export interface IExpandibleConfig {
  displayedColumns: IDisplayedColumn[];
  propertyName: string;
  filter?: boolean;
  sort?: boolean;
  actions?: IAction[];
  expandibleConfig?: IExpandibleConfig;
}

export interface IExpandedData {
  currentData: any;
  editable: boolean;
  originalData: any;
  property: string;
  validator: FormGroup;
}

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExpandableTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() config: IExpandibleConfig = {} as IExpandibleConfig;
  @Input() data: any[] = [];
  @Input() canCreate = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  @Output() action = new EventEmitter<any>();
  @Output() setOptions = new EventEmitter<any>();
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay: string[] = [];
  expandedElement: any | null;
  expandibleData: any[] = [];
  selectOptions: string[] = [];
  selectSearchFilter = new FormControl('');
  selectSearchOptions = new ReplaySubject<string[]>();

  private lastElement: ITableData = {} as ITableData;
  private expandedIndex = -1;

  constructor() {
    this.selectSearchFilter.valueChanges.subscribe((value) =>
      this.filterOptions(value)
    );
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = this.filterPredicate;
    this.dataSource.paginator = this.paginator;
    this.setData(this.data);
    this.columnsToDisplay = this.config.displayedColumns.map((c) => c.property);
    if (this.config.actions) {
      this.columnsToDisplay.push('actions');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sortData = (data, sort) => {
      if (sort.direction !== '') {
        const n = sort.direction === 'asc' ? 1 : -1;
        return data.sort((a, b) =>
          a.currentData[sort.active] > b.currentData[sort.active] ? n : -n
        );
      }
      return data;
    };
    if (this.config.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.firstChange) {
      this.data = changes.data.currentValue;
      this.setData(changes.data.currentValue);
    }
  }

  private filterPredicate(data: any, filter: string): boolean {
    const values = Object.values(data.currentData)
      .filter((v) => typeof v !== 'object')
      .map((v: any) => v.toString().toLowerCase());
    return values.some((v: any) => v.includes(filter));
  }

  private setData(data: any[]): void {
    this.dataSource.data = data.map((element) => {
      const form = new FormGroup({});
      this.config.displayedColumns
        .filter((field) => field.editable)
        .forEach((f) =>
          form.addControl(f.property, new FormControl(element[f.property]))
        );
      return {
        currentData: element,
        originalData: element,
        editable: false,
        validator: form,
      };
    });
    const local = localStorage.getItem(`opened${this.config.propertyName}`);
    if (this.expandedIndex !== -1 || local) {
      const element =
        this.dataSource.data[local ? parseInt(local, 10) : this.expandedIndex];
      this.selectElement(element);
    }
  }

  confirmEditCreate(row: ITableData): void {
    Object.assign(row.currentData, row.validator.value);
    row.editable = false;
    const obj = {
      ...row,
      action: this.lastElement === row ? 'create' : 'edit',
      property: this.config.propertyName,
    };
    this.action.emit(obj);
  }

  cancel(row: ITableData): void {
    if (this.lastElement === row) {
      this.dataSource.data.pop();
      this.dataSource.data = this.dataSource.data.slice();
    } else {
      row.editable = false;
      Object.keys(row.validator.controls).forEach((item) => {
        row.validator.controls[item].patchValue(row.currentData[item]);
      });
    }
  }

  delete(row: ITableData): void {
    this.action.emit({
      ...row,
      action: 'delete',
      property: this.config.propertyName,
    });
  }

  selectElement(element: ITableData): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.expandedIndex = this.dataSource.data.indexOf(this.expandedElement);
    localStorage.setItem(
      `opened${this.config.propertyName}`,
      this.expandedIndex.toString()
    );
  }

  create(): void {
    const empty: any = {};
    const form = new FormGroup({});
    this.config.displayedColumns
      .filter((f) => f.editable)
      .forEach((c) => {
        empty[c.property] = '';
        form.addControl(c.property, new FormControl(''));
      });
    if (this.config.expandibleConfig) {
      empty[this.config.expandibleConfig.propertyName] = [];
    }
    const element = {
      currentData: empty,
      originalData: empty,
      editable: true,
      validator: form,
    };
    this.lastElement = element;
    this.dataSource.data = [...this.dataSource.data, element];
    setTimeout(() => this.paginator.lastPage());
  }

  receiveCreate(event: any): void {
    this.expandedIndex = this.dataSource.data.indexOf(this.expandedElement);
    const data = {
      ...event,
      action: 'create',
      [this.config.propertyName + 'Id']: this.expandedElement.currentData.id,
    };
    this.action.emit(data);
  }

  receiveAction(event: any): void {
    if (event.action === 'create') {
      this.receiveCreate(event);
    } else if (event.action === 'delete') {
      this.receiveDelete(event);
    } else {
      this.action.emit(event);
    }
  }

  receiveDelete(event: any): void {
    this.expandedIndex = this.dataSource.data.indexOf(this.expandedElement);
    this.action.emit(event);
  }

  getOptions(column: IDisplayedColumn): string[] {
    this.setOptions.emit({ column: column.property, ref: this });
    return this.selectOptions;
  }

  getSelectSearchOptions(column: IDisplayedColumn): ReplaySubject<any> {
    this.setOptions.emit({ column: column.property, ref: this });
    this.selectSearchOptions.next(this.selectOptions);
    this.filterOptions(this.selectSearchFilter.value);
    return this.selectSearchOptions;
  }

  performAction(action: any, row: ITableData): void {
    if (action.name === 'edit') {
      row.editable = true;
    } else if (action.name === 'delete') {
      this.delete(row);
    } else {
      this.action.emit({ action: action.name, ...row });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterOptions(value: string): void {
    if (!this.selectOptions) {
      return;
    }
    let search = value;
    if (!search) {
      this.selectSearchOptions.next(this.selectOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.selectSearchOptions.next(
      this.selectOptions.filter(
        (item) => item.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
