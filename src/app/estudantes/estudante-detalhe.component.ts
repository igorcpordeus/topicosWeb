import { Component, OnInit } from '@angular/core';
import { IEstudantes } from './estudantes';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudantesService } from '../service/estudantes.service';

@Component({
  selector: 'agp-estudante-detalhe',
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  tituloPagina: String = "Detalhe do Estudante";
  estudante: IEstudantes | undefined;
  mensagemErro: String = "";

  constructor(private route: ActivatedRoute, private router: Router, 
    private estudanteService: EstudantesService) { }

  ngOnInit(): void {
    let param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getEstudante(id); 
    }
  }

  getEstudante(id : string) { this.estudanteService.getEstudante(id).subscribe(
    estudante => this.estudante = estudante,
    error => this.mensagemErro = <any>error )
  }

  onVoltar(): void{
    this.router.navigate(['/estudantes']);
  }

}
