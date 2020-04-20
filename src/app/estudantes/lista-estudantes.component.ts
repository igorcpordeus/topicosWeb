import { Component, OnInit } from '@angular/core';
import { IEstudantes } from './estudantes';
import { EstudantesService } from '../service/estudantes.service';

@Component({
  selector: 'jedi-estudantes',
  templateUrl: './lista-estudantes.component.html'
  
})
export class ListaEstudantesComponent implements OnInit {

  tituloPagina: string = "Lista de Estudantes";
  larguraImagem: number = 50;
  margemImagem: number = 2;
  exibirImagem: boolean = false;
  _filtroLista: string;
  estudanteFiltrado: IEstudantes[];
  alturasEstudantes: number[];
  alturaMaxima: number;
  estudantes: IEstudantes[];
  

  constructor(private estudantesService: EstudantesService) {
  }

  ngOnInit(): void {
    this.estudantes = this.estudantesService.getEstudantes();
    this.estudanteFiltrado = this.estudantes; 
    this.filtroLista = '';
    this.alturasEstudantes = this.estudantes.map((estudante: IEstudantes) => estudante.altura);
    this.alturaMaxima = Math.max.apply(null, this.alturasEstudantes);
    //console.log(this.alturaMaxima);
  }

  alternarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  };

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(valor: string) {
    this._filtroLista = valor;
    this.estudanteFiltrado = this.filtroLista ? this.executarFiltro(this.filtroLista) : this.estudantes;
  }

  executarFiltro(filtrarPor: string): IEstudantes[] { 
    filtrarPor = filtrarPor.toLocaleLowerCase(); 
    return this.estudantes.filter((estudante: IEstudantes) =>
      estudante.nomeEstudante.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }
}