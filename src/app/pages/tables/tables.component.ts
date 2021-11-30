import { Component, OnInit } from '@angular/core';
import { Award } from 'src/app/shared/interfaces/award.interface';
import { AwardsService } from 'src/app/shared/services/awards.service';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  hasLoaded = false;
  awards: Award[];

  currentPage = 0;
  pageCount = 0;

  constructor(
    private awardsService: AwardsService,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.getAwards();
  }

  getAwards() {
    this.hasLoaded = false;
    this.awards = [];
    this.awardsService.readAll().subscribe({
      next: (awas) => {
        this.tableService.entities = awas;
        this.awards = this.tableService.paginateEntities(this.currentPage);
        this.pageCount = this.tableService.getPageCount();
      },
      error: (e) => console.error(e),
      complete: () => (this.hasLoaded = true),
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getAwards();
  }
}
