Siika stub
====

> Simple stub api server.

Demo - use in script
----

```
$ npm i siika-stub
```

```js
// stub.js
var ss = require('siika-stub');

var server = new ss.Server();

var stub = {
    'api/v2': {
        users: {
            GET: [
                { id: 0, name: 'bob', age: 20 },
                { id: 1, name: 'alice', age: 24 }
            ],
            ':id': req => ({
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                },
                body: '{ id: ' + req.params.id + ', name: bob, age: 20 }'
            })
        }
    }
};

server.start( stub, { port: 3000 });
```

and you run the script - `node stub.js`

You can access...
http://localhost:3000/api/v2/users
http://localhost:3000/api/v2/users/1234

Stub
----

### Regex in path
```js
{
    users: {
        [{ id: /[0-9]+/ }]: {
            ...
        }
    }
}
```

Request
----

- method
- path
- headers
- query
- params
- body

Response
----

- body
- http response
- action return body
- action return http response

### Http response

- status
- body
- headers
- *latency

Option
----

- port
- proxy

API
----

### server.start( stub, [option] )

- parameters
  - `stub`: Stub
  - `option`: ServerOption

### server.stop()
