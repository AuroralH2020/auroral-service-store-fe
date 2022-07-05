//  Angular imports
import { NgModule } from '@angular/core';

// Angular Material imports
import { MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';

function CustomPaginator(): MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elementos por página';
  customPaginatorIntl.firstPageLabel = 'Primera página';
  customPaginatorIntl.previousPageLabel = 'Página anterior';
  customPaginatorIntl.nextPageLabel = 'Siguiente página';
  customPaginatorIntl.lastPageLabel = 'Última página';
  customPaginatorIntl.getRangeLabel = spanishRangeLabel;

  return customPaginatorIntl;
}

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

@NgModule({
  imports: [MatPaginatorModule],
  exports: [MatPaginatorModule],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ]
})
export class CustomMatPaginatorModule { }
