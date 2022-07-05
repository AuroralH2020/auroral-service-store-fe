//  Angular imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Module inner imports
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ServicesModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class SharedModule { }
