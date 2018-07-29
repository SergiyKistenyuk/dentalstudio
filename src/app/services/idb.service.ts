import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IDBService {
  private _indexedDB: any;
  private _dbName: string;

  constructor() {
    this._indexedDB = indexedDB;
    this._dbName = 'db'; // by default
  }

  setName(dbName: string): void {
    if (dbName.length > 0 && dbName !== undefined) {
      this._dbName = dbName;
    } else {
      console.log('Error: wrong dbName');
    }
  }

  put(source: string, object: any): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      this.open().subscribe((db: any) => {
        const tx = db.transaction(source, 'readwrite');
        const store = tx.objectStore(source);
        store.put(object);

        tx.oncomplete = () => {
          observer.next(object);
          db.close();
          observer.compconste();
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  post(source: string, object: any): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      this.open().subscribe((db: any) => {
        const tx = db.transaction(source, 'readwrite');
        const store = tx.objectStore(source);
        const request = store.add(object);

        request.onsuccess = (e: any) => {
          observer.next(e.target.result);
          db.close();
          observer.complete();
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  get(source: string, id: string): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      this.open().subscribe((db: any) => {
        const tx = db.transaction(source, 'readonly');
        const store = tx.objectStore(source);
        const index = store.index('id_idx');
        const request = index.get(id);

        request.onsuccess = () => {
          observer.next(request.result);
          db.close();
          observer.complete();
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  all(source: string, filter?: any): Observable<any[]> {
    const self = this;

    return Observable.create((observer: any) => {
      const indexName = 'id_idx';

      this.open().subscribe((db: any) => {
        const tx = db.transaction(source, 'readonly');
        const store = tx.objectStore(source);
        const index = store.index(indexName);
        const request = index.openCursor(); // IDBKeyRange.only('Fred')
        const results: any[] = [];

        request.onsuccess = function () {
          const cursor = request.result;
          if (cursor) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            observer.next(results);
            db.close();
            observer.complete();
          }
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  remove(source: string, id: string): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      this.open().subscribe((db: any) => {
        const tx = db.transaction(source, 'readwrite');
        const store = tx.objectStore(source);

        store.delete(id);

        tx.oncomplete = (e: any) => {
          observer.next(id);
          db.close();
          observer.complete();
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  count(source: string): Observable<number> {
    const self = this;

    return Observable.create((observer: any) => {
      this.open().subscribe((db: any) => {
        const indexName = 'id_idx';
        const tx = db.transaction(source, 'readonly');
        const store = tx.objectStore(source);
        const index = store.index(indexName);
        const request = index.count();

        request.onsuccess = () => {
          observer.next(request.result);
          db.close();
          observer.complete();
        };
        db.onerror = (e: any) => {
          db.close();
          self.handleError('IndexedDB error: ' + e.target.errorCode);
        };
      });
    });
  }

  create(schema?: any[]): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      const request = this._indexedDB.open(this._dbName);

      request.onupgradeneeded = () => {
        // The database did not previously exist, so create object stores and indexes.
        const db = request.result;

        for (let i = 0; i < schema.length; i++) {
          const store = db.createObjectStore(schema[i].name, { keyPath: 'id', autoIncrement: true });
          store.createIndex('id_idx', 'id', { unique: true });

          if (schema[i].indexes !== undefined) {
            for (let j = 0; j < schema[i].indexes.length; j++) {
              const index = schema[i].indexes[j];
              store.createIndex(`${index}_idx`, index);
            }
          }

          if (schema[i].seeds !== undefined) {
            for (let j = 0; j < schema[i].seeds.length; j++) {
              const seed = schema[i].seeds[j];
              store.put(seed);
            }
          }
        }

        observer.next('done');
        observer.complete();
      };

      request.onerror = () => {
        self.handleError(request.error);
      };

      request.onsuccess = () => {
        const db = request.result;
        db.close();
      };
    });
  }

  clear(): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      const request = this._indexedDB.deleteDatabase(this._dbName);

      request.onsuccess = () => {
        observer.next('done');
        observer.complete();
      };
      request.onerror = () => {
        self.handleError('Could not delete indexed db.');
      };
      request.onblocked = () => {
        self.handleError('Couldn not delete database due to the operation being blocked.');
      };
    });
  }

  private handleError(msg: string) {
    console.error(msg);
    // return Observable.throw(msg);
    return of(msg);
  }

  private open(): Observable<any> {
    const self = this;

    return Observable.create((observer: any) => {
      const request = this._indexedDB.open(this._dbName);

      request.onsuccess = () => {
        observer.next(request.result);
        observer.complete();
      };
      request.onerror = () => self.handleError(request.error);
    });
  }
}
