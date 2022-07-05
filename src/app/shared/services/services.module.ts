import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsService } from './modals.service';
import { UsersService } from './users.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ModalsService,
    UsersService,
  ],
})
export class ServicesModule {}
