import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})

export class MydbService {




  pages = [1, 2, 3, 4, 5];

  constructor() { }
  
  public getdb(){
    return 'this is a test';
  }
}
