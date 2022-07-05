import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { TableComponent } from './table/table.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ModalComponent } from './modal/modal.component';
import { ModalTemplatesComponent } from './modal/modal-templates/modal-templates.component';
import { EditingTableComponent } from './editing-table/editing-table.component';
import { ExpandableTableComponent } from './expandable-table/expandable-table.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterialModule ],
  declarations: [
    TableComponent,
    SpinnerComponent,
    LoaderComponent,
    ProfileCardComponent,
    ContextMenuComponent,
    ModalComponent,
    ModalTemplatesComponent,
    EditingTableComponent,
    ExpandableTableComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TableComponent,
    SpinnerComponent,
    LoaderComponent,
    ProfileCardComponent,
    ContextMenuComponent,
    ModalTemplatesComponent,
    EditingTableComponent,
    ExpandableTableComponent,
  ],
})
export class ComponentsModule {}
