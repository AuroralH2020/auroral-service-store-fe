import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-templates',
  templateUrl: './modal-templates.component.html',
  styleUrls: ['./modal-templates.component.scss'],
})
export class ModalTemplatesComponent implements OnInit {
  @ViewChild('confirmation') confirmation!: TemplateRef<any>;
  @ViewChild('accept') accept!: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
