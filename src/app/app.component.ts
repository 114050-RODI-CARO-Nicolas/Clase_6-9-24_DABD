import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Programador } from './programador';
import { ProgService } from './prog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  
  lstProgramadores: Programador[] = [];


  programadorToEdit : Programador | null = null;
  indexProgramadorToEdit : number = 0;
  isEditMode : boolean = false;


  private progService = inject(ProgService);
  ngOnInit(): void {
    //this.lstProgramadores = this.progService.getProgamadores();

    this.getProgramadores();
  }
  getProgramadores() {
    this.lstProgramadores = this.progService.getProgamadores();
  }

  eliminarProgramador(index: number) {
    //this.lstProgramadores.splice(index, 1);
    this.progService.delete(index);
    this.getProgramadores();
  }
  editar(progToEdit: Programador) {
    console.log('editar. progToEdit ', progToEdit)
 
    
    this.indexProgramadorToEdit = this.lstProgramadores.findIndex(p=> p === progToEdit ); //Se captura el indice del objeto original a editar 
    this.programadorToEdit = {...progToEdit} // Se asigna el valor de este objeto del componente para que lo reciba app-form como input y pueda editarse
    console.log('this.indexProgramadorToEdit at app.editar() ', this.indexProgramadorToEdit);
    this.isEditMode = true;

  }

  handleFormSubmit(updatedProg : Programador)
  {
    if(this.isEditMode)
    {
      //Los datos "nuevos" del objeto programador para actualizarse provienen del evento submittedForm que es emitido por el componente app-form 
      this.progService.editProg(this.indexProgramadorToEdit, updatedProg);
      this.isEditMode = false;
    } else {
      this.progService.addProg(updatedProg);
    }
    this.programadorToEdit = null;
  }

}
