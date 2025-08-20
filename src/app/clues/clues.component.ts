import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clues',
  imports: [],
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.css', '../play/play.component.css']
})
export class CluesComponent {
  @Input() clue: string | undefined;
  @Input() cluesTxt: string | undefined;

  constructor(){}

}
