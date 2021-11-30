import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovementService } from 'src/app/shared/services/movement.service';
import { TableService } from 'src/app/shared/services/table.service';
import { Movement } from '../../../../shared/interfaces/movement.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movement-table',
  templateUrl: './movement-table.component.html',
  styleUrls: ['./movement-table.component.scss'],
})
export class MovementTableComponent implements OnInit {
  hasLoaded = false;
  movements: Movement[];

  currentPage = 0;
  pageCount = 0;

  constructor(
    private movementService: MovementService,
    private tableService: TableService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    this.hasLoaded = false;
    this.movements = [];
    this.movementService.readAll().subscribe({
      next: (movs) => {
        this.tableService.entities = movs;
        this.movements = this.tableService.paginateEntities(this.currentPage);
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
    this.getMovements();
  }

  editMovement(id: number) {
    this.router.navigate(['/new-movement'], { queryParams: { id } });
  }

  deleteMovement(id: number) {
    this.movementService.delete(id).subscribe({
      next: (movs) => {
        this.snackBar.open('Movimentação deletada com sucesso!', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'notif-success',
        });
        this.getMovements();
      },
      error: (e) => {
        console.log(e);
        this.snackBar.open(
          'Erro ao deletar a movimentação, tente novamente mais tarde!',
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
