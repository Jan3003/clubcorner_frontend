import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TeamPage } from '../pages/team/team';
import { LoginPage } from '../pages/login/login';
import {Services} from "../providers/trainer/trainer";
import {Person} from "../Schema/person.schema";
import jwt_decode from 'jwt-decode';
import {DataService} from "../providers/dataService/passData";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  profile: Person;





  constructor(public dataService: DataService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _teamProv: Services, private cdRef: ChangeDetectorRef) {
    this.initializeApp();
    //localStorage.clear();
    //this.getProfile(this.idNumber);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
    this.dataService.currentMessage.subscribe(
      (data)=>this.profile=data
    );

  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  saveUpdateProfile(){
    let decoded = jwt_decode(localStorage.getItem("token"));
  this._teamProv.updatePerson(decoded.userID, this.profile).subscribe( //oder this.profile.person
    (data) => {
     console.log(data);
    },
    error => console.log(error)
    )
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
