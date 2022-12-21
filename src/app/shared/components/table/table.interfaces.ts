/*
The prop attribute, in case it represents a column of text or icons is of type string,
but if it represents a column with buttons or a coloured text it has to be an object with this structure
button:
    prop: {
      text: string -> String to be displayed in the button
      color: string -> Text color
      backgroundColor: string -> Button color
      disabled: boolean -> If the button is disabled or not
    }
colorText:
    prop: {
      text: string -> Text to be displayed
      color: string -> Color of the text
    }

    If you want a column with several action buttons, you can achieve this by adding a column with the type "actions".
    {
      name: 'Acciones',
      prop: [],
      type: 'actions',
    }
    Then in each line of the dataSource we add an actions property containing the array of IColumnButton
    const actions: IColumnButton[] = [
      {
        text: order.isImported ? 'Editar' : 'Importar',
        color: order.isImported ? 'black' : 'white',
        disabled:
          order.isImported && order.id.startsWith('E210')
            ? true
            : false,
        backgroundColor: order.isImported ? '#ff9800' : 'green',
        action: order.isImported ? 'edit' : 'import',
      },
      {
        text: 'Lab.',
        color: 'white',
        disabled: false,
        backgroundColor: '#44BBA4',
        action: 'lab',
      },
      {
        text: 'Validar',
        color: 'white',
        disabled: false,
        backgroundColor: '#2a4494',
        action: 'validate',
      },
    ];

The actions array is for static buttons such as edit, delete,.... 
Buttons that do not change depending on the state of a variable.
*/
export interface ITableColumn {
  name: string;
  prop: any | IColumnButton[];
  type:
    | 'text'
    | 'icon'
    | 'button'
    | 'checkbox'
    | 'date'
    | 'colorText'
    | 'actions'
    | 'list'
    | 'url';
  datePipe?: string;
  sticky?: boolean;
  class?: string;
  editable?: boolean;
  width?: string;
  disabled?: boolean;
  linkURL?: string;
}

interface IAction {
  type:
    | 'mat-raised-button'
    | 'mat-stroked-button'
    | 'mat-flat-button'
    | 'mat-icon-button'
    | 'mat-fab'
    | 'mat-mini-fab'
    | 'mat-button';
  name: string;
  backgroundColor?: string;
  themeColor?: 'primary' | 'accent' | 'warn';
  color?: string;
  sticky?: boolean;
  icon?: string;
  tooltip?: string;
}

export interface ITableConfig {
  columns: ITableColumn[];
  paginator?: boolean;
  sort?: boolean;
  filter?: boolean;
  stickyHeader?: boolean;
  actions?: IAction[];
  maxHeight?: string;
}

export interface IColumnButton {
  disabled?: boolean;
  width?: string;
  color?: string;
  backgroundColor?: string;
  text?: string;
  action?: string;
}
