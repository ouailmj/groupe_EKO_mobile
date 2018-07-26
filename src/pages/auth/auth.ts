import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, AlertController, ToastController, MenuController, LoadingController, NavParams } from 'ionic-angular';

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
  registersForm: FormGroup;
  loading: any;
  registerData = { username:"" , email:"", password:"", Confirm_password:""};
  regData = { plainPassword:"",email:""};
  auth: string = "login";
  authForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public navParams: NavParams,public navCtrl: NavController , public forgotCtrl: AlertController, public menu: MenuController, private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
		this.menu.swipeEnable(false);
    this.menu.enable(false);
    this.navCtrl = navCtrl;
    this.authForm = formBuilder.group({      
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this.registersForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(4), Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      Confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
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

  onSubmit(): void {
    console.log("submit")

    let messageError="";
    if(this.authForm.valid) {
      console.log("valid")
     
        this.showLoader();
        this.loading.dismiss();
        this.navCtrl.setRoot('page-home');
      }else{
      this.presentToast("Invalid data");

    }
  }

  onSubmitReg(): void {
    console.log("submit")

    let messageError="";
    if(this.registersForm.valid) {
      if(this.registerData.password == this.registerData.Confirm_password){
        console.log("valid")
          this.showLoader();
          this.loading.dismiss();
          this.navCtrl.setRoot('page-home');
      }else{
        this.presentToast("Passwords does not match");
      }
    }else{
      this.presentToast("Invalid data");

    }
  }

  // go to register page
  // register() {
  //   this.nav.setRoot(RegisterPage);
  // }

  // login and go to home page
  login() {
    this.navCtrl.setRoot('page-home');
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
