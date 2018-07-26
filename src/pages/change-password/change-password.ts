import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, MenuController, LoadingController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  PassData = { oldpass:"" , password:"", confirm_password:""};
  constructor(public formBuilder: FormBuilder, public navParams: NavParams,public navCtrl: NavController , public forgotCtrl: AlertController, public menu: MenuController, private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
    this.navCtrl = navCtrl;
    this.PassForm = formBuilder.group({      
      oldpass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
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
    if(this.PassForm.valid) {
      if(this.PassData.password == this.PassData.confirm_password){
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        let toast = this.toastCtrl.create({
          showCloseButton: true,
          cssClass: 'profiles-bg',
          message: 'Your Data was Edited!',
          duration: 3000,
          position: 'bottom'
        });
        loader.present();
        setTimeout(() => {
          loader.dismiss();
          toast.present();
          // back to home page
          this.navCtrl.setRoot('page-home');
        }, 3000)
      }else{
        this.presentToast("Passwords does not match");
      }
    }else{
      this.presentToast("Invalid data");
    }

  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
