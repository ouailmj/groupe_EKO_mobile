import { UserData } from '../../providers/types/userData';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, MenuController, LoadingController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage({
	name: 'page-auth',
	segment: 'auth',
	priority: 'high'
})

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})

export class AuthPage{

  auth: string = "login";
  
  loading: any;

  loginData:UserData = {
    username:'admin',
    password:"f%/R4Uk#](wUvM'V",
  };
  
  data: any;
  authForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
     private authService:AuthProvider,
     public navParams: NavParams,
     public navCtrl: NavController,
     public forgotCtrl: AlertController, 
     private menu: MenuController, 
     private toastCtrl: ToastController,
     public loadingCtrl: LoadingController,
     public storage:Storage
    ) {
    
    this.menu.swipeEnable(false);
    this.menu.enable(false);
    
    this.navCtrl = navCtrl;

    this.removeUser();
    this.validationUser();
  }

  validationUser(){
    this.authForm = this.formBuilder.group({      

      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    
    });
  }

  removeUser(){
    this.storage.get("user").then(data=>{
      this.storage.remove('token');
      this.storage.remove('user');
    }).catch(error => {
      console.log(error.status);
    });
  }

  doLogin(value : any) {
    if(this.authForm.valid) {
      this.showLoader();
      this.authService.login(this.loginData).then((result) => {

          console.log(result.token);
          this.getUserInfo();
            
      }
      ).catch(err=>{
          console.log(err);
          this.loading.dismiss();
          console.log(err)
          this.presentToast("incorrect username or password !!");
      });

      }


  }

  getUserInfo(){

    this.authService.getUserProfil().then(res=>{
      this.navCtrl.setRoot('page-home');
      this.loading.dismiss();
      this.presentToast("welcome");
    })

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
