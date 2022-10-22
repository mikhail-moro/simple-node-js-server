# simple-node-js-server

##### Simple nodeJS server that parses data.json file and returns parsed data as response to GET-request with time period in params.

This server can be uses with my android app (https://github.com/mikhail-moro/simple-classes-shedule-android-app).


### Request

Server accepts GET-requests with two params that contains data of time period of classes.

```http
  http://localhost:3000/?start_time=2022-09-01T00:00:00&end_time=2022-10-30T00:00:00
```

### Data

File data.json contains data of my classes at September and October
