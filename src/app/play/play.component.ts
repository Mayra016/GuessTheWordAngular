import { Component, EventEmitter, Output } from '@angular/core';
import { GameHeaderComponent } from "../game-header/game-header.component";
import { CluesComponent } from "../clues/clues.component";
import { WordComponent } from "../word/word.component";
import textEN from '../translations/textEN';
import { ActivatedRoute } from '@angular/router';
import textES from '../translations/textES';
import textDE from '../translations/textDE';
import textPT from '../translations/textPT';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-play',
  imports: [GameHeaderComponent, CluesComponent, WordComponent, FormsModule, CommonModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])]
})
export class PlayComponent {
  // Global variables
  language: string = "EN";
  timer: number = 0;
  score: number = 0;
  volume: number = 50;
  lifes: number = 3;
  clue: string = "";
  word: string = "";
  hasWon: boolean = false;
  hasLost: boolean = false;
  file: any;
  maxLevels: number = 50;
  playedLevels: number[] = [];
  wordIndex: number = 0;
  levelPoints: number = 30;
  
  // Text variables for translation
  lostScoreTxt: string = textEN.lostScore;
  nextTxt: string = textEN.nextTxt;
  lostTxt: string = textEN.lostTxt;
  winTxt: string = textEN.winTxt;
  playAgainTxt: string = textEN.playAgainTxt;
  sendTxt: string = textEN.sendTxt;
  cluesTxt: string = textEN.cluesTxt;
  wordTxt: string = textEN.wordTxt;
  scoreTxt: string = textEN.scoreTxt;
  titleTxt: string = textEN.titleTxt;
  lostWordTxt: string = textEN.lostWordTxt;

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const langParam = localStorage.getItem('lang');
      const volParam = localStorage.getItem('vol');

      this.language = langParam || "EN";
      this.volume = volParam ? Number(volParam) : 50;

      localStorage.setItem('lang', this.language)
      localStorage.setItem('vol', String(this.volume));
    })

    // load ddbb
    fetch('assets/Descubre la palabra 21.05.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const wb = XLSX.read(buffer, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        this.file = XLSX.utils.sheet_to_json(ws, { header: 1 });
        this.translate();
        this.generateLevel();
        this.time();
      })
      .catch(err => console.error('Error loading data base:', err));




  }

  // generate level
  generateLevel(): void {
    let level = Math.floor(Math.random() * this.maxLevels);

    while (this.playedLevels.includes(level)) {
      level = Math.floor(Math.random() * this.maxLevels);
    }

    this.playedLevels.push(level);

    this.word = this.file[level][this.wordIndex];
    this.clue = this.file[level][this.wordIndex + 1];


  }

  // timer
  async time() {

    while (this.timer < 60) {
  
      if (this.timer == 20) {
        this.levelPoints = 20;
      }
  
      if (this.timer == 30) {
        this.levelPoints = 10;
      }

      this.timer++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // check answer
  onIsCorrect(answer: boolean) {
    if (answer) {
      this.score += this.levelPoints;
      this.hasWon = true;
    } else {
      if (this.lifes > 1) {
        this.lifes--;
      } else {
        this.hasLost = true;
      }  
    }
  }

  won(): void {
    this.generateLevel();
    this.levelPoints = 30;
    this.timer = 0;
    this.hasWon = false;
  }

  lost(): void {
    this.clue = "";
    this.word = "";
    this.score = 0;
    this.timer = 0;
    this.lifes = 3;
    this.levelPoints = 30;
    this.playedLevels = [];
    this.hasWon = false;
    this.hasLost = false;
    this.generateLevel();
  }
  

  translate(): void {
    if (this.language == "ES") {
      this.lostScoreTxt = textES.lostScore;
      this.nextTxt = textES.nextTxt;
      this.lostTxt = textES.lostTxt;
      this.winTxt = textES.winTxt;
      this.playAgainTxt = textES.playAgainTxt;
      this.sendTxt = textES.sendTxt;
      this.cluesTxt = textES.cluesTxt;
      this.wordTxt = textES.wordTxt;
      this.scoreTxt = textES.scoreTxt;
      this.titleTxt = textES.titleTxt;
      this.lostWordTxt = textES.lostWordTxt;

      this.maxLevels = 182;
      this.wordIndex = 0;
    }
    if (this.language == "EN") {
      this.lostScoreTxt = textEN.lostScore;
      this.nextTxt = textEN.nextTxt;
      this.lostTxt = textEN.lostTxt;
      this.winTxt = textEN.winTxt;
      this.playAgainTxt = textEN.playAgainTxt;
      this.sendTxt = textEN.sendTxt;
      this.cluesTxt = textEN.cluesTxt;
      this.wordTxt = textEN.wordTxt;
      this.scoreTxt = textEN.scoreTxt;
      this.titleTxt = textEN.titleTxt;
      this.lostWordTxt = textEN.lostWordTxt;

      this.wordIndex = 8;
      this.maxLevels = 152;
    }
    if (this.language == "DE") {
      this.lostScoreTxt = textDE.lostScore;
      this.nextTxt = textDE.nextTxt;
      this.lostTxt = textDE.lostTxt;
      this.winTxt = textDE.winTxt;
      this.playAgainTxt = textDE.playAgainTxt;
      this.sendTxt = textDE.sendTxt;
      this.cluesTxt = textDE.cluesTxt;
      this.wordTxt = textDE.wordTxt;
      this.scoreTxt = textDE.scoreTxt;
      this.titleTxt = textDE.titleTxt;
      this.lostWordTxt = textDE.lostWordTxt;

      this.wordIndex = 12;
      this.maxLevels = 107;
    }
    if (this.language == "PT") {
      this.lostScoreTxt = textPT.lostScore;
      this.nextTxt = textPT.nextTxt;
      this.lostTxt = textPT.lostTxt;
      this.winTxt = textPT.winTxt;
      this.playAgainTxt = textPT.playAgainTxt;
      this.sendTxt = textPT.sendTxt;
      this.cluesTxt = textPT.cluesTxt;
      this.wordTxt = textPT.wordTxt;
      this.scoreTxt = textPT.scoreTxt;
      this.titleTxt = textPT.titleTxt;
      this.lostWordTxt = textPT.lostWordTxt;
      
      this.maxLevels = 155;
      this.wordIndex = 3;
    }
  }
}
