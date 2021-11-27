import { Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/shared/interfaces/movement.interface';
import { MovementService } from 'src/app/shared/services/movement.service';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
})
export class InfoCardsComponent implements OnInit {
  hasLoaded = false;

  despesasTotal = 0;
  receitasTotal = 0;

  constructor(private movementService: MovementService) {}

  ngOnInit(): void {
    this.movementService.readAll().subscribe({
      next: (movs: Movement[]) => {
        movs.forEach((mov) => {
          if (mov.tipoMovimentacao === 'despesa')
            this.despesasTotal += mov.valor;
          else this.receitasTotal += mov.valor;
        });
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
}
