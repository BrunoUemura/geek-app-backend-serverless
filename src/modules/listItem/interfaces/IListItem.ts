export interface IListItem {
  id: string;
  listId: string;
  title: string;
  season: number;
  episode: number;
  chapter: number;
  link: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IListItemCreate {
  id?: string;
  listId: string;
  title: string;
  season?: number;
  episode?: number;
  chapter?: number;
  link?: string;
  image?: string;
}

export interface IListItemUpdate {
  id?: string;
  listId?: string;
  title?: string;
  season?: number;
  episode?: number;
  chapter?: number;
  link?: string;
  image?: string;
}
