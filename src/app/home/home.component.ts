import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import textEN from '../translations/textEN';
import textDE from '../translations/textDE';
import textES from '../translations/textES';
import textPT from '../translations/textPT';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    language: string = 'EN';
    volume: number = 50;

    titleTxt: string = textEN.titleTxt;
    playTxt: string = textEN.playTxt;
    configTxt: string = textEN.configTxt;
    infoTxt: string = textEN.infoTxt;
    
    constructor(private route:ActivatedRoute){
        this.route.queryParamMap.subscribe(params => {
            const langParam = localStorage.getItem('lang');
            const volParam = localStorage.getItem('vol');
            
            this.language = langParam || localStorage.getItem('lang') || 'EN';
            this.volume = volParam ? Number(volParam) : Number(localStorage.getItem("vol") || 50);
        });
        
        this.translate();
    }
    
    ngOnInit(): void {
        this.language = localStorage.getItem('lang') || this.route.snapshot.paramMap.get('lang') || 'EN';
        this.volume = Number(localStorage.getItem('vol') || this.route.snapshot.paramMap.get('vol') || 50);   
    }
    
    translate(): void {
        if (this.language == 'ES' || this.language == 'Spanish') {
            this.titleTxt = textES.titleTxt;
            this.playTxt = textES.playTxt;
            this.configTxt = textES.configTxt;
            this.infoTxt = textES.infoTxt;  
        }
        if (this.language == 'PT' || this.language == 'Portuguese') {
            this.titleTxt = textPT.titleTxt;
            this.playTxt = textPT.playTxt;
            this.configTxt = textPT.configTxt;
            this.infoTxt = textPT.infoTxt;  
        }
        if (this.language == 'DE' || this.language == 'German') {
            this.titleTxt = textDE.titleTxt;
            this.playTxt = textDE.playTxt;
            this.configTxt = textDE.configTxt;
            this.infoTxt = textDE.infoTxt;  
        }
    }
    
    
}
