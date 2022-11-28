import { ListItem } from '@prisma/client';

export interface IListItem extends ListItem {}

type PropsToOmit = 'createdAt' | 'updatedAt';
export interface IListItemCreate extends Omit<IListItem, PropsToOmit> {}

export interface IListItemUpdate extends Partial<IListItem> {
  id: string;
  listId: string;
}
