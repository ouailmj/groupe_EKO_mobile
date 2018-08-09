import { Injectable } from '@angular/core';
import { ApiProvider } from "../api/api";
import { AuthRoutes } from "./auth.routes";
import { UserData, UserRegister } from "../types/userData";
import {  HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {environment} from "../../environments/environment";

@Injectable()
export class AuthProvider {

  constructor(public apiProvider: ApiProvider,private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(userData: UserData): Promise<any> {


    const loginPath = 'http://localhost:8000/api/login_check';

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



  register(userData: UserRegister): Promise<any> {

    return new Promise((resolve, reject) => {
      this.apiProvider.post(AuthRoutes.apiSignUp, userData).then(data=>{
        resolve(data)
      }).catch(error=>{

        reject(error.error.violations)
      })
    })

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

  updateUser(userdata:UserData){


    const credentials = {
      "username": userdata.username,
      "fullName": userdata.fullName,
      "email": userdata.email,
      "phoneNumber": userdata.phoneNumber,
      "timeZone": userdata.timezoneId,
      "password": userdata.password
    };

    return new Promise((resolve, reject) => {


          this.storage.get('token').then(tok=>{

          let headers = new HttpHeaders();
          headers = headers.set('Content-Type', 'application/json; charset=utf-8');
          headers = headers.set('Authorization', 'Bearer ' + tok);

          this.apiProvider.put('/api/me/change-profile',credentials,{headers: headers}).then(rep=>{

              this.storage.set('token', rep.token);

                resolve("ok");

              }).catch(error=>{

                reject(error);

              })
          }).catch(error => {
            console.log(error.status);
          });


      })

  }

  getUserProfiles(): Promise<any>{


    return new Promise((resolve, reject) => {
  
  
        this.storage.get('token').then(tok=>{
  
        let headers = new HttpHeaders();
  
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + tok);
        this.storage.get('auteur').then(auteurdata => {
          this.apiProvider.get(auteurdata,{headers: headers}).then(rep=>{
              console.log(rep.id);
              this.apiProvider.get('/api/users/'+rep.id ,{headers: headers}).then(repdata=>{
                 this.storage.set('auteurdata', repdata);
              }).catch(error=>{
    
                reject(error);
    
              })
    
                resolve("ok");

              }).catch(error=>{
    
                reject(error);
    
              })
          }).catch(error=>{
    
            reject('erro');
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

      this.apiProvider.get('/api/current-user',{headers: headers}).then(rep=>{
          
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