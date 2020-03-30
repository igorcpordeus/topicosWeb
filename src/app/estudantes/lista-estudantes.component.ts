import { Component } from '@angular/core';

@Component({
    selector: 'jedi-estudantes',
    templateUrl: './lista-estudantes.component.html'
})
export class ListaEstudantesComponent {
    tituloPagina: string = "Lista de Estudantes";
    larguraImagem: number = 50; 
    margemImagem: number = 2;
    exibirImagem: boolean = false;
    filtroLista: string = "teste";

    estudantes: any[] = [
        {
          "estudanteId": 1,
          "nomeEstudante": "Ancinho",
          "sexoEstudante": "M",
          "planeta": "marte",
          "urlImagem": "./assets/imagens/anakin_skywalker.jpg"
        },
        {
            "estudanteId": 2,
            "nomeEstudante": "Chico",
            "sexoEstudante": "M",
            "planeta": "venus",
            "urlImagem": "./assets/imagens/beru_whitesun_lars.jpg"
          },
          {
            "estudanteId": 5,
            "nomeEstudante": "Maria",
            "sexoEstudante": "F",
            "planeta": "terra",
            "urlImagem": "./assets/imagens/biggs_darklighter.jpg"
          },
          {
            "estudanteId": 6,
            "nomeEstudante": "Chica",
            "sexoEstudante": "F",
            "planeta": "jupiter",
            "urlImagem": "./assets/imagens/c-3po.jpg"
          },
          {
            "estudanteId": 9,
            "nomeEstudante": "Jose",
            "sexoEstudante": "M",
            "planeta": "Saturno",
            "urlImagem": "./assets/imagens/chewbacca.jpg"
          },
      ]
      alternarImagem(): void{
        this.exibirImagem = !this.exibirImagem;
      };
}