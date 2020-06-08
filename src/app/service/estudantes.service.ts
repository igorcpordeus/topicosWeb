import { IEstudantes } from '../estudantes/estudantes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})


export class EstudantesService {

    private estudantesUrl = '//localhost:8080/estudantesapi/estudantes';

    constructor(private http: HttpClient) { }

    getEstudantes(): Observable<IEstudantes[]> {
        return this.http.get<IEstudantes[]>(this.estudantesUrl + '/todos').pipe(
            tap(dados => console.log('Todos: ' + JSON.stringify(dados))),
            catchError(this.trataErro));
    }

    getEstudante(id: string): Observable<IEstudantes> { 
        if (id === "0") {
            return of(this.inicializarEstudante()); 
        }
        const url = `${this.estudantesUrl}/${id}`;
        return this.http.get<IEstudantes>(url).pipe(
            tap(data => console.log('getEstudantes: ' + JSON.stringify(data))),
            catchError(this.trataErro) );
    }

    private inicializarEstudante(): IEstudantes { 
        return { 
            id: '0',
            nomeEstudante: null, 
            sexoEstudante: null, 
            planeta: null,
            altura: null, 
            urlImagem: null
        }; 
    }

    deletarEstudante(id: string): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
        const url = `${this.estudantesUrl}/${id}`;
        return this.http.delete<IEstudantes>(url, { headers }).pipe(
            tap(data => console.log('deletarEstudante: ' + id)), catchError(this.trataErro)); 
    }

    atualizarEstudante(estudante: IEstudantes): Observable<IEstudantes> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
        const url = `${this.estudantesUrl}/atualiza/${estudante.id}`;
        return this.http.put<IEstudantes>(url, estudante, { headers }).pipe(
            tap(() => console.log('atualizarEstudante: ' + estudante.id)),
            map(() => estudante),
            catchError(this.trataErro) );
    }

    criarEstudante(estudante: IEstudantes): Observable<IEstudantes> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
        estudante.id = null;
        return this.http.post<IEstudantes>(this.estudantesUrl + "/novo", estudante, { headers }).pipe(
            tap(data => console.log('criarEstudante: ' + JSON.stringify(data))), 
            catchError(this.trataErro)
        );
    }

    private trataErro(erro: HttpErrorResponse) {
        // Em uma aplicação real, podemos enviar o erro para alguma infraestrutura 
        // remota de log, ao invés de simplesmente enviar para o console
        let mensagemErro = '';
        if (erro.error instanceof ErrorEvent) {
            // Um erro no lado cliente ou de rede ocorreu. Tratar adequadamente
            mensagemErro = `Um erro ocorreu: ${erro.error.message}`;
        } else {
            // Back-end retornou um código de resposta de falha
            // O corpo da resposta pode conter dicas sobre o que deu errado
            mensagemErro = `Servidor retornou o código: ${erro.status}, a mensagem de erro é ${erro.message}`;
        }
        console.error(mensagemErro); return throwError(mensagemErro);
    }

}

