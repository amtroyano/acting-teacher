import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n {

    constructor(private translateService: TranslateService) {}

    getTranslations() {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = this.translateService.instant('search_work.paginator.items_per_page');
        paginatorIntl.nextPageLabel = this.translateService.instant('search_work.paginator.next_page');
        paginatorIntl.previousPageLabel = this.translateService.instant('search_work.paginator.previous_page');
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
      }
    
      getRangeLabel = (page, pageSize, length) => {
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
        return this.translateService.instant('search_work.paginator.range', { startIndex: startIndex + 1, endIndex, length });
      };
}