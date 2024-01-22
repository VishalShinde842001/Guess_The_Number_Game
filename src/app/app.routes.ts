import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { SubmitComponent } from './submit/submit.component';
import { ScoreComponent } from './score/score.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AboutdeveloperComponent } from './aboutdeveloper/aboutdeveloper.component';


export const routes: Routes = [{
    path:"register",component:RegisterComponent
},{
    path:"login",component:LoginComponent
},{
    path:"startGame",component:StartComponent
},{
    path:"submit",component:SubmitComponent
},{
    path:"score",component:ScoreComponent
},{
    path:"aboutus",component:AboutusComponent
},{
    path:"instructions",component:InstructionsComponent
},{
    path:"contactus",component:ContactusComponent
},{
    path:"feedback",component:FeedbackComponent
},{
    path:"leaderboard",component:LeaderboardComponent
},{
    path:"aboutdeveloper",component:AboutdeveloperComponent
}];
