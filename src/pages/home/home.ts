import { TopicProvider } from './../../providers/topic/topic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  properties: Array<any>;
  searchKey: string = "";
	topics :any [];
	constructor(public storage:Storage,
		public navCtrl: NavController, 
		public menuCtrl: MenuController, 
		public popoverCtrl: PopoverController, 
		public service: PropertyService,
		public navParams: NavParams,
		public topicProvider: TopicProvider
	) {
		this.menuCtrl.swipeEnable(true, 'authenticated');
		this.menuCtrl.enable(true);
		
		this.storage.get("user").then(data=>{
			console.log(data);			
			console.log(data.person);
		}).catch(err=>{
			console.log("erreeeeee");
			
		})
		this.storage.get("userdata").then(data=>{
			console.log(data);
		}).catch(err=>{
			console.log("erreeeeee");
		})

		this.topicProvider.getEvents().then(data=>{
			this.topics = data;
			this.storage.set('dataconv', data);
			console.log(data);
		});
		this.findAll();
  }

	senddata(data :Array<any>){
		return data;
	}

  openPropertyListPage(proptype) {
  	// console.log(proptype);
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
	            this.properties = data;
	        })
	        .catch(error => alert(JSON.stringify(error)));
	}

	onCancel(event) {
	    this.findAll();
	}

	findAll() {
	    this.service.findAll()
	        .then(data => this.properties = data)
	        .catch(error => alert(error));
	}

  presentNotifications(myEvent) {
    console.log(myEvent);
		let popover = this.popoverCtrl.create('page-notifications');
    popover.present({
      ev: myEvent
    });
  }

  ionViewWillEnter() {
      // this.navCtrl.canSwipeBack();
  }

}
