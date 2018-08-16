import { Injectable } from '@angular/core';
import { ApiProvider } from "../api/api";
import { AuthRoutes } from "./auth.routes";
import { UserData } from "../types/userData";
import {  HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {environment} from "../../environments/environment";
import { resolveDefinition } from '@angular/core/src/view/util';

@Injectable()
export class AuthProvider {

  constructor(public apiProvider: ApiProvider,private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(userData: UserData): Promise<any> {


    const loginPath = 'http://localhost:8000' + AuthRoutes.apiLoginCheckUrl;

    const formData = new FormData();
    formData.append("_username",userData.username);
    formData.append("_password",userData.password);

     return new Promise((resolve, reject) => {

        fetch(loginPath, {
          method: 'POST',
          body: formData
        })
        .then(this.handleErrors)
        .then(response =>{
          response.json().then(result=>{

          this.storage.set('token', result.token);
              let headers = new HttpHeaders();

              headers = headers.set('Content-Type', 'application/json; charset=utf-8');
              headers = headers.set('Authorization', 'Bearer ' + result.token);

              this.apiProvider.get(AuthRoutes.apiCurrentUser, {headers: headers}).then(user => {

                  this.storage.set('user', user);

              }).catch(err=>{

                  console.log(err)
                  reject(err)
              
              })

          resolve(result);

         }).catch(err=>{
            reject(err)
         });

        }).catch(err=>{
          reject(err)
        });

    })

  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  
  changePpassword(credentials) : Promise<any>{
    return new Promise((resolve, reject) => {


      this.storage.get('token').then(tok=>{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + tok);

      this.apiProvider.post(AuthRoutes.apiResPass,credentials,{headers: headers}).then(rep=>{

          this.storage.remove('token');
          this.storage.remove('user');
          this.storage.set('token', rep.token);

          console.log(rep);

            resolve("ok");

          }).catch(error=>{

            reject(error);

          })
      }).catch(error => {
        console.log(error.status);
      });


  })

  }

  getConversationComment(commentaire:Array<any>) :Promise<any>{
    return new Promise((resolve,reject)=>{
      let headers = new HttpHeaders();
      let singleArray=[];
      this.storage.get('token').then(tok=>{
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + tok);
          commentaire.forEach(element => {
            this.apiProvider.get(element,{headers: headers}).then(repdata=>{
              this.apiProvider.get(repdata.auteur,{headers:headers}).then(autComment=>{
                singleArray.push({
                  commentaire: repdata,
                  auteur: autComment 
                 })
                 resolve(singleArray);
              })
            }).catch(error=>{
              reject(error);
            })
          })
      }).catch(err=>{
        reject(err);
      })
    })
  }


  getUserProfiles(path:string): Promise<any>{

    return new Promise((resolve, reject) => {
    
        this.storage.get('token').then(tok=>{
  
        let headers = new HttpHeaders();
  
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + tok);
          this.apiProvider.get(path,{headers: headers}).then(rep=>{
              this.apiProvider.get(AuthRoutes.apiUserData +rep.id ,{headers: headers}).then(repdata=>{
                resolve(repdata);

              }).catch(error=>{
    
                reject(error);
    
              })
    

              }).catch(error=>{
    
                reject(error);
    
              })
        })
  
  
    })
  
    }

  getUserProfil(): Promise<any>{


  return new Promise((resolve, reject) => {


      this.storage.get('token').then(tok=>{

      let headers = new HttpHeaders();

      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + tok);

      this.apiProvider.get(AuthRoutes.apiCurrentUser , {headers: headers}).then(rep=>{
          
          this.apiProvider.get(rep.person ,{headers: headers}).then(repdata=>{
            this.storage.set('userdata', repdata);
          }).catch(error=>{

            reject(error);

          })

          this.storage.set('user', rep);

            resolve("ok");

          }).catch(error=>{

            reject(error);

          })
          
      }).catch(error=>{

        reject('erro');
      })


  })

  }

  resetPassword(credentials) : Promise<any>{


    return new Promise((resolve, reject) => {


      this.storage.get('token').then(tok=>{

      let headers = new HttpHeaders();

      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + tok);

      this.apiProvider.post(AuthRoutes.apirestPass,credentials,{headers: headers}).then(rep=>{
           this.storage.set('user', rep);

           resolve("ok");

          }).catch(error=>{

            reject(error);

          })
      }).catch(error=>{

        reject('erro');

      })


  })



  }


}