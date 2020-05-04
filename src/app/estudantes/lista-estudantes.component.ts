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
  mensagemErro: string;


  constructor(private estudantesService: EstudantesService) {
  }

  ngOnInit(): void {
    this.getEstudantes();
    //this.estudanteFiltrado = this.estudantes;
    //this.filtroLista = '';
    
  }
  getEstudantes(): void {
    this.estudantesService.getEstudantes().subscribe(
      estudantes => {
        this.estudantes = estudantes; 
        this.estudanteFiltrado = this.estudantes;
        this.alturasEstudantes = this.estudantes.map((estudante: IEstudantes) => estudante.altura);
        this.alturaMaxima = Math.max.apply(null, this.alturasEstudantes);
      },
      error => this.mensagemErro = <any>error);
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