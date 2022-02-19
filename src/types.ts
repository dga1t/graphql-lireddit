import { Connection, IDatabaseDriver } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

export type MyContext {
    em: EntityManager<IDatabaseDriver<Connection>>
}