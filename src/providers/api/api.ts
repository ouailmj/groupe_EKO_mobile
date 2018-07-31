import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  static getFullUrl(url: string){
    return environment.API_END_POINT + url;
  }

  get(url: string, options?: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.http.get(ApiProvider.getFullUrl(url), options).subscribe((data)=> {
        resolve(data);
      }, (err)=> {
        reject(err);
      })
    }));
  }

  put(url: string, body: any, options?: any):  Promise<any> {
    return  new Promise(((resolve, reject) => {
       this.http.put(ApiProvider.getFullUrl(url), body, options).subscribe((data)=> {
        resolve(data);
      }, (err)=> {
        reject(err);
      })
    }));
  }

  post(url: string, body: any, options?: any): Promise<any> {
    
    return new Promise(((resolve, reject) => {
      this.http.post(ApiProvider.getFullUrl(url), body, options)
        .subscribe((res)=> {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    }));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(ApiProvider.getFullUrl(url), options);
  }

  request(method: string, url: string, options?: any): Observable<any> {
    return this.http.request(method, ApiProvider.getFullUrl(url), options);
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    return this.http.patch(ApiProvider.getFullUrl(url), body, options);
  }
  

 


}