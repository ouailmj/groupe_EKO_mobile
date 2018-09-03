import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, MenuController, LoadingController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import { Storage } from '@ionic/storage';

@IonicPage({
	name: 'page-edit-password',
  segment: 'ChangePassword'
})
 @Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  
  PassForm: FormGroup;
  loading: any;
  user = {
    "oldPassword": "",
    "newPassword": "",
    "repeatedPassword": ""
  };



  constructor(public storage:Storage,private authService:AuthProvider,public formBuilder: FormBuilder, public navParams: NavParams,public navCtrl: NavController , public forgotCtrl: AlertController, public menu: MenuController, private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  
    this.navCtrl = navCtrl;
    //validation form
    this.PassForm = formBuilder.group({      
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatedPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    },{validator: this.matchingPasswords('newPassword', 'repeatedPassword')});
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    //verify if password match
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
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
    //submit change password
    console.log("submit")
    if(this.PassForm.valid) {
        this.showLoader();
        //change password data for user using api
        this.authService.changePpassword(this.user).then(res=>{
          console.log(res)
          //in case everything ok go to page initial
          this.loading.dismiss();
          this.presentToast("updated succesfully");
          this.navCtrl.setRoot('page-initial');
        }).catch(error=>{
          console.log(error);
          this.presentToast("Invalid data");    
        })
          // back to home page
    }else{
      this.presentToast("Invalid data");
    }

  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

}
