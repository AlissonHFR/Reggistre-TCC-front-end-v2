import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from 'src/app/pages/login/services/storage.service';


@Injectable()
export class MovementService extends ApiService {
  constructor(private _http: HttpClient, private _storage: StorageService) {
    super(_http, _storage, 'movement');
  }
}
