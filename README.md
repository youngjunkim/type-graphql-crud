# Requirements

1. nodejs 11.6.x +
2. yarn 1.13.x +
3. postgres latest

# Installation

1. install it

```
git clone https://github.com/youngjunkim/type-graphql-crud.git
cd type-graphql-crud
yarn
```

2. update ormconfig.json by your postgres setup (username, password, port)

3. Start the server

```
yarn start
```

4. graphql UI http://localhost:4000/graphql

```
mutation {
  createUser(data: { firstName: "john", lastName: "kim", email: "a@a.com" }) {
    id
    email
  }
}

query {
  users {
    id
    firstName
    lastName
    email
  }
}

mutation {
  updateFirstname(data: { id: 3, firstName: "abcd" })
}

mutation {
  deleteUser(id: 2)
}
```

# Test by jest

```
yarn test
```
