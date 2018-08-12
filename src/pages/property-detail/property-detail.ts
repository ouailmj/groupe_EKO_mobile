import { Storage } from '@ionic/storage';
import {Component, ViewChild} from '@angular/core';
import {LoadingController, IonicPage, ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {PropertyService} from '../../providers/property-service-mock';

@IonicPage({
	name: 'page-property-detail',
	segment: 'property/:id'
})

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})  
export class PropertyDetailPage {
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
        public toastCtrl: ToastController
    ) {
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

    delete() {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Option',
            buttons: [
                {
                    text: 'edit',
                    handler: () => console.log('edited')
                },
                {
                    text: 'delete',
                    handler: () => console.log('deleted')
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
                    handler: () => console.log('deleted')
                }
            ]
        });

        actionSheet.present();
    }

}
