import { Resolver, Arg, InputType, Field, Ctx, Mutation } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;
    @Field()
    password: string;
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username,
            password: hashedPassword,
        });
        await em.persistAndFlush(user);
        return user;
    }
}