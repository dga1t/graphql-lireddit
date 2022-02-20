import "reflect-metadata";
import express from "express";
import microConfig from "./mikro-orm.config";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
    
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: 'my first post' });
    // await orm.em.persistAndFlush(post);

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ HelloResolver, PostResolver, UserResolver ],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => { `server started on localhost: 4000` })
};

main().catch(err => { console.log('err === ', err) });
