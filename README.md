# Like Service

> Backend service to implement a like button available to users on various pages.

### __Installation__
* Clone the repository on [Github](https://github.com/grantfayvor/like-service)
* Change directory into the project folder
* Run ```npm install``` to install dependencies

### __How to Run__
You can run the app either as a local server, Docker or with Kubernetes.
* #### Local Server
> Run the project by typing the command ```npm run start:dev``` in terminal and pressing enter. The server will be available at [http://localhost:3000](http://localhost:3000).
* #### Docker
> After making sure that docker is properly installed on your system build the image with the command below

>```docker build -t like-service-api:latest .```

>Run the image with the command below

>```docker run --publish 3000:3000 --name like-service-api like-service-api:latest```

* #### Kubernetes
>After making sure that Kubernetes is properly installed on your system run the container with the command below

>```kubectl apply -f application-deployment.yml```  
```kubectl apply -f application-service.yml```

### ___Things to note___
* Rate limiting was used to limit the number of requests a user can make per time which was set to 20 requests per 15 minutes. Intention is to prevent potential DDOS attacks.
* Database level transactions was used to prevent race conditions when likes where happening asynchronously by multiple users at the same time. This is in keeping with the Consistent quality of ACID databases.
* OpenAPI specs were created with Swagger UI.

### __Bonus Challenge__
* Rate limiting should be used to prevent DDOS attacks. Request inputs should be properly validated to prevent potential malicious input attacks.
* We can scale for a lot of users by building as a distributed system with load balancing to redirect traffic based on either available servers in the pool or based on geographic locations. Proper retry mechanism should be built to make the system resilient against failures. Liking by users should happen asynchronously and the system should favour eventual consistency over immediate consistency. It ideally increments in transactions to prevent race conditions but users don't need to wait for transactions to propagate before getting visual feedback. After transactions have propagated, the server can notify clients using asynchronous systems like webhooks, sockets or some other kind of pub/sub systems.
* With a distributed system we can scale horizontally to meet traffic for a million users and also have a centralized caching system to quickly return frequently accessed like contents and reduce the load on the server.

### Online
The application is deployed using the Google App Engine and is available at [https://like-service-295414.uc.r.appspot.com](https://like-service-295414.uc.r.appspot.com).