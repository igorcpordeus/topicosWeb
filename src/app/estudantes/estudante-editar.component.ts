import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEstudantes } from './estudantes';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudantesService } from '../service/estudantes.service';
import { GenericValidator } from '../compartilhado/generic-validator';
import { NumberValidators } from '../compartilhado/number-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'agp-estudante-editar',
  templateUrl: './estudante-editar.component.html',
  styleUrls: ['./estudante-editar.component.css']
})
export class EstudanteEditarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  tituloPagina = 'Edição de Estudantes'; 
  errorMessage: string; 
  formEstudante: FormGroup;
  estudante: IEstudantes;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(this.formEstudante.valueChanges, ...controlBlurs).pipe(debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.formEstudante);
    });
  }

  constructor(private fb: FormBuilder, 
          private rota: ActivatedRoute,
          private roteador: Router,
          private servicoEstudantes: EstudantesService) {

    this.validationMessages = {
      nomeEstudante: {
        required: 'O nome do Estudante é obrigatório.',
        minlength: 'O nome do Estudante precisa ter pelo menos três caracteres.',
        maxlength: 'O nome do Estudante não pode exceder 50 caracteres.'
      }, 
      sexo: {
        required: 'O sexo do Estudante é obrigatório.'
      },
      planeta: {
        required: 'O Planeta é obrigatório.',
      }, 
      rating: {
        faixa: 'Avalie o produto entre 1 (mínimo) e 5 (máximo).'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.formEstudante = this.fb.group({
      nomeEstudante: ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      sexo: ['', Validators.required],
      planeta: ['', Validators.required,],
      rating: ['', NumberValidators.faixa(1, 5)],
    });
    
    this.sub = this.rota.paramMap.subscribe(
      params => { const id = params.get('id'); this.getEstudante(id); }
    );
    
  }

  getEstudante(id: string): void {
    this.servicoEstudantes.getEstudante(id)
    .subscribe({
      next: (estudante: IEstudantes) => this.exibeEstudante(estudante),
      error: err => this.errorMessage = err
    });
  }

  exibeEstudante(estudante: IEstudantes): void {
    if (this.formEstudante) {
      this.formEstudante.reset();
    }
    this.estudante = estudante;
    if (this.estudante.id === '0') {
      this.tituloPagina = 'Adicionar Estudante';
    } else {
      this.tituloPagina = `Editar Estudante: ${this.estudante.nomeEstudante}`;
    }

    this.formEstudante.patchValue({
      nomeEstudante: this.estudante.nomeEstudante,
      sexo: this.estudante.sexoEstudante,
      planeta: this.estudante.planeta,
      rating: this.estudante.altura,
    });
  }

  deletarEstudante(): void {
    if (this.estudante.id === '0') {
      this.onSaveComplete();
    } else {
      if (confirm(`Remover o Estudante: ${this.estudante.nomeEstudante}?`)) {
        this.servicoEstudantes.deletarEstudante(this.estudante.id)
          .subscribe({
            next: () => {
              alert("Estudante removido. Clique para voltar à lista"); this.onSaveComplete()
            },
          });
        error: err => this.errorMessage = err;
      }
    }
  }

  onSaveComplete(): void { 
    this.formEstudante.reset();
    this.roteador.navigate(['/estudantes']);
  }

  salvarEstudante(): void {
    if (this.formEstudante.valid) {
      if (this.formEstudante.dirty) {
        const p = { ...this.estudante, ...this.formEstudante.value }; 
        if (p.id === 0) {
          this.servicoEstudantes.criarEstudante(p).subscribe({
            next: () => { this.onSaveComplete(),
            alert("Estudante "+ p.nomeEstudante + " criado!. Clique para visualizá-lo na lista");
            error: err => this.errorMessage = err }
          });
        } else { 
          this.servicoEstudantes.atualizarEstudante(p).subscribe({
            next: () => this.onSaveComplete(), error: err => this.errorMessage = err
          });
        }
      } else {
          this.onSaveComplete(); 
        }
    } else {
        this.errorMessage = 'Por favor corrija os erros de validação.';
      }
  }

}
