//  Angular imports
import { NgModule } from '@angular/core';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Custom Angular Material modules imports
import { CustomMatDatetimePickerModule } from './custom-mat-datetime-picker.module';
import { CustomMatPaginatorModule } from './custom-mat-paginator.module';

@NgModule({
  declarations: [],
  imports: [
    // Original modules
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRippleModule,
    MatTabsModule,
    MatStepperModule,
    MatSliderModule,
    NgxMatSelectSearchModule,

    // Custom modules
    CustomMatDatetimePickerModule,
    CustomMatPaginatorModule,
  ],
  exports: [
    // Original modules
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRippleModule,
    MatTabsModule,
    MatStepperModule,
    MatSliderModule,
    NgxMatSelectSearchModule,

    // Custom modules
    CustomMatDatetimePickerModule,
    CustomMatPaginatorModule,
  ],
})
export class MaterialModule {}
