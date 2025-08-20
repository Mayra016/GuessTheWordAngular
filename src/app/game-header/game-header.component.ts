import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css', '../play/play.component.css']
})
export class GameHeaderComponent {
  @Input() lifes: number | undefined;
  @Input() score: number | undefined;
  @Input() scoreTxt: string | undefined;
  @Input() titleTxt: string | undefined;

  constructor(private route: ActivatedRoute){}

}
