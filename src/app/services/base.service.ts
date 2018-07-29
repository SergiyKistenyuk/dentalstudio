import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {User} from '../models/user.model';
import {IndexedDBService} from './indexed-DB.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected constructor(
    // protected indexedDBService: IndexedDBService,
    // protected apiService: ApiService,
    // protected loadingStateProvider: LoadingStateProvider,
    // protected sourceLink: string,
  ) {
  }


  // getSourseLink(): string {
  //   return this.sourceLink;
  // }
  //
  // getAll(): Promise<User[]> {
  //   this.loadingStateProvider.provideState('main',true);
  //   return new Promise((resolve, reject) => {
  //     this.apiService.get(`api/${this.sourceLink}`)
  //       .subscribe(data => {
  //         this.loadingStateProvider.provideState('main', false);
  //         if (data.wasSuccessful) {
  //           resolve(data.records);
  //         } else {
  //           console.log(data.message);
  //           reject();
  //         }
  //       }, error => {
  //         console.log(error);
  //         this.loadingStateProvider.provideState('main', false);
  //         reject();
  //       });
  //   });
  // }
  //
  // saveRecord(record: User): Promise<User> {
  //   this.loadingStateProvider.provideState('main', true);
  //   return new Promise((resolve, reject) => {
  //     if (record.id > 0) {
  //       this.apiService.put(`api/${this.sourceLink}/` + record.id, record)
  //         .subscribe(data => {
  //           this.loadingStateProvider.provideState('main', false);
  //           if (data.wasSuccessful) {
  //             resolve(data.record);
  //             // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
  //             console.log(data.message);
  //           } else {
  //             console.log(data.message);
  //             reject();
  //           }
  //
  //         }, error => {
  //           this.loadingStateProvider.provideState('main', false);
  //           console.log(error);
  //           reject();
  //         });
  //     }
  //     else {
  //       console.log(record);
  //       this.apiService.post(`api/${this.sourceLink}`, record)
  //         .subscribe(data => {
  //           if (data.wasSuccessful) {
  //             resolve(data.record);
  //             this.loadingStateProvider.provideState('main', false);
  //             // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
  //             console.log(data.message);
  //           } else {
  //             console.log(data.message);
  //             reject();
  //           }
  //         }, error => {
  //           this.loadingStateProvider.provideState('main', false);
  //           console.log(error);
  //           reject();
  //         });
  //     }
  //   });
  // }
  //
  // getRecordById(id: number): Promise<User> {
  //   this.loadingStateProvider.provideState('main', true);
  //   return new Promise((resolve, reject) => {
  //     this.apiService.get(`api/${this.sourceLink}/GetSingleObject?id=${id}`)
  //       .subscribe(data => {
  //         this.loadingStateProvider.provideState('main', false);
  //         if (data.wasSuccessful) {
  //           resolve(data.record);
  //         } else {
  //           console.log(data.message);
  //           reject();
  //         }
  //       }, error => {
  //         this.loadingStateProvider.provideState('main', false);
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // }
  //
  // deleteRecordById(id: number): Promise<User> {
  //   this.loadingStateProvider.provideState('main', true);
  //   return new Promise((resolve, reject) => {
  //     this.apiService.delete(`api/${this.sourceLink}/DeleteObject?id=` + id)
  //       .subscribe(data => {
  //         this.loadingStateProvider.provideState('main', false);
  //         if (data.wasSuccessful) {
  //           resolve(data.record);
  //           // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
  //           console.log(data.message);
  //         } else {
  //           console.log(data.message);
  //           reject();
  //         }
  //       }, error => {
  //         this.loadingStateProvider.provideState('main', false);
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // }
}
