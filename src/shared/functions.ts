import { contextsAbbreviation } from './constants/contextsAbbreviation';

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function generateUniqueId(context: string) {
  const pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

  const id =
    contextsAbbreviation[context] +
    new Date().toLocaleDateString('US').replaceAll(pattern, '') +
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
      .toUpperCase();

  // Depending on the current locale the ID generated will be with length of 12.
  // This feature adds two more numbers to the end to make it 14.
  if (id.length === 12) return id + Math.floor(Math.random() * (99 - 10) + 10);

  return id;
}
