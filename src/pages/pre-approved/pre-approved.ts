import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';

@IonicPage({
	name: 'page-pre-approved',
	segment: 'preapproved'
})

@Component({
    selector: 'page-pre-approved',
    templateUrl: 'pre-approved.html'
})
export class PreApprovedPage implements OnInit {

  public onApprovedForm: FormGroup;

  constructor(private _fb: FormBuilder, public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.onApprovedForm = this._fb.group({
      profiledata: [true, Validators.compose([
        Validators.required
      ])],
      objectid: ['', Validators.compose([
        Validators.required
      ])],
      topic: ['', Validators.compose([
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])]
    });
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

  // process send button
  sendData() {
    if(this.onApprovedForm.valid){
      // send booking info
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      // show message
      let toast = this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'profiles-bg',
        message: 'Pre-Approved Data Sent!',
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
      this.presentToast("Veuiller remplir tout les champs.");
    }
  }

}
