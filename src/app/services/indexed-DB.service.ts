import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

/** Interfaces */
export interface IDataProviderService {
  clear(name): Promise<any>;
  addCollection(name, records): Promise<any>;
  getObject(name, objectId): Promise<any>;
  getObjectByParam(name, param, value): Promise<any>;
  getItems(name: string): Promise<any[]>;
  updateObject(name, object): Promise<any>;
  deleteObject(name, object): Promise<any>;
  addObject(name: string, object: any): Promise<any>;
}

/** Base services */
@Injectable()
export class IndexedDbService implements IDataProviderService {
  constructor() { }

  private performOperationWithStore(name: string, useStoreFunc: (tx: any, store: any) => any): void {
    const indexedDB = window.indexedDB;
    // Open (or create) the database
    const open = indexedDB.open('MyDataBase', 1);
    open.onupgradeneeded = function () {
      const db = open.result;
      db.createObjectStore(name, { keyPath: 'id' });
    };
    open.onsuccess = function () {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction(name, 'readwrite');
      const store = tx.objectStore(name);
      useStoreFunc(tx, store);
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  clear(name): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.transaction.db.deleteObjectStore(name);
        cursorRequest.onsuccess = () => {
          resolve('Indexed DB was successfully cleared!');
        };
        cursorRequest.onerror = () => {
          reject('Could not delete indexed db.');
        };
        cursorRequest.onblocked = () => {
          reject('Couldn not delete database due to the operation being blocked.');
        };
      });
    });
  }

  public addCollection(name, records): Promise<any> {
    const service = this;
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          let lastId = 0;
          if (cursor) {
            lastId = cursor.key + 1;
            cursor.continue();
          }
          for (let i = 0; i < records.length; i++) {
            records[i].id = lastId++;
            store.put({id: records[i].id, obj: records[i]});
            if (i === records.length - 1) {
              resolve(records);
            }
          }
        };
      });
    });
  }

  private getLastId(name): Promise<number> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        let lastKey = -1;
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.key > lastKey) {
              lastKey = cursor.key;
            }
            cursor.continue();
          } else {
            resolve(lastKey);
          }
        };
      });
    });
  }

  public getObject(name, objectId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        let result = {};
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.key === objectId) {
              result = cursor.value.obj;
            }
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }

  public getObjectByParam(name, param, value): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        let result = {};
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.value.obj[param] === value) {
              result = cursor.value.obj;
            }
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }

  public getItems(name: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        const items = [];
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor) {
            items.push(cursor.value.obj);
            cursor.continue();
          } else {
            resolve(items);
          }
        };
      });
    });
  }

  public updateObject(name, object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        store.put({ id: object.id, obj: object });
        resolve(object);
      });
    });
  }

  public deleteObject(name, object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        store.delete(object.id);
        resolve(object);
      });
    });
  }

  public addObject(name: string, object: any): Promise<any> {
    let lastId = 0;
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        const cursorRequest = store.openCursor();
        cursorRequest.onerror = function (error) {
          reject(error);
        };
        cursorRequest.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.key > lastId) {
              lastId = cursor.key;
            }
            cursor.continue();
          } else {
            object.id = ++lastId;
            store.put({ id: object.id, obj: object });
            resolve(object);
            // resolve(lastId);
          }
        };
      });
    });
  }
}
