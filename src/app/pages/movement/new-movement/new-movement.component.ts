import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovementService } from 'src/app/shared/services/movement.service';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.scss'],
})
export class NewMovementComponent implements OnInit {
  movementForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    tipoMovimentacao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    idCategoria: new FormControl('', Validators.required),
  });

  selectedCategoryId = null;

  categories: Category[];
  hasLoadedCategories = false;

  constructor(
    private categoryService: CategoryService,
    private movementService: MovementService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.readAll().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (e) => console.error(e),
      complete: () => (this.hasLoadedCategories = true),
    });
  }

  create() {
    if (this.movementForm.valid) {
      let movementData = this.movementForm.getRawValue();
      movementData.idPessoaFisica = 1;
      movementData.idCategoria = this.selectedCategoryId;
      movementData.tipoMovimentacao =
        movementData.tipoMovimentacao.toLowerCase();
      movementData.data = new Date(movementData.data).toISOString();

      this.movementService.create(movementData).subscribe({
        next: (data) => {
          console.log(data);
          this.snackBar.open('Movimentação criada com sucesso!', 'OK', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'notif-success',
          });
          this.router.navigate(['/movements']);
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open(
            'Erro ao criar a movimentação, tente novamente mais tarde!',
            'OK',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: 'notif-error',
            }
          );
        },
      });
    } else {
      this.snackBar.open(
        'Complete todos os campos com informações válidas!',
        'OK',
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'notif-warning',
        }
      );
    }
  }

  selectMovementType(movementType: string) {
    this.movementForm.get('tipoMovimentacao').setValue(movementType);
  }

  selectCategory(categoryId: number, categoriaName: string) {
    this.selectedCategoryId = categoryId;
    this.movementForm.get('idCategoria').setValue(categoriaName);
  }

  getFieldError(fieldName: string) {
    return (
      this.movementForm.get(fieldName).touched &&
      this.movementForm.get(fieldName).invalid
    );
  }

  setSelectTouchState(fieldName: string) {
    this.movementForm.get(fieldName).markAsTouched();
  }
}
