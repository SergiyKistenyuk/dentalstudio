import {Injectable} from '@angular/core';
import {IDataProviderService} from './indexed-DB.service';

export class BaseModel {
  id: number;
}

@Injectable()
export abstract class BaseDataService<T extends BaseModel> {

  constructor(
    private tableName: string,
    protected dataProviderService: IDataProviderService) {
  }

  clear(): Promise<any> {
    return this.dataProviderService.clear(this.tableName);
  }
  addCollection(records: T[]): Promise<any> {
    return this.dataProviderService.addCollection(this.tableName, records);
  }
  getObject(objectId: number): Promise<T> {
    return this.dataProviderService.getObject(this.tableName, objectId);
  }
  getObjectByParam(param: string, value: any): Promise<T> {
    return this.dataProviderService.getObjectByParam(this.tableName, param, value);
  }
  getItems(): Promise<T[]> {
    return this.dataProviderService.getItems(this.tableName);
  }
  updateObject(record: T): Promise<T> {
    return this.dataProviderService.updateObject(this.tableName, record);
  }
  deleteObject(record: T): Promise<T> {
    return this.dataProviderService.deleteObject(this.tableName, record);
  }
  addObject(record: T): Promise<T> {
    return this.dataProviderService.addObject(this.tableName, record);
  }
}
