# Demo for Keycloak using express backend

## Run Keycloak

```bash
$ sudo docker run -d -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:10.0.2
```


## Setup Keycloak
* Login to Keycloak admin panel and create a client with using the provided [666.json](666.json) file.
* Create a normal user.
* Admin user has realm admin role already.
* Setup public key in [utils.js](utils.js) for the client.


## Run server

Need `nodejs>=14.0.0`

```bash
$ node index.js
```

Server runs on port 3000. Uses self signed certs for https.

## More info

* Using `openid-connect` for client.
