import { Component, OnChanges, Input } from "@angular/core";

@Component({
    selector: "jedi-altura",
    templateUrl: './rating.component.html', 
    styleUrls: ['./rating.component.css']
})

export class AlturaComponent implements OnChanges{
    
   @Input() altura: number;
   @Input() alturaMaxima: number; 
   larguraIcone: number;
    
    ngOnChanges(): void { 
        this.larguraIcone = this.altura * 100 / this.alturaMaxima;
        console.log(this.larguraIcone);
    }
    
}