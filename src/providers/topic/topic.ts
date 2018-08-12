import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ApiProvider} from "../api/api";
import {HttpHeaders} from "@angular/common/http";
import {  LoadingController, ToastController } from 'ionic-angular';
import {ChoosePlanData, EventInformationData, PaymentData} from "../types/eventData";

/*
  Generated class for the TopicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TopicProvider {

  constructor(public http: HttpClient,
    public apiProvider: ApiProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello TopicProvider Provider');
  }

  getEvents():Promise<any>{


    return new Promise((resolve, reject) => {


        this.storage.get('token').then(tok=>{

            let headers = new HttpHeaders();

            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
            headers = headers.set('Authorization', 'Bearer ' + tok);

            this.apiProvider.get('/api/conversations',{headers: headers}).then(rep=>{


                //  this.storage.set('user', rep);

                resolve(rep["hydra:member"]);

            }).catch(error=>{

                reject(error);

            })
        }).catch(error=>{

            reject('erro');
        })


    })

    }

    addChoosePlan(choosePlanData: ChoosePlanData): Promise<any>{

        return new Promise((resolve, reject) => {


            this.storage.get('token').then(tok=>{

                let headers = new HttpHeaders();
                headers = headers.set('Content-Type', 'application/json');
                this.apiProvider.post("/api/conversations", choosePlanData,{headers: headers}).then(rep=>{
                    console.log(rep)
                    resolve("ok");

                }).catch(error=>{


                    reject(error);

                })
            }).catch(error => {
                console.log(error.status);
            });


        })

    }

}
