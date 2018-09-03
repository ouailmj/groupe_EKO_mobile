import {Component} from '@angular/core';
import {IonicPage, Config, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';

import {PropertyService} from '../../providers/property-service-mock';
import leaflet from 'leaflet';

@IonicPage({
	name: 'page-property-list',
	segment: 'propertylist'
})

@Component({
    selector: 'page-property-list',
    templateUrl: 'property-list.html'
})
export class PropertyListPage {

    properties: {};
    searchKey: string = "";
    viewMode: string = "list";
    proptype: string;
    from: string;
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: PropertyService, public toastCtrl: ToastController, public modalCtrl: ModalController, public config: Config) {
            //call findall service
            this.findAll();
			this.proptype = this.navParams.get('proptype') || "";
			this.from = this.navParams.get('from') || "";
    }

    openPropertyDetail(property: any) {
			this.navCtrl.push('page-property-detail', {
				'id': property.id
			});
    }

    favorite(property) {
        this.service.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 2000
                });
                toast.present(toast);
            });
    }

    onInput(event) {
        //search bar service(see homepage)
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        //(see homepage for more explanation)
        this.findAll();
    }

    findAll() {
        //(see homepage for more explanation)
        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }
}
