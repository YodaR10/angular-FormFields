import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

interface Config {
  name: string;
  descrizione: string;
  optionals: Azione[];
  requireds: Azione[];
  readonlys: Azione[];
}

interface Azione {
  nome: string;
  tipo: string;
  fkFlow: number;
}

interface Flusso {
  id: number;
  name: string;
}

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: "cdk-drag-drop-connected-sorting-example",
  templateUrl: "cdk-drag-drop-connected-sorting-example.html",
  styleUrls: ["cdk-drag-drop-connected-sorting-example.css"]
})
export class CdkDragDropConnectedSortingExample {
  config = [
    {
      name: "Campo 1",
      descrizione: "Primo campo",
      optionals: [
        { nome: "Get to work", tipo: "I", fkFlow: 1 },
        { nome: "Fall asleep", tipo: "F", fkFlow: 2 }
      ],
      requireds: [
        { nome: "Get up", tipo: "I", fkFlow: 1 },
        { nome: "Brush teeth", tipo: "I", fkFlow: 2 }
      ],
      readonlys: []
    },
    {
      name: "Campo 2",
      descrizione: "Primo campo",
      optionals: [
        { nome: "Pippo", tipo: "I", fkFlow: 1 },
        { nome: "Pluto", tipo: "F", fkFlow: 2 },
        { nome: "Paperino", tipo: "F", fkFlow: 3 }
      ],
      requireds: [],
      readonlys: []
    }
  ];

  flussi: Flusso[]= [
    {id: 1, name: 'Primo'},
    {id: 2, name: 'Secondo'},
    {id: 3, name: 'Terzo'},
  ]

  flussiSelezionati: number[]= [];

  filtraAzioni(azioni: Azione[]): Azione[] {  
    return azioni.filter(i => this.flussiSelezionati.indexOf(i.fkFlow) > -1);
  }
  filtraAltreAzioni(azioni: Azione[]): Azione[] {  
    return azioni.filter(i => this.flussiSelezionati.indexOf(i.fkFlow) == -1);
  }
  filtraAltreAzioniONonFinali(azioni: Azione[]): Azione[] {  
    return azioni.filter(i => this.flussiSelezionati.indexOf(i.fkFlow) == -1 || i.tipo != 'F');
  }

  Spostatutti(config: Config, destList: string) {
    if (destList == "optionals") {
      config.optionals = config.optionals
        .concat(this.filtraAzioni(config.requireds))
        .concat(this.filtraAzioni(config.readonlys));
      config.requireds = this.filtraAltreAzioni(config.requireds);
      config.readonlys = this.filtraAltreAzioni(config.readonlys);
    }
    if (destList == "requireds") {
      config.requireds = config.requireds
        .concat(this.filtraAzioni(config.optionals))
        .concat(this.filtraAzioni(config.readonlys));
      config.optionals = this.filtraAltreAzioni(config.optionals);
      config.readonlys = this.filtraAltreAzioni(config.readonlys);
    }
    if (destList == "readonlys") {
      config.readonlys = config.readonlys
        .concat(this.filtraAzioni(config.requireds))
        .concat(this.filtraAzioni(config.optionals));
      config.requireds = this.filtraAltreAzioni(config.requireds);
      config.optionals = this.filtraAltreAzioni(config.optionals);
    }
  }

  SpostaFinali(config: Config, destList: string) {
    if (destList == "optionals") {
      config.optionals = config.optionals
        .concat(this.filtraAzioni(config.requireds.filter(x => x.tipo == "F")))
        .concat(this.filtraAzioni(config.readonlys.filter(x => x.tipo == "F")));
      config.requireds = this.filtraAltreAzioniONonFinali(config.requireds);
      config.readonlys = this.filtraAltreAzioniONonFinali(config.readonlys);
    }
    if (destList == "requireds") {
      config.requireds = config.requireds
        .concat(this.filtraAzioni(config.optionals.filter(x => x.tipo == "F")))
        .concat(this.filtraAzioni(config.readonlys.filter(x => x.tipo == "F")));
      config.optionals = this.filtraAltreAzioniONonFinali(config.optionals);
      config.readonlys = this.filtraAltreAzioniONonFinali(config.readonlys);
    }
    if (destList == "readonlys") {
      config.readonlys = config.readonlys
        .concat(this.filtraAzioni(config.requireds.filter(x => x.tipo == "F")))
        .concat(this.filtraAzioni(config.optionals.filter(x => x.tipo == "F")));
      config.requireds = this.filtraAltreAzioniONonFinali(config.requireds);
      config.optionals = this.filtraAltreAzioniONonFinali(config.optionals);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
