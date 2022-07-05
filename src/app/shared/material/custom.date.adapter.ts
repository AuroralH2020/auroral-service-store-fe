// Angular imports
import { Injectable } from '@angular/core';

// Angular material imports
import { NativeDateAdapter } from '@angular/material/core';

// Third-party libraries imports
import { NgxMatNativeDateAdapter } from '@angular-material-components/datetime-picker';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

  setLocale(): void {
    super.setLocale('es');
  }
}

@Injectable()
export class CustomDateTimePickerAdapter extends NgxMatNativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }

  setLocale(): void {
    super.setLocale('es');
  }
}
