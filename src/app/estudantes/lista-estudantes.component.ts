import { Component } from '@angular/core';

@Component({
    selector: 'jedi-estudantes',
    templateUrl: './lista-estudantes.component.html'
})
export class ListaEstudantesComponent {
    tituloPagina: string = "Lista de Estudantes";
    estudantes: any[] = [
        {
          "estudanteId": 1,
          "nomeEstudante": "Ancinho",
          "sexoEstudante": "M",
          "planeta": "marte",
          "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        },
        {
            "estudanteId": 2,
            "nomeEstudante": "Chico",
            "sexoEstudante": "M",
            "planeta": "venus",
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
          },
          {
            "estudanteId": 5,
            "nomeEstudante": "Maria",
            "sexoEstudante": "F",
            "planeta": "terra",
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
          },
          {
            "estudanteId": 6,
            "nomeEstudante": "Chica",
            "sexoEstudante": "F",
            "planeta": "jupiter",
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
          },
          {
            "estudanteId": 9,
            "nomeEstudante": "Jose",
            "sexoEstudante": "M",
            "planeta": "Saturno",
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
          },
      ]
      
}