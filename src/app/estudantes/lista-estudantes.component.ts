import { Component, OnInit } from '@angular/core';
import { IEstudantes } from './estudantes';

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

  constructor() {
    this.estudanteFiltrado = this.estudantes; 
    this.filtroLista = '';
  }

  ngOnInit(): void {
    this.alturasEstudantes = this.estudantes.map((estudante: IEstudantes) => estudante.altura);
    this.alturaMaxima = Math.max.apply(null, this.alturasEstudantes);
    //console.log(this.alturaMaxima);
  }

  estudantes: IEstudantes[] = [
    {
      "estudanteId": 1,
      "nomeEstudante": "Ancinho",
      "sexoEstudante": "masculino",
      "planeta": "marte",
      "altura": 1.90,
      "urlImagem": "./assets/imagens/anakin_skywalker.jpg"
    },
    {
      "estudanteId": 2,
      "nomeEstudante": "Chico",
      "sexoEstudante": "masculino",
      "planeta": "venus",
      "altura": 1.80,
      "urlImagem": "./assets/imagens/beru_whitesun_lars.jpg"
    },
    {
      "estudanteId": 5,
      "nomeEstudante": "Maria",
      "sexoEstudante": "feminino",
      "planeta": "terra",
      "altura": 1.70,
      "urlImagem": "./assets/imagens/biggs_darklighter.jpg"
    },
    {
      "estudanteId": 6,
      "nomeEstudante": "Chica",
      "sexoEstudante": "feminino",
      "planeta": "jupiter",
      "altura": 1.50,
      "urlImagem": "./assets/imagens/c-3po.jpg"
    },
    {
      "estudanteId": 9,
      "nomeEstudante": "Jose",
      "sexoEstudante": "homosexual",
      "planeta": "Saturno",
      "altura": 1.60,
      "urlImagem": "./assets/imagens/chewbacca.jpg"
    },
  ]
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