import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const orm = await MikroORM.init({
    entities: [],
    dbName: 'lireddit',
    user: '',
    password: '',
    debug: !__prod__,

});

