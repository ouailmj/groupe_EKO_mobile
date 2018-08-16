import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController ,NavParams, MenuController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TopicProvider } from './../../providers/topic/topic';
import { PropertyService } from '../../providers/property-service-mock';
import { SortPipe } from './../../pipes/sort/sort';
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

	descending: boolean = false;
	order: number;
	column: string = 'datePost';

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

	sort(){
		this.descending = !this.descending;
		this.order = this.descending ? 1 : -1;
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
				this.service.setProperty(data);
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
