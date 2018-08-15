import { Storage } from '@ionic/storage';
import {Component, ViewChild} from '@angular/core';
import {LoadingController, IonicPage, ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {PropertyService} from '../../providers/property-service-mock';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { commentData } from './../../providers/types/eventData';
import { TopicProvider } from './../../providers/topic/topic';
import { TopicRoutes } from './../../providers/mytopic/mytopic.routes';

@IonicPage({
	name: 'page-property-detail',
	segment: 'property/:id'
})

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})  
export class PropertyDetailPage {
    public onCommentForm: FormGroup;
    role:any ;
    commentaires:commentData = {
        auteur: "",
        message: "",
        conversation: "",
        datePost: ""
      };
    loading: any;
	property: any;
	param: number;
    dataauteur = {
        username: "",
        datePost: "",
        dateEdit: "",
        type:""
    };
    allData:Array<any>;
    constructor(
        public loadingCtrl:LoadingController,
        public storage:Storage,
        private authService:AuthProvider,
        public actionSheetCtrl: ActionSheetController, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public propertyService: PropertyService, 
        public toastCtrl: ToastController,
        public formBuilder: FormBuilder,
        public topic:TopicProvider,

    ) {
        this.onCommentForm = formBuilder.group({      
            message: ['', Validators.compose([Validators.required])],
          });
        this.allData = [];
        console.log(this.allData);
        this.showLoader();
        this.param = this.navParams.get('id');
		this.property = this.propertyService.getItem(this.param) ? this.propertyService.getItem(this.param) : this.propertyService.getProperties()[0];
        this.storage.set('auteur',this.property.auteur);
        this.authService.getUserProfiles().then(res=>{
            this.storage.get('auteurdata').then(data => {
                this.dataauteur.username = data.username;
                    if(data.roles[0]=="ROLE_SUPER_ADMIN"){
                        this.dataauteur.type = "Administrateur";
                    }
                    else if(data.roles[0]=="ROLE_COLLABORATEUR"){
                        this.dataauteur.type = "Collaborateur";
                    }
                    else{
                        this.dataauteur.type = "Utilisateur";
                    }
                    this.authService.getConversationComment(this.property.commentaires).then(res=>{                      
                        this.storage.get('dataComment').then(allData=>{
                            this.allData=allData;
                        })                    
                        storage.remove('dataComment');
                    })
                this.loading.dismiss();
            })
        })
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
    
        this.loading.present();
      }

    openBrokerDetail(broker) {
		this.navCtrl.push('page-broker-detail', {
			'id': 3
		});
    }

    favorite(property) {
        this.propertyService.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 2000
                });
                toast.present(toast);
            });
    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

    delete(id:string) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Option',
            buttons: [
                {
                    text: 'edit',
                    handler: () => console.log('edited')
                },
                {
                    text: 'delete',
                    handler: () => this.deleteData(id , TopicRoutes.apiComment)
                }
            ]
        });

        actionSheet.present();
    }
    edit() {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Option',
            buttons: [
                {
                    text: 'edit',
                    handler: () => console.log('edited')
                },
                {
                    text: 'Set on answered',
                    handler: () => console.log('answered')
                },
                {
                    text: 'delete',
                    handler: () => this.deleteData(this.property.id,TopicRoutes.apiConversation)
                }
            ]
        });

        actionSheet.present();
    }

    deleteData(id:string,path:string){
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.storage.get('user').then(res=>{
            if(res.roles[0] == "ROLE_SUPER_ADMIN"){
                console.log(this.property.id);
                this.topic.DeleteConversation(id, path);
                this.navCtrl.setRoot('page-home');
                loader.dismiss();
                this.presentToast("deleted successfully");
            }
        })
        
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
        if(this.onCommentForm.valid){
            let loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();
            let date = new Date();
            this.commentaires.datePost = date.toDateString();
            this.commentaires.conversation ="/api/conversations/" + this.property.id;
            this.storage.get('user').then(data=>{
                this.commentaires.auteur = "/api/users/" + data.id;
                this.topic.addComment(this.commentaires).then(res=>{
                this.navCtrl.setRoot('page-home');
                loader.dismiss();
                this.presentToast("Question created succesfully");
            });
                
            });
        }
    }
}
