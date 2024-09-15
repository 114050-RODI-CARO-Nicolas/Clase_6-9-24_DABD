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
 
    this.programadorToEdit = {...progToEdit}
    console.log('progToEdit ', this.programadorToEdit)
    this.isEditMode = true;

  }

  handleFormSubmit(updatedProg : Programador)
  {
    if(this.isEditMode)
    {
      this.progService.editProg(this.programadorToEdit, updatedProg);
      this.isEditMode = false;
    } else {
      this.progService.addProg(updatedProg);
    }
    this.programadorToEdit = null;
  }

}
