import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TableService } from 'src/app/shared/services/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  public hasLoaded = false;
  public categories: Category[];

  currentPage = 0;
  pageCount = 0;

  constructor(
    private categoryService: CategoryService,
    private tableService: TableService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.hasLoaded = false;
    this.categories = [];
    this.categoryService.readAll().subscribe({
      next: (movs) => {
        this.tableService.entities = movs;
        this.categories = this.tableService.paginateEntities(this.currentPage);
        this.pageCount = this.tableService.getPageCount();
      },
      error: (e) => console.error(e),
      complete: () => (this.hasLoaded = true),
    });
  }

  transformToBrazilianCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getCategories();
  }

  editCategory(id: number) {
    this.router.navigate(['/new-category'], { queryParams: { id } });
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe({
      next: (movs) => {
        this.snackBar.open('Categoria deletada com sucesso!', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'notif-success',
        });
        this.getCategories();
      },
      error: (e) => {
        console.log(e);
        this.snackBar.open(
          'Erro ao deletar a categoria, tente novamente mais tarde!',
          'OK',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'notif-error',
          }
        );
      },
      complete: () => (this.hasLoaded = true),
    });
  }
}
