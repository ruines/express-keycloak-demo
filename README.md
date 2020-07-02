# Demo for Keycloak using express backend

## Run Keycloak

```bash
$ sudo docker run -d -p 8080:8080 \
    -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    quay.io/keycloak/keycloak:10.0.2
```


## Setup Keycloak

* Login to Keycloak admin panel and create a client with using the
  provided [example_client.json](example_client.json) file.
* Create a normal user.
* Admin user has realm admin role already.
* Setup public key in [utils.js](utils.js) for the client.


## Run server

Need `nodejs>=10`

Install packages:
``` sh
$ npm i
```

Run the node server:
``` sh
$ npm start
```

Server runs on port 3000.

## Notes

* **DONOT** set `all requests` under *Realm Settings > Login > Require SSL*. Use proxy SSL termination.
* Currently using `openid-connect` for client.
* `implicit` flow uses reponseType as `token id_token`, `explicit` uses `code`.
* In "Mappers" of a client, "Attributes" of a user can be set as token values.
