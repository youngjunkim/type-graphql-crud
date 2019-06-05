import faker from 'faker';
import { graphql, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';

import { UserResolver } from './User';
import { User } from './User.entity';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

const executeGraphQL = async ({ source, variableValues }: Options) => {
  return graphql({
    schema,
    source,
    variableValues
  });
};

let conn: Connection;
beforeAll(async () => {
  conn = await createConnection();
  schema = await buildSchema({
    resolvers: [UserResolver]
  });
});

afterAll(async () => {
  await conn.close();
});

const createUserMutation = `
mutation CreateUser($data: CreateUserInput!) {
  createUser(
    data: $data
  ) {
    firstName
    lastName
    email
  }
}
`;

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email()
};

describe("CRUD Test", () => {
  it("create user", async () => {
    const response = await executeGraphQL({
      source: createUserMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        createUser: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  });

  it("read user", async () => {
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
  });

  it("delete user", async () => {
    await User.delete({ email: user.email });
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeUndefined();
  });
});
