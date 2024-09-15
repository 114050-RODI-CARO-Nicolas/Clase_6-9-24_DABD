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


  editProg( progToEditParam : Programador | null, updatedProg: Programador)
  {
    console.log('service editProg ', progToEditParam)
    const index = this.lstProgramadores.findIndex(p => p === progToEditParam);
    console.log('progService index const ', index )
    if(index!==-1)
    {
      this.lstProgramadores[index] = {...updatedProg};
      console.log('progService lstProgramadores ', this.lstProgramadores)
    }
    
  }




}
