import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

interface IContextItem{
  text: string;
  name: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) private contextMenu!: MatMenuTrigger;

  @Output() itemClicked = new EventEmitter<any>();
  menuPosition = { x: '0', y: '0' };
  items: IContextItem[] = [];
  private referenceObject: any;
  
  constructor() {}

  ngOnInit(): void {}

  /**
   * Opens a context menu.
   * @param event Click event.
   * @param items Items that will be displayed in the context menu.
   * @param obj Reference to the clicked object.
   */
  openMenu(event: MouseEvent, items: IContextItem[], obj: any): void {
    this.items = items;
    this.referenceObject = obj;
    event.preventDefault();
    this.menuPosition.x = event.x + 'px';
    this.menuPosition.y = event.y + 'px';
    this.contextMenu.openMenu();
  }

  emit(action: string): void {
    this.itemClicked.emit({ action, reference: this.referenceObject });
  }
}
