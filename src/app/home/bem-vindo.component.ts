import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './bem-vindo.component.html'
})
export class BemVindoComponent implements OnInit {

  tituloPagina: String = "Bem vindo";
  constructor() { }

  ngOnInit(): void {
  }

}
