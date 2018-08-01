import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage({
	name: 'page-my-account',
	segment: 'myaccount'
})

@Component({
    selector: 'page-my-account',
    templateUrl: 'my-account.html'
})

export class MyAccountPage {
  profiledata: Boolean = true;
  dataUser={
    fullName:"",
    username:"",
    email:"",
    address:"",
    code:"",
    fax:"",
    phone:"",
    type:"",
    connexion:""
  };
  constructor(public authprov:AuthProvider ,public storage:Storage, public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.storage.get("user").then(data=>{
      console.log(data);

      this.dataUser.username = data.username;
      this.dataUser.email = data.email;

      if(data.roles[0]=="ROLE_SUPER_ADMIN"){
        this.dataUser.type = "Administrator";
      }else if(data.roles[0]=="ROLE_COLABORATOR"){
        this.dataUser.type = "Collaborator";
      }else{
        this.dataUser.type = "User";
      }

      this.dataUser.connexion = data.lastLogin.substring(0,10);
    
    }).catch(err=>{
			console.log("erreeeeee");
    })

    this.storage.get("userdata").then(data=>{
      console.log(data);

      this.dataUser.fullName = data.firstName + ' ' + data.lastName;
      this.dataUser.address = data.addresses[0];
      this.dataUser.code = data.postalCode;
      this.dataUser.fax = data.faxNumber;
      this.dataUser.phone = data.phoneNumber;
    
    })
  }

  // process send button
  sendData() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
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
  }

  sendDataPassword(){
    this.navCtrl.setRoot('page-edit-password');
  }
}
