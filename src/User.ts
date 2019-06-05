import { IsEmail, Length } from 'class-validator';
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';

import { User } from './User.entity';

// validate inputType
@InputType()
class CreateUserInput {
  @Field()
  @Length(3, 100)
  firstName: string;

  @Field()
  @Length(3, 100)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
class UpdateFirstnameInput {
  @Field()
  id: number;

  @Field()
  @Length(3, 100)
  firstName: string;
}

@Resolver()
export class UserResolver {
  // create
  @Mutation(() => User)
  async createUser(@Arg("data")
  {
    firstName,
    lastName,
    email
  }: CreateUserInput) {
    return await User.create({ firstName, lastName, email }).save();
  }

  // read
  @Query(() => [User])
  async users() {
    return User.find();
  }

  // update firstName
  @Mutation(() => Boolean)
  async updateFirstname(@Arg("data") { id, firstName }: UpdateFirstnameInput) {
    await User.update({ id }, { firstName });
    return true;
  }

  // delete
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    await User.delete({ id });
    return true;
  }
}
