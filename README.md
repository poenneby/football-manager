# Football Manager API

API to manage the players in a football team

<img src="https://www.generatormix.com/images/footballer/diego-maradona.jpg" width="206" height="282" alt="Diego Maradona">

## Prerequisites

- `docker-compose v1.29.2`
- `node 16 / npm 7`

## Test

```
npm install
npm test
```

## Running

`docker-compose up`

Once up and running you can use the API via its documentation:

http://localhost:3000/api-docs

### Authentication

Please note that before making any requests you must first authenticate:

- Execute a request to the `/authenticate` endpoint with the example request body
- Copy the "accessToken" value
- Click the "Authorize" button at the top, paste in the JWT and submit

With the `Authorization` header set you can now use the different player resources.
