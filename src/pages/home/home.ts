import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController ,NavParams, MenuController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TopicProvider } from './../../providers/topic/topic';
import { PropertyService } from '../../providers/property-service-mock';

@IonicPage({
	name: 'page-home',
	segment: 'home',
	priority: 'high'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	loading: any;
  properties: Array<any>;
  searchKey: string = "";
	topics :{};

	constructor(public storage:Storage,
		public navCtrl: NavController, 
		public menuCtrl: MenuController, 
		public popoverCtrl: PopoverController, 
		public service: PropertyService,
		public navParams: NavParams,
		public topicProvider: TopicProvider,
		public loadingCtrl:LoadingController,
	)
	{
		
		this.menuCtrl.swipeEnable(true, 'authenticated');
		this.menuCtrl.enable(true);

		this.findAll();
  }

  openPropertyListPage(proptype) {
		this.navCtrl.push('page-property-list');
  }

	openPropertyDetail(property: any) {
		this.navCtrl.push('page-property-detail', {
			'id': property.id
		});
	}

  openSettingsPage() {
		this.navCtrl.push('page-settings');
	}
	
	onInput(event) {

	    this.service.findByName(this.searchKey)
	        .then(data => {
						this.topics = data;
					})
	        .catch(error => alert(JSON.stringify(error)));
	}

	onCancel(event) {
	    this.findAll();
	}

	findAll() {
		this.loading = this.loadingCtrl.create({
			content: 'Loading...'
		});

		this.loading.present();
			this.topicProvider.getConversations().then(data=>{
				this.topics = data;
				this.storage.set('dataconv', data);
				console.log(data);
			});

	    this.service.findAll()
	        .then(data =>{
						this.properties = data
						this.topics = data;
					})
	        .catch(error => alert(error));
			this.loading.dismiss();
		}

  presentNotifications(myEvent) {
    console.log(myEvent);
		let popover = this.popoverCtrl.create('page-notifications');
    popover.present({
      ev: myEvent
    });
  }

  ionViewWillEnter() {
  }

}
