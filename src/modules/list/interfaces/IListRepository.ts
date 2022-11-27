import { IList, IListCreate, IListUpdate } from './IList';

export interface IListRepository {
  findAll: () => Promise<IList[] | null>;
  findById: (id: string) => Promise<IList | null>;
  create: (data: IListCreate) => Promise<IList>;
  update: (id: string, data: IListUpdate) => Promise<IList>;
  delete: (id: string) => Promise<IList>;
}
