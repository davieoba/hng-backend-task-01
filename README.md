# This is a project scaffold for an express server 
The configuration includes folder setup and configurations


### steps to create the

```bash
yarn add -D nodemon typescript tsx @types/express
yarn add express ts-node cross-env
```

then run `npx tsc --init` to generate the `tsconfig.json`

start the server in development `yarn dev` for production run `yarn start` to build run `yarn build`

Api endpoints
`/health` -> to check if the server is running
`/api/hello?visitor_name=James` -> is the task endpoint
