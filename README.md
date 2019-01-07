## Kafka Publisher

Publishes shopping cart events onto Kafka


### To Install Dependencies
```
yarn install
```

Note: To install yarn globally:
```
npm install yarn --global
```

### To Build
```
yarn run build
```

### To Run
```
yarn run start
```

### To Test
```
yarn build followed by `yarn test` to execute the unit tests via [Mocha](https://www.npmjs.com/package/mocha) with coverage [nyc](https://www.npmjs.com/package/nyc).
```
  
### Local setup using Docker: 
  
  ##### Prerequisite - Install Docker
     Windows: https://docs.docker.com/docker-for-windows/
     Mac: https://docs.docker.com/docker-for-mac/install/  
     
  Once you have installed docker
  
  Run `docker -v` to confirm docker is running
  
  `docker-compose up` to start all the docker images required for setup 
  
  
  ![containers-list](https://user-images.githubusercontent.com/22003086/50743346-c4da8780-126a-11e9-9e1a-ea5984cb1c71.png)



## Developer Notes

 To see the messages reaching kafka
  
``` 
docker exec -it  <container_name>  kafka-console-consumer --bootstrap-server localhost:9092 --topic shopping-cart-events --from-beginning ```

```

![published-events](https://user-images.githubusercontent.com/22003086/50743355-e20f5600-126a-11e9-837c-f5901b847fab.png)
