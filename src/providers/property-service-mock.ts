import {Injectable} from '@angular/core';
import properties from './mock-properties';
import topics from './mock-topic';
import { Storage } from '@ionic/storage';
import { ApiProvider } from "./api/api";

@Injectable()
export class PropertyService {
  
  properties: Array<any> ;
  favoriteCounter: number = 0;
  favorites: Array<any> = [];
  constructor(public storage:Storage,public apiProvider: ApiProvider){
    this.storage.get('dataconv').then(data => {
      console.log(data);
      console.log(data.auteur);
      this.properties = data;
		}).catch(err=>{
			console.log(err);
		})

  }

  findAll(): Promise<any> {

    return new Promise ((resolve, reject) => {

      this.storage.get('dataconv').then(data=>{
      this.properties = data;

        resolve(data)

      }).catch(error=>{

        reject(error.error.violations)
      })
      
    })

  }

	getProperties() {
		return this.properties;
	}

  findById(id) {
    return Promise.resolve(properties[id - 1]);
  }

	getItem(id) {
		for (var i = 0; i < this.properties.length; i++) {
			if (this.properties[i].id === parseInt(id)) {
				return this.properties[i];
			}
		}
		return null;
	}

  findByName(searchKey: string) {
    return new Promise((resolve, reject) => {

      let key: string = searchKey.toUpperCase();
      this.storage.get('dataconv').then(data=>{
        resolve (data.filter((property: any) =>
          (property.titre + ' ' +property.question).toUpperCase().indexOf(key) > -1));
      })

    })

  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(property) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, property: property});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }

}
