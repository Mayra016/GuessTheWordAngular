import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-word',
  imports: [FormsModule, CommonModule],
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css', '../play/play.component.css'],
  animations: [
  trigger('shakeAnimation', [
    transition('* => shake', [
      animate('3s', keyframes([
        style({ transform: 'translate(2px, 2px) rotate(0deg)', offset: 0 }),
        style({ transform: 'translate(-2px, -2px) rotate(-1deg)', offset: 0.05 }),
        style({ transform: 'translate(-4px, 0px) rotate(1deg)', offset: 0.1 }),
        style({ transform: 'translate(4px, 2px) rotate(0deg)', offset: 0.15 }),
        style({ transform: 'translate(2px, -2px) rotate(1deg)', offset: 0.2 }),
        style({ transform: 'translate(-2px, 3px) rotate(-1deg)', offset: 0.25 }),
        style({ transform: 'translate(-4px, 1px) rotate(0deg)', offset: 0.3 }),
        style({ transform: 'translate(4px, 1px) rotate(-1deg)', offset: 0.35 }),
        style({ transform: 'translate(-2px, -3px) rotate(1deg)', offset: 0.4 }),
        style({ transform: 'translate(2px, 3px) rotate(0deg)', offset: 0.45 }),
        style({ transform: 'translate(2px, -1px) rotate(-1deg)', offset: 0.5 }),
        style({ transform: 'translate(-2px, 1px) rotate(1deg)', offset: 0.55 }),
        style({ transform: 'translate(4px, -2px) rotate(0deg)', offset: 0.6 }),
        style({ transform: 'translate(-4px, 2px) rotate(-1deg)', offset: 0.65 }),
        style({ transform: 'translate(3px, 0px) rotate(1deg)', offset: 0.7 }),
        style({ transform: 'translate(-3px, -2px) rotate(0deg)', offset: 0.75 }),
        style({ transform: 'translate(3px, 1px) rotate(-1deg)', offset: 0.8 }),
        style({ transform: 'translate(-3px, 3px) rotate(1deg)', offset: 0.85 }),
        style({ transform: 'translate(1px, -1px) rotate(0deg)', offset: 0.9 }),
        style({ transform: 'translate(-1px, 2px) rotate(-1deg)', offset: 0.95 }),
        style({ transform: 'translate(2px, -2px) rotate(0deg)', offset: 1 }),
      ]))
    ])
  ])]
})
export class WordComponent {

  @Input() sendTxt: string | undefined;
  @Input() word: string | undefined;
  @Output() isCorrect = new EventEmitter<boolean>();
  
  animationState: string = 'none';
  inputIndexes: number[] = [];
  letters: string[] = [];
  move: number = 0;
  p1: string = "";
  p2: string = "";
  p3: string = "";
  p4: string = "";
  p5: string = "";
  p6: string = "";
  p7: string = "";
  p8: string = "";
  p9: string = "";
  p10: string = "";
  p11: string = "";
  p12: string = "";

  letterBtns: string[] = [];


  possibleMoves: number[][] = [
    [7, 3, 4, 8, 12, 11, 10, 9, 5, 1, 2, 6],
    [7, 8, 12, 11, 10, 9, 5, 6, 1, 2, 3, 4],
    [7, 11, 12, 8, 4, 3, 2, 6, 10, 9, 5, 1],
    [7, 3, 2, 1, 5, 6, 9, 10, 11, 12, 8, 4],
    [6, 2, 1, 5, 9, 10, 11, 12, 8, 4, 3, 7],
    [6, 5, 1, 2, 3, 4, 8, 7, 12, 11, 10, 9],
    [6, 5, 9, 10, 11, 12, 8, 7, 4, 3, 2, 1],
    [6, 10, 9, 5, 1, 2, 3, 4, 8, 12, 11, 7],
    [6, 10, 11, 12, 8, 4, 7, 3, 2, 1, 5, 9],
    [10, 9, 5, 6, 7, 11, 12, 8, 4, 3, 2, 1],
    [10, 11, 12, 8, 4, 3, 7, 6, 2, 1, 5, 9],
    [10, 6, 7, 11, 12, 8, 4, 3, 2, 1, 5, 9],
    [11, 12, 8, 4, 3, 7, 6, 2, 1, 5, 9, 10],
    [11, 7, 6, 10, 9, 5, 1, 2, 3, 4, 8, 12],
    [11, 10, 6, 7, 12, 8, 4, 3, 2, 1, 5, 9],
    [2, 1, 5, 9, 10, 11, 12, 8, 4, 3, 7, 6],
    [2, 1, 5, 6, 7, 3, 4, 8, 12, 11, 10, 9],
    [2, 3, 4, 8, 12, 11, 7, 6, 10, 9, 5, 1],
    [2, 3, 4, 8, 7, 6, 12, 11, 10, 9, 5, 1],
    [2, 6, 7, 3, 4, 8, 12, 11, 10, 9, 5, 1],
    [2, 6, 1, 5, 9, 10, 11, 12, 8, 4, 3, 7],
    [3, 4, 8, 12, 11, 7, 6, 10, 9, 5, 1, 2],
    [3, 4, 8, 7, 6, 2, 1, 5, 9, 10, 11, 12],
    [3, 4, 8, 7, 6, 2, 1, 5, 9, 10, 11, 12],
    [3, 7, 6, 2, 1, 5, 9, 10, 11, 12, 8, 4],
    [3, 7, 4, 8, 12, 11, 10, 9, 5, 1, 2, 6]
  ];

  ngOnChanges(): void {
    this.letterBtns = [];
    this.generateLetters();
  }

  generateLetters(): void {
    this.move = Math.floor(Math.random() * this.possibleMoves.length);

    for (let i = 0; i < this.possibleMoves[this.move].length; i++) {
      this.letterBtns.push(String(this.word?.charAt(this.possibleMoves[this.move][i] - 1)).toUpperCase());
    }
  }
  
  updateInput(letterIndex: number) {
    let findLetter = this.inputIndexes.find(num => num === letterIndex);
      
    if (findLetter !== undefined) {
      if (this.inputIndexes.length === 1) {
        this.inputIndexes = [];
      } else {
        this.inputIndexes = this.inputIndexes.filter(num => num !== letterIndex);
      }
    } else {
      this.inputIndexes.push(letterIndex);
    }

  }
  

  checkAnswer(): void {
    const letters = Array.from(this.word || '');
    let correct = true;
    
    if (this.inputIndexes.length !== letters.length) {
      this.animationState = 'shake';
      this.isCorrect.emit(false);
      return;
    }
  
    
    for (let i = 0; i < letters.length; i++) {
      if (String(this.word?.charAt(i)).toLowerCase() !== this.letterBtns[this.inputIndexes[i]].toLowerCase()) {
        correct = false;
        break;
      }
      
    }
  
    if (correct) {
      this.inputIndexes = [];
      this.isCorrect.emit(true);
    } else {
      this.isCorrect.emit(false);
      this.animationState = 'shake';
      this.inputIndexes = [];
    }
  }
  
}
