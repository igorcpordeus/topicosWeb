import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'SexoPipe'
})
export class SexoPipe implements PipeTransform {
    transform(valor: string, caractere: string): string {
        if(caractere === "masculino"){
            return valor.replace(caractere, 'M');
        }
        else if(caractere === "feminino"){
            return valor.replace(caractere, 'F');
        }
        return caractere;
    }
}