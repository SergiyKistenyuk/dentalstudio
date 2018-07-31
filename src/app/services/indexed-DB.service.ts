import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

/** Interfaces */
export interface IDataProviderService {
  addCollection(name, records): Promise<any>;
  getObject(name, objectId): Promise<any>;
  getItems(name: string): Promise<any[]>;
  updateObject(name, object): Promise<any>;
  deleteObject(name, object): Promise<any>;
  addObject(name: string, object: any): Promise<any>;
}

/** Base services */
@Injectable({
  providedIn: 'root'
})
export class IndexedDbService implements IDataProviderService {
  constructor() { }

  private performOperationWithStore(name: string, useStoreFunc: (tx: any, store: any) => any): void {
    const indexedDB = window.indexedDB;
    // Open (or create) the database
    const open = indexedDB.open('MyDataBase', 1);
    open.onupgradeneeded = function () {
      const db = open.result;
      db.createObjectStore('users', { keyPath: 'id' });
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

  public addCollection(name, records): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        for (let i = 0; i < records.length; i++) {
          store.put({ id: records[i].id, obj: records[i] });
        }
        resolve();
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
        resolve();
      });
    });
  }

  public deleteObject(name, object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        store.delete(object.id);
        resolve();
      });
    });
  }

  public addObject(name: string, object: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performOperationWithStore(name, function (tx, store) {
        store.put({ id: object.id, obj: object });
        resolve();
      });
    });
  }
}




/** Models */
/*
export class UserModel extends BaseModel {
  name: string;
}

export class DentistModel extends BaseModel {
}
*/





/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  constructor() {}

  static resetSyncData(name) {
    IndexedDBService.updateSyncData(name, '');
  }

  static updateSyncData(name, lastChangedDate) {
    performOperationWithStore('syncdata', (tx, store) => {
      store.put({ id: name, lastChangedDate: lastChangedDate });
    });
  }

  // Clear store and load all collection of items
  static addCollection(name, records, lastChangedDate) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        const req = store.clear();
        req.onsuccess = (evt) => {
          for (let i = 0; i < records.length; i++) {
            store.put({ id: records[i].id, obj: records[i] });
          }
        };
        resolve();
      });
    });
    IndexedDBService.updateSyncData(name, lastChangedDate);
    return promise;
  }

  // Get all collection of items from store
  static getItems(name, retrivedFunc) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        const cursorRequest = store.openCursor();
        const items = [];
        cursorRequest.onerror = (error) => {
          console.log(error);
        };
        cursorRequest.onsuccess = (evt) => {
          const cursor = evt.target.result;
          if (cursor) {
            items.push(cursor.value.obj);
            cursor.continue();
          } else {
            retrivedFunc(items);
          }
        };
        resolve();
      });
    });
    return promise;
  }

  // Get single object from Db by id
  static getObject(name, objectId, retrivedFunc) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        const cursorRequest = store.openCursor();
        let result = {};
        cursorRequest.onerror = (error) => {
          console.log(error);
        };
        cursorRequest.onsuccess = (evt) => {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.key == objectId) {
              result = cursor.value.obj;
            }
            cursor.continue();
          } else {
            retrivedFunc(result);
          }
        };
        resolve();
      });
    });
    return promise;
  }

  // Get last changed date for current collection
  static getLastChangedDate(name, retrivedFunc) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore('syncdata', (tx, store) => {
        const cursorRequest = store.openCursor();
        let result;
        cursorRequest.onerror = (error) => {
          console.log(error);
        };
        cursorRequest.onsuccess = (evt) => {
          const cursor = evt.target.result;
          if (cursor) {
            if (cursor.value.id === name) {
              result = cursor.value.lastChangedDate;
            }
            cursor.continue();
          } else {
            retrivedFunc(result);
          }
        };
        resolve();
      });
    });
    return promise;
  }

  // Add new object into local db
  static addObject(name, object, lastChangedDate) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        store.put({ id: object.id, obj: object });
        resolve();
      });
    });
    if (lastChangedDate !== undefined) {
      IndexedDBService.updateSyncData(name, lastChangedDate);
    }
    return promise;
  }

  // Update existing object in local db
  static updateObject(name, object, lastChangedDate) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        store.put({ id: object.id, obj: object });
        resolve();
      });
    });
    if (lastChangedDate !== undefined) {
      IndexedDBService.updateSyncData(name, lastChangedDate);
    }
    return promise;
  }

  // Delete object from indexed db
  static deleteObject(name, object, lastChangedDate) {
    const promise = new Promise((resolve, reject) => {
      performOperationWithStore(name, (tx, store) => {
        const request = store.delete(object.id);
        resolve();
      });
    });
    IndexedDBService.updateSyncData(name, lastChangedDate);
    return promise;
  }
}


function performOperationWithStore (name, useStoreFunc) {

  const promise = new Promise((resolve, reject) => {
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    const indexedDB = window.indexedDB;

    // Open (or create) the database
    const open = indexedDB.open('CoOwnersLocalDb', 1);

    // Create the schema
    open.onupgradeneeded = () => {
      const db = open.result;
      db.createObjectStore('users', { keyPath: 'id' });
      db.createObjectStore('clinics', { keyPath: 'id' });
    };
    open.onsuccess = () => {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction(name, 'readwrite');
      const store = tx.objectStore(name);
      useStoreFunc(tx, store);
      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close();
      };
      resolve();
    };
  });
  return promise;
}
*/







//
// @Injectable({
//   providedIn: 'root'
// })
// export class IndexedDBService {
//   constructor() {}
//
//   static resetSyncData(name) {
//     IndexedDBService.updateSyncData(name, '');
//   }
//
//   static updateSyncData(name, lastChangedDate) {
//     performOperationWithStore('syncdata', (tx, store) => {
//       store.put({ id: name, lastChangedDate: lastChangedDate });
//     });
//   }
//
//   // Clear store and load all collection of items
//   static addCollection(name, records, lastChangedDate) {
//     performOperationWithStore(name, (tx, store) => {
//       const req = store.clear();
//       req.onsuccess = (evt) => {
//         for (let i = 0; i < records.length; i++) {
//           store.put({ id: records[i].id, obj: records[i] });
//         }
//       };
//     });
//     IndexedDBService.updateSyncData(name, lastChangedDate);
//   }
//
//   // Get all collection of items from store
//   static getItems(name, retrivedFunc) {
//     performOperationWithStore(name, (tx, store) => {
//       const cursorRequest = store.openCursor();
//       const items = [];
//       cursorRequest.onerror = (error) => {
//         console.log(error);
//       };
//       cursorRequest.onsuccess = (evt) => {
//         const cursor = evt.target.result;
//         if (cursor) {
//           items.push(cursor.value.obj);
//           cursor.continue();
//         } else {
//           retrivedFunc(items);
//         }
//       };
//     });
//   }
//
//   // Get single object from Db by id
//   static getObject(name, objectId, retrivedFunc) {
//     performOperationWithStore(name, (tx, store) => {
//       const cursorRequest = store.openCursor();
//       let result = {};
//       cursorRequest.onerror = (error) => {
//         console.log(error);
//       };
//       cursorRequest.onsuccess = (evt) => {
//         const cursor = evt.target.result;
//         if (cursor) {
//           if (cursor.key == objectId) {
//             result = cursor.value.obj;
//           }
//           cursor.continue();
//         } else {
//           retrivedFunc(result);
//         }
//       };
//     });
//   }
//
//   // Get last changed date for current collection
//   static getLastChangedDate(name, retrivedFunc) {
//     performOperationWithStore('syncdata', (tx, store) => {
//       const cursorRequest = store.openCursor();
//       let result;
//       cursorRequest.onerror = (error) => {
//         console.log(error);
//       };
//       cursorRequest.onsuccess = (evt) => {
//         const cursor = evt.target.result;
//         if (cursor) {
//           if (cursor.value.id === name) {
//             result = cursor.value.lastChangedDate;
//           }
//           cursor.continue();
//         } else {
//           retrivedFunc(result);
//         }
//       };
//     });
//   }
//
//   // Add new object into local db
//   static addObject(name, object, lastChangedDate) {
//     performOperationWithStore(name, (tx, store) => {
//       store.put({ id: object.id, obj: object });
//     });
//     if (lastChangedDate !== undefined) {
//       IndexedDBService.updateSyncData(name, lastChangedDate);
//     }
//   }
//
//   // Update existing object in local db
//   static updateObject(name, object, lastChangedDate) {
//     performOperationWithStore(name, (tx, store) => {
//       store.put({ id: object.id, obj: object });
//     });
//     if (lastChangedDate !== undefined) {
//       IndexedDBService.updateSyncData(name, lastChangedDate);
//     }
//   }
//
//   // Delete object from indexed db
//   static deleteObject(name, object, lastChangedDate) {
//     performOperationWithStore(name, (tx, store) => {
//       const request = store.delete(object.id);
//     });
//     IndexedDBService.updateSyncData(name, lastChangedDate);
//   }
// }






// function performOperationWithStore (name, useStoreFunc) {
//   // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
//   const indexedDB = window.indexedDB /*|| window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB*/;
//
//   // Open (or create) the database
//   const open = indexedDB.open('CoOwnersLocalDb', 1);
//
//   // Create the schema
//   open.onupgradeneeded = () => {
//     const db = open.result;
//     db.createObjectStore('users', { keyPath: 'id' });
//     db.createObjectStore('clinics', { keyPath: 'id' });
//   };
//   open.onsuccess = () => {
//     // Start a new transaction
//     const db = open.result;
//     const tx = db.transaction(name, 'readwrite');
//     const store = tx.objectStore(name);
//     useStoreFunc(tx, store);
//     // Close the db when the transaction is done
//     tx.oncomplete = () => {
//       db.close();
//     };
//   };
// }
