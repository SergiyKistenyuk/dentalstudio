import {Injectable} from '@angular/core';
import {IDataProviderService} from './indexed-DB.service';

export class BaseModel {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseDataService<T extends BaseModel> {

  constructor(
    private tableName: string,
    protected dataProviderService: IDataProviderService) {
  }

  addCollection(records: T[]): Promise<any> {
    return this.dataProviderService.addCollection(this.tableName, records);
  }
  getObject(objectId: string): Promise<T> {
    return this.dataProviderService.getObject(this.tableName, objectId);
  }
  getItems(): Promise<T[]> {
    return this.dataProviderService.getItems(this.tableName);
  }
  updateObject(record: T): Promise<T[]> {
    return this.dataProviderService.updateObject(this.tableName, record);
  }
  deleteObject(record: T): Promise<T[]> {
    return this.dataProviderService.deleteObject(this.tableName, record);
  }
  addObject(record: T): Promise<T[]> {
    return this.dataProviderService.addObject(this.tableName, record);
  }
}


// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
//
// import {User} from '../models/user.model';
// import {IndexedDbService} from './indexed-DB.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BaseService {
//   protected constructor(
//     // protected indexedDBService: IndexedDBService,
//     // protected apiService: ApiService,
//     // protected loadingStateProvider: LoadingStateProvider,
//     // protected sourceLink: string,
//   ) {
//   }
//
//
//   // getSourseLink(): string {
//   //   return this.sourceLink;
//   // }
//   //
//   // getAll(): Promise<User[]> {
//   //   this.loadingStateProvider.provideState('main',true);
//   //   return new Promise((resolve, reject) => {
//   //     this.apiService.get(`api/${this.sourceLink}`)
//   //       .subscribe(data => {
//   //         this.loadingStateProvider.provideState('main', false);
//   //         if (data.wasSuccessful) {
//   //           resolve(data.records);
//   //         } else {
//   //           console.log(data.message);
//   //           reject();
//   //         }
//   //       }, error => {
//   //         console.log(error);
//   //         this.loadingStateProvider.provideState('main', false);
//   //         reject();
//   //       });
//   //   });
//   // }
//   //
//   // saveRecord(record: User): Promise<User> {
//   //   this.loadingStateProvider.provideState('main', true);
//   //   return new Promise((resolve, reject) => {
//   //     if (record.id > 0) {
//   //       this.apiService.put(`api/${this.sourceLink}/` + record.id, record)
//   //         .subscribe(data => {
//   //           this.loadingStateProvider.provideState('main', false);
//   //           if (data.wasSuccessful) {
//   //             resolve(data.record);
//   //             // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
//   //             console.log(data.message);
//   //           } else {
//   //             console.log(data.message);
//   //             reject();
//   //           }
//   //
//   //         }, error => {
//   //           this.loadingStateProvider.provideState('main', false);
//   //           console.log(error);
//   //           reject();
//   //         });
//   //     }
//   //     else {
//   //       console.log(record);
//   //       this.apiService.post(`api/${this.sourceLink}`, record)
//   //         .subscribe(data => {
//   //           if (data.wasSuccessful) {
//   //             resolve(data.record);
//   //             this.loadingStateProvider.provideState('main', false);
//   //             // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
//   //             console.log(data.message);
//   //           } else {
//   //             console.log(data.message);
//   //             reject();
//   //           }
//   //         }, error => {
//   //           this.loadingStateProvider.provideState('main', false);
//   //           console.log(error);
//   //           reject();
//   //         });
//   //     }
//   //   });
//   // }
//   //
//   // getRecordById(id: number): Promise<User> {
//   //   this.loadingStateProvider.provideState('main', true);
//   //   return new Promise((resolve, reject) => {
//   //     this.apiService.get(`api/${this.sourceLink}/GetSingleObject?id=${id}`)
//   //       .subscribe(data => {
//   //         this.loadingStateProvider.provideState('main', false);
//   //         if (data.wasSuccessful) {
//   //           resolve(data.record);
//   //         } else {
//   //           console.log(data.message);
//   //           reject();
//   //         }
//   //       }, error => {
//   //         this.loadingStateProvider.provideState('main', false);
//   //         console.log(error);
//   //         reject();
//   //       });
//   //   });
//   // }
//   //
//   // deleteRecordById(id: number): Promise<User> {
//   //   this.loadingStateProvider.provideState('main', true);
//   //   return new Promise((resolve, reject) => {
//   //     this.apiService.delete(`api/${this.sourceLink}/DeleteObject?id=` + id)
//   //       .subscribe(data => {
//   //         this.loadingStateProvider.provideState('main', false);
//   //         if (data.wasSuccessful) {
//   //           resolve(data.record);
//   //           // this.messageProvider.publishMessage(new MessageModel(data.message, MessageTypes.Success));
//   //           console.log(data.message);
//   //         } else {
//   //           console.log(data.message);
//   //           reject();
//   //         }
//   //       }, error => {
//   //         this.loadingStateProvider.provideState('main', false);
//   //         console.log(error);
//   //         reject();
//   //       });
//   //   });
//   // }
// }
