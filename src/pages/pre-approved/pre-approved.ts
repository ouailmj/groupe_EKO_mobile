import { Storage } from '@ionic/storage';
import { ChoosePlanData } from './../../providers/types/eventData';
import { TopicProvider } from './../../providers/topic/topic';
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
  ChoosePlanData:ChoosePlanData = {
    titre: "",
    categorie: "",
    status: "unanswered",
    question: "",
    datePost: "",
    dateEdit: "",
    auteur: "",
    commentaires: [],
    ConversationUsers: []
  };
  constructor(
    private _fb: FormBuilder, 
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    public topic:TopicProvider,
    public storage:Storage
  ) {
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


  onSubmit(){
    if(this.onApprovedForm.valid){
      // send booking info
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      let date = new Date()
      this.ChoosePlanData.datePost = date.toDateString();
      this.ChoosePlanData.dateEdit = date.toDateString();
      console.log(this.ChoosePlanData);
      this.storage.get('user').then(data=>{
        console.log(data.id);
        this.ChoosePlanData.auteur = "/api/users/" + data.id;
        this.topic.addChoosePlan(this.ChoosePlanData).then(res=>{
          this.navCtrl.setRoot('page-home');
          loader.dismiss();
          this.presentToast("Question created succesfully");
        });
      })
    }else{
      this.presentToast("Veuiller remplir tout les champs.");
    }
  }
  // process send button

}
