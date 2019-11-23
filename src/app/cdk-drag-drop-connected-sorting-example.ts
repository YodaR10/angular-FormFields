import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

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
      optionals: ["Get to work", "Pick up groceries", "Go home", "Fall asleep"],
      requireds: [
        "Get up",
        "Brush teeth",
        "Take a shower",
        "Check e-mail",
        "Walk dog"
      ],
      readonlys: []
    },
    {
      name: "Campo 2",
      descrizione: "Primo campo",
      optionals: ["Pippo","Pluto","Paperino"],
      requireds: [],
      readonlys: []
    }
  ];

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
