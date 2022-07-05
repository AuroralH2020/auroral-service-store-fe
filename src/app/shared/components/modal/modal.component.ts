import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IModalConfig {
  title: string;
  message?: string;
  type?: 'info' | 'confirmation';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public config: IModalConfig
  ) {}

  ngOnInit(): void {}
}
