import { IListItem, IListItemCreate, IListItemUpdate } from './IListItem';

export interface IListItemRepository {
  findById: (id: string) => Promise<IListItem>;
  create: (data: IListItemCreate) => Promise<IListItem>;
  update: (id: string, data: IListItemUpdate) => Promise<IListItem>;
  delete: (id: string) => Promise<IListItem>;
}
