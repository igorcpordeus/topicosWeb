import { IEstudantes } from '../estudantes/estudantes';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EstudantesService {
    getEstudantes(): IEstudantes[] {
        return [
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
    }
}