import { IList, IListCreate, IListUpdate } from './IList';

export interface IListRepository {
  findAll: () => Promise<IList[]>;
  findById: (id: string) => Promise<IList | null>;
  findByUserId: (id: string) => Promise<IList[] | null>;
  create: (data: IListCreate) => Promise<IList>;
  update: (data: IListUpdate) => Promise<IList>;
  deleteById: (id: string) => Promise<void>;
}
