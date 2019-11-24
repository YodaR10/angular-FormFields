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
        { nome: "Get to work", tipo: "I" },
        { nome: "Fall asleep", tipo: "F" }
      ],
      requireds: [
        { nome: "Get up", tipo: "I" },
        { nome: "Brush teeth", tipo: "I" }
      ],
      readonlys: []
    },
    {
      name: "Campo 2",
      descrizione: "Primo campo",
      optionals: [
        { nome: "Pippo", tipo: "I" },
        { nome: "Pluto", tipo: "F" },
        { nome: "Paperino", tipo: "F" }
      ],
      requireds: [],
      readonlys: []
    }
  ];

  Spostatutti(config: Config, destList: string) {
    if (destList == "optionals") {
      config.optionals = config.optionals
        .concat(config.requireds)
        .concat(config.readonlys);
      config.requireds = [];
      config.readonlys = [];
    }
    if (destList == "requireds") {
      config.requireds = config.requireds
        .concat(config.optionals)
        .concat(config.readonlys);
      config.optionals = [];
      config.readonlys = [];
    }
    if (destList == "readonlys") {
      config.readonlys = config.readonlys
        .concat(config.requireds)
        .concat(config.optionals);
      config.requireds = [];
      config.optionals = [];
    }
  }

  SpostaFinali(config: Config, destList: string) {
    if (destList == "optionals") {
      config.optionals = config.optionals
        .concat(config.requireds.filter(x => x.tipo == "F"))
        .concat(config.readonlys.filter(x => x.tipo == "F"));
      config.requireds = config.requireds.filter(x => x.tipo != "F");
      config.readonlys = config.readonlys.filter(x => x.tipo != "F");
    }
    if (destList == "requireds") {
      config.requireds = config.requireds
        .concat(config.optionals.filter(x => x.tipo == "F"))
        .concat(config.readonlys.filter(x => x.tipo == "F"));
      config.optionals = config.optionals.filter(x => x.tipo != "F");
      config.readonlys = config.readonlys.filter(x => x.tipo != "F");
    }
    if (destList == "readonlys") {
      config.readonlys = config.readonlys
        .concat(config.requireds.filter(x => x.tipo == "F"))
        .concat(config.optionals.filter(x => x.tipo == "F"));
      config.requireds = config.requireds.filter(x => x.tipo != "F");
      config.optionals = config.optionals.filter(x => x.tipo != "F");
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
