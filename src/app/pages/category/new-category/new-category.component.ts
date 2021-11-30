import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  categoryForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  });

  isUpdate = false;
  currentId = 0;

  constructor(
    private categoryService: CategoryService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.queryParams.id;
    if (id !== undefined) {
      this.currentId = id;
      this.categoryService.readById(id).subscribe({
        next: (cat) => {
          this.categoryForm.patchValue({
            nome: cat.nome,
          });
          this.isUpdate = true;
        },
      });
    }
  }

  getFieldError(fieldName: string) {
    return (
      this.categoryForm.get(fieldName).touched &&
      this.categoryForm.get(fieldName).invalid
    );
  }

  create() {
    if (this.categoryForm.valid) {
      let categoryData = this.categoryForm.getRawValue();
      categoryData.idPessoaFisica = 1;

      if (!this.isUpdate) {
        this.categoryService.create(categoryData).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/categories']);
            this.snackBar.open('Categoria criada com sucesso!', 'OK', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: 'notif-success',
            });
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open(
              'Erro ao criar a categoria, tente novamente mais tarde!',
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
        categoryData.id = this.currentId;
        this.categoryService.update(categoryData).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/categories']);
            this.snackBar.open('Categoria atualizada com sucesso!', 'OK', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: 'notif-success',
            });
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open(
              'Erro ao atualizar a categoria, tente novamente mais tarde!',
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
      }
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
}
