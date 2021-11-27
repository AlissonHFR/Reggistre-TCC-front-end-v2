import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public numberOfEntities = 5;
  public entities: any[];

  constructor() {}

  public paginateEntities(index: number) {
    let provEntities = [];
    this.entities.map((entity, i) => {
      if (
        i >= index * this.numberOfEntities &&
        i < (index + 1) * this.numberOfEntities
      ) {
        provEntities.push(entity);
      }
    });

    return provEntities;
  }

  public getPageCount() {
    return Math.ceil(this.entities.length / this.numberOfEntities);
  }
}
