import { Injectable, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ModalComponent,
  IModalConfig,
} from '@shared/components/modal/modal.component';

@Injectable()
export class ModalsService {
  @ViewChild('buttonsTemplate') buttonsTemplate!: TemplateRef<any>;
  constructor(private dialog: MatDialog) {}

  open(config: IModalConfig, width: string = '25%'): MatDialogRef<any> {
    return this.dialog.open(ModalComponent, { data: config, width });
  }

  buttonTemplate(): TemplateRef<any> {
    return this.buttonsTemplate;
  }
}
