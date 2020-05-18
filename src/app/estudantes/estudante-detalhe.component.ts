import { Component, OnInit } from '@angular/core';
import { IEstudantes } from './estudantes';

@Component({
  selector: 'agp-estudante-detalhe',
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  tituloPagina: String = "Detalhe do Estudante";
  estudante: IEstudantes;

  constructor() { }

  ngOnInit(): void {
  }

}
