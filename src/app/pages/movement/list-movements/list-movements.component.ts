import { Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/shared/interfaces/movement.interface';
import { MovementService } from 'src/app/shared/services/movement.service';

@Component({
  selector: 'app-list-movements',
  templateUrl: './list-movements.component.html',
  styleUrls: ['./list-movements.component.scss'],
})
export class ListMovementsComponent implements OnInit {
  ngOnInit(): void {}
}
