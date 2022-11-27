import { IListItem } from '../../listItem/interfaces/IListItem';

export interface IList {
  id: string;
  userId: string;
  title: string;
  category?: string;
  description?: string;
  listItem?: IListItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IListCreate {
  id?: string;
  userId: string;
  title: string;
  category?: string;
  description?: string;
}

export interface IListUpdate {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
}
