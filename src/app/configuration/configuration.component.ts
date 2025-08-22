import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import textEN from '../translations/textEN';
import textES from '../translations/textES';
import textDE from '../translations/textDE';
import textPT from '../translations/textPT';

@Component({
  selector: 'app-configuration',
  imports: [FormsModule, RouterLink],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
    language: string = "EN";
    volume: number = 50;
    volIn: HTMLInputElement | null = null;
    volOut: HTMLElement | null = null;

    titleTxt: string = textEN.titleTxt;
    languageTxt: string = textEN.languageTxt;
    volumeTxt: string = textEN.volumeTxt;
    saveTxt: string = textEN.saveTxt;
    
    constructor(private route:ActivatedRoute) {}
    
    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params: ParamMap) => {
              const langParam = localStorage.getItem('lang');
              const volParam = localStorage.getItem('vol');
          
              this.language = langParam || localStorage.getItem('lang') || 'EN';
              this.volume = volParam ? Number(volParam) : Number(localStorage.getItem("vol")) || 50;

              if (this.volume != 50) {
                  localStorage.setItem("vol", this.volume.toString());
              }

              
        });

        this.translate();
    }
    
    ngAfterViewInit(): void {
        this.volIn = document.getElementById("vol-in") as HTMLInputElement;
        this.volOut = document.getElementById("vol-out");
    }
    
    translate(): void {
        if (this.language == "ES" || this.language == "Spanish") {
            this.titleTxt = textES.titleTxt;
            this.languageTxt = textES.languageTxt;
            this.volumeTxt = textES.volumeTxt;
            this.saveTxt = textES.saveTxt;
        }
        if (this.language == "DE" || this.language == "German") {
            this.titleTxt = textDE.titleTxt;
            this.languageTxt = textDE.languageTxt;
            this.volumeTxt = textDE.volumeTxt;
            this.saveTxt = textDE.saveTxt;
        }
        if (this.language == "PT" || this.language == "Portuguese") {
            this.titleTxt = textPT.titleTxt;
            this.languageTxt = textPT.languageTxt;
            this.volumeTxt = textPT.volumeTxt;
            this.saveTxt = textPT.saveTxt;
        }
        if (this.language == "EN" || this.language == "English") {
            this.titleTxt = textEN.titleTxt;
            this.languageTxt = textEN.languageTxt;
            this.volumeTxt = textEN.volumeTxt;
            this.saveTxt = textEN.saveTxt;
        }
    }

    onLanguageChange(): void {
        localStorage.setItem('lang', this.language);
        this.translate();
    }
    
    @ViewChild('audioElement', {static:true}) audioElement!: ElementRef<HTMLAudioElement>;
    onVolumeChange(newVolume: number): void {
        this.volume = newVolume;
        localStorage.setItem('vol', String(newVolume));
        this.audioElement.nativeElement.volume = newVolume / 100;
    }
}
