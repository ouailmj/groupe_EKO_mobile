import {Component} from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController} from "ionic-angular";
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";

import { BrokerService } from '../../providers/broker-service-mock';

@IonicPage({
	name: 'page-schedule-visit',
	segment: 'schedule-visit'
})

@Component({
	selector: 'page-schedule-visit',
	templateUrl: 'schedule-visit.html'
})
export class ScheduleVisitPage {
	param: number;
	broker: any;

	public visitDate = {
		name: "Visit Date",
		date: new Date().toLocaleString().split(',')[0],
		timename: "Best hour",
		time: "12:00"
	}

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public service: BrokerService) {
		this.param = this.navParams.get('id');
		this.broker = this.service.getItem(this.param) ? this.service.getItem(this.param) : this.service.findAll()[0];
	}

	openCalendar() {
		const options: CalendarModalOptions = {
			title: 'Pick Date'
		};

		let myCalendar = this.modalCtrl.create(CalendarModal, {
			options: options
		});

		myCalendar.present();

		myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
			if (date !== null) {
				this.visitDate.date = new Date(new Date(date.time)).toLocaleString().split(',')[0]
			}
		});
	}

	// process send button
	schedule() {
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		// show message
		let toast = this.toastCtrl.create({
			showCloseButton: true,
			cssClass: 'profiles-bg',
			message: 'Visit scheduled with Success!',
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

}
