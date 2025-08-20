import { Component } from '@angular/core';
import textEN from '../translations/textEN';
import { ActivatedRoute, RouterLink } from '@angular/router';
import textES from '../translations/textES';
import textDE from '../translations/textDE';
import textPT from '../translations/textPT';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-information',
  imports: [RouterLink],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
  animations: [
    trigger('neonEffect', [
      transition(':enter', [
        animate('1s infinite', keyframes([
          style({ transform: 'scale(1)', color: '#0ff', offset: 0 }),
          style({ transform: 'scale(1.1)', color: '#0ff', offset: 0.5 }),
          style({ transform: 'scale(1)', color: '#0ff', offset: 1 })
        ]))
      ])
    ])]
})
export class InformationComponent {
  volume: number = 50;
  language: string = "EN";
  youtubeLink: string = textEN.youtubeLink;

  // Text variables to translation
  youtubeTxt: string = textEN.youtubeTxt;
  titleTxt: string = textEN.titleTxt;
  introTxt: string = textEN.infoTxt;

  constructor (private route:ActivatedRoute){  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const langParam = localStorage.getItem('lang');
      const volParam = Number(localStorage.getItem('vol'));

      this.language = langParam || 'EN';
      this.volume = volParam || 50;

      localStorage.setItem('lang', this.language);
      localStorage.setItem('vol', this.volume.toString());
    })

    this.translate();
  }

  translate(): void {
    if (this.language == "ES") {
      this.introTxt = textES.infoTxt;
      this.youtubeLink = textES.youtubeLink;
      this.youtubeTxt = textES.youtubeTxt;
      this.titleTxt = textES.titleTxt;
      this.introTxt = textES.introTxt;
    }
    if (this.language == "DE") {
      this.introTxt = textDE.infoTxt;
      this.youtubeLink = textDE.youtubeLink;
      this.youtubeTxt = textDE.youtubeTxt;
      this.titleTxt = textDE.titleTxt;
      this.introTxt = textDE.introTxt;
    }
    if (this.language == "EN") {
      this.introTxt = textEN.infoTxt;
      this.youtubeLink = textEN.youtubeLink;
      this.youtubeTxt = textEN.youtubeTxt;
      this.titleTxt = textEN.titleTxt;
      this.introTxt = textEN.introTxt;
    }
    if (this.language == "PT") {
      this.introTxt = textPT.infoTxt;
      this.youtubeLink = textPT.youtubeLink;
      this.youtubeTxt = textPT.youtubeTxt;
      this.titleTxt = textPT.titleTxt;
      this.introTxt = textPT.introTxt;
    }
  }

  redirect() {
    window.open(this.youtubeLink, "_blank");
  }
}
