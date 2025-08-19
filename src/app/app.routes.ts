import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { LanguageComponent } from './language/language.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
    {path: 'menu', component: HomeComponent},
    {path: 'play', component: PlayComponent},
    {path: 'configuration', component: ConfigurationComponent},
    {path: 'information', component: InformationComponent},
    {path: '**', redirectTo: 'menu'}
];
