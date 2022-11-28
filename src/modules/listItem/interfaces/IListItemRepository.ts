import { IListItem, IListItemCreate, IListItemUpdate } from './IListItem';

export interface IListItemRepository {
  findById: (id: string) => Promise<IListItem | null>;
  create: (data: IListItemCreate) => Promise<IListItem>;
  update: (data: IListItemUpdate) => Promise<IListItem>;
  deleteById: (id: string) => Promise<IListItem>;
}
