//  Angular imports
import { NgModule } from '@angular/core';

// Angular Material imports
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';

// Third-party libraries imports
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
} from '@angular-material-components/datetime-picker';

// Module inner imports
import {
  CustomDateAdapter,
  CustomDateTimePickerAdapter,
} from './custom.date.adapter';

// Variables to change NgxDatetimepicker format
const INTL_DATE_INPUT_FORMAT = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};

const INTL_DATEPICKER_INPUT_FORMAT = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
};

const MAT_DATETIMEPICKER_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: INTL_DATE_INPUT_FORMAT,
  },
  display: {
    dateInput: INTL_DATE_INPUT_FORMAT,
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

const MAT_DATEPICKER_FORMATS: MatDateFormats = {
  parse: {
    dateInput: INTL_DATEPICKER_INPUT_FORMAT,
  },
  display: {
    dateInput: INTL_DATEPICKER_INPUT_FORMAT,
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};


@NgModule({
  imports: [
    MatNativeDateModule,
    NgxMatDatetimePickerModule
  ],
  exports: [
    MatNativeDateModule,
    NgxMatDatetimePickerModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es',
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATEPICKER_FORMATS,
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
    {
      provide: NgxMatDateAdapter,
      useClass: CustomDateTimePickerAdapter,
    },
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: MAT_DATETIMEPICKER_FORMATS,
    },
  ],
})
export class CustomMatDatetimePickerModule { }
