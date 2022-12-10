import { List } from '@prisma/client';

export interface IList extends List {}

type PropsToOmit = 'createdAt' | 'updatedAt';
export interface IListCreate extends Omit<IList, PropsToOmit> {}

export interface IListUpdate extends Partial<IList> {
  tokenUserId?: string;
  id: string;
}
