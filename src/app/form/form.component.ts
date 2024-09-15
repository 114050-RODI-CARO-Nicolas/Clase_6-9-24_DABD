import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Programador } from '../programador';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ProgService } from '../prog.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  //providers:[ProgService]
})
export class FormComponent implements OnChanges {
  @Input() progToEdit : Programador | null = null; //Referencia al programador a ser editado
  @Output() submittedForm = new EventEmitter<Programador>();

  prog: Programador = new Programador(); //Almacena el estado actual del formulario

  ngOnChanges(changes : SimpleChanges): void {
    //TODO: validar que cambie el input progEdit para seguir el flujo de edición
    if(changes['progToEdit'] && this.progToEdit)
    {
     this.prog = {... this.progToEdit};
     console.log('Flujo de edicion, this.prog: ', this.prog)
    }
    
  }


  listHabilidades: string[] = ['.Net', 'Java', 'Javascript', 'AWS'];

  habilidadSeleccionada: string = '';
  sendForm(form: NgForm) {
    

    if (form.valid) {
     this.submittedForm.emit(this.prog)
     this.resetForm();
   
    }  
  }

  agregarHabilidades() {
    if (!this.prog.habilidades.includes(this.habilidadSeleccionada))
      this.prog.habilidades.push(this.habilidadSeleccionada);
  }
  eliminarHabilidades(index: number) {
    this.prog.habilidades.splice(index, 1);
  }

  private resetForm(){
    this.prog = new Programador();
    this.habilidadSeleccionada = "";
  }
  
}
