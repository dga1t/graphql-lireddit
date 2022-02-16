import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^/,
    },
    entities: [Post],
    dbName: 'lireddit',
    password: '',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; 