import { database } from "../../infra/db/prisma/connection";

export function DBConnection() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: Array<any>) {
      await database.connect();
      const result = originalMethod.apply(this, args);
      await database.disconnect();
      return result;
    };
    return descriptor;
  };
}
