import { Injectable } from '@angular/core';
import { Programador } from './programador';

@Injectable({
  providedIn: 'root',
})
export class ProgService {
  private lstProgramadores: Programador[] = [];

  addProg(p: Programador) {
    this.lstProgramadores.push(p); 
  }

 
  getProgamadores() {
    return this.lstProgramadores;
  }
  delete(index: number) {
    this.lstProgramadores.splice(index, 1);
  }


  editProg( progIndex : number, updatedProg: Programador)
  {
    console.log('progIndex at ProgService.editProg() ', progIndex)
    
   this.lstProgramadores[progIndex]=updatedProg;
    
  }




}
