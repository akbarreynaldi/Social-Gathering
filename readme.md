## Arisan With NodeJS and ExpressJS

### Install
```
npm install
```
### Database & Table
```sql
create database db_social_gathering;

create table social_gathering
(
  id               serial primary key,
  name             varchar(50) not null,
  amount           integer     not null,
  total_amount     integer     not null,
  max_participants integer     not null,
  created_at       timestamp   not null,
  updated_at       timestamp,
  periodic         varchar(10) not null,
  end_date         date        not null,
  start_date       date        not null
);

create table participant
(
  id                  serial primary key,
  social_gathering_id integer               not null references social_gathering,
  name                varchar(50)           not null,
  address             varchar(100)          not null,
  contact_person      varchar(15)           not null,
  balance             integer               not null,
  created_at          timestamp             not null,
  updated_at          timestamp,
  is_status           boolean default false not null,
  is_payment          boolean default false not null
);

create table payment
(
  id                  serial primary key,
  social_gathering_id integer   not null references social_gathering,
  participant_id      integer   not null references participant,
  amount              integer   not null,
  date                date      not null,
  created_at          timestamp not null,
  updated_at          timestamp
);

create table draw
(
  id                  serial primary key,
  social_gathering_id integer   not null references social_gathering,
  participant_id      integer   not null references participant,
  date                date      not null,
  amount              integer   not null,
  created_at          timestamp not null,
  updated_at          timestamp
);
```

### Make .env File with This Template
```
APP_HOST=localhost 
APP_PORT=8181
DB_DRIVER=postgresql //your database driver
DB_HOST=localhost //your database host
DB_PORT=5432 //your database port
DB_USER=username //your database user
DB_PASS=password //your database password
DB_NAME=db_social_gathering //your database name

```

### API Spec
- Host: `localhost`
- Port: `8181`
- For Testing: [Postman Social Gathering](https://app.getpostman.com/join-team?invite_code=7f7e6a1ba1066cf4c9ec035d69838ea4&target_code=1be1126ed849d8c77d398676a23ec481)

#### Social Gathering
- Request: `POST`
- Endpoint: `/social-gathering`
- Body
```json
{
  "name": "Arisan 2",
  "amount": 250000,
  "maxParticipants": 3,
  "periodic": "weeks"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 5,
    "name": "Arisan 1",
    "amount": 250000,
    "totalAmount": 0,
    "MaxParticipants": 3,
    "periodic": "weeks",
    "startDate": "2022-09-02T08:00:00.000Z",
    "endDate": "2022-09-23T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/social-gathering`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
  {
    "id": 1,
    "name": "Arisan 1",
    "amount": 300000,
    "totalAmount": 0,
    "MaxParticipants": 3,
    "participant": [
    {
      "id": 1,
      "social_gathering_id": 1,
      "name": "Reynaldi Akbar M",
      "address": "Jl. H. Dahlan 75",
      "contact_person": "082987654321",
      "balance": 300000,
      "created_at": "2022-09-02T08:00:00.000Z",
      "updated_at": null,
      "is_status": false,
      "is_payment": false
    }
    ],
    "periodic": "Weeks",
    "startDate": "2022-09-02T08:00:00.000Z",
    "endDate": "2022-09-23T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  },
  {
    "id": 2,
    "name": "Arisan 2",
    "amount": 100000,
    "totalAmount": 0,
    "MaxParticipants": 3,
    "participant": [],
    "periodic": "Months",
    "startDate": "2022-09-02T08:00:00.000Z",
    "endDate": "2022-09-23T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/social-gathering/2`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 2,
    "name": "Arisan 2",
    "amount": 100000,
    "totalAmount": 0,
    "MaxParticipants": 3,
    "participant": [],
    "periodic": "Months",
    "startDate": "2022-09-02T08:00:00.000Z",
    "endDate": "2022-09-23T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
 ```
- Request: `PUT`
- Endpoint: `/social-gathering/2`
- Body
```json
{
  "name": "Arisan 3",
  "amount": 300000,
  "maxParticipants": 3,
  "periodic": "Weeks",
  "startDate": "2022-09-05T08:00:00.000Z"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 2,
    "name": "Arisan 3",
    "amount": 300000,
    "totalAmount": 0,
    "MaxParticipants": 3,
    "periodic": "Weeks",
    "startDate": "2022-09-05T08:00:00.000Z",
    "endDate": "2022-09-26T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": "2022-09-02T08:10:10.000Z"
  }
}
```

- Request: `DELETE`
- Endpoint: `/social-gathering/2`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": "Social gathering with value ID 2 successfully deleted"
}
 ```

#### Participant
- Request: `POST`
- Endpoint: `/participant`
- Body
```json
{
  "socialGatheringId": 1,
  "name": "Reynaldi Akbar M",
  "address": "Jl. H. Dahlan 75",
  "contactPerson": "082987654321",
  "balance": 300000
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 1,
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "startDate": "2022-09-02T08:00:00.000Z",
      "endDate": "2022-09-23T08:00:00.000Z"
    },
    "name": "Reynaldi Akbar M",
    "address": "Jl. H. Dahlan 75",
    "contactPerson": "082987654321",
    "balance": 300000,
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/participant`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
  {
    "id": 1,
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "startDate": "2022-09-02T08:00:00.000Z",
      "endDate": "2022-09-23T08:00:00.000Z"
    },
    "name": "Reynaldi Akbar M",
    "address": "Jl. H. Dahlan 75",
    "contactPerson": "082987654321",
    "balance": 300000,
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/participant/1`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data":   {
    "id": 1,
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "startDate": "2022-09-02T08:00:00.000Z",
      "endDate": "2022-09-23T08:00:00.000Z"
    },
    "name": "Reynaldi Akbar M",
    "address": "Jl. H. Dahlan 75",
    "contactPerson": "082987654321",
    "balance": 300000,
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
 ```
- Request: `PUT`
- Endpoint: `/participant/1`
- Body
```json
{
  "name": "Reynaldi Akbar M",
  "address": "Jl. H. Dahlan 75",
  "contactPerson": "082123456789"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 1,
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "startDate": "2022-09-02T08:00:00.000Z",
      "endDate": "2022-09-23T08:00:00.000Z"
    },
    "name": "Reynaldi Akbar M",
    "address": "Jl. H. Dahlan 75",
    "contactPerson": "082123456789",
    "balance": 300000,
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": "2022-09-02T08:10:10.000Z"
  }
}
```

- Request: `PUT`
- Endpoint: `/participant/top-up-balance/1`
- Body
```json
{
  "balance": 135000
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": 1,
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "startDate": "2022-09-02T08:00:00.000Z",
      "endDate": "2022-09-23T08:00:00.000Z"
    },
    "name": "Reynaldi Akbar M",
    "address": "Jl. H. Dahlan 75",
    "contactPerson": "082123456789",
    "balance": 435000,
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": "2022-09-02T08:20:20.000Z"
  }
}
```

- Request: `DELETE`
- Endpoint: `/participant/2`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": "Participant with value ID 2 successfully deleted"
}
 ```

#### Payment
- Request: `POST`
- Endpoint: `/payment`
- Body
```json
{
  "participantId": 1,
  "socialGatheringId": 1
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "paymentId": 1,
    "participant": {
      "id": 1,
      "mame": "Reynaldi Akbar M",
      "contactPerson": "082123456789",
      "balance": 135000,
      "isPayment": true
    },
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "totalAmount": 300000
    },
    "paymentAmount": 300000,
    "paymentDate": "2022-09-02T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/payment`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
  {
    "paymentId": 1,
    "participant": {
      "id": 1,
      "mame": "Reynaldi Akbar M",
      "contactPerson": "082123456789",
      "balance": 135000,
      "isPayment": true
    },
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "totalAmount": 300000
    },
    "paymentAmount": 300000,
    "paymentDate": "2022-09-02T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/payment/1`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data":{
    "paymentId": 1,
    "participant": {
      "id": 1,
      "mame": "Reynaldi Akbar M",
      "contactPerson": "082123456789",
      "balance": 135000,
      "isPayment": true
    },
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000,
      "totalAmount": 300000
    },
    "paymentAmount": 300000,
    "paymentDate": "2022-09-02T08:00:00.000Z",
    "createdAt": "2022-09-02T08:00:00.000Z",
    "updatedAt": null
  }
}
 ```

#### Draw
- Request: `POST`
- Endpoint: `/draw`
- Body
```json
{
  "socialGatheringId": 2
}
```
- Response if there are participants who have not paid the bill :
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "message": "There are still participants who have not paid the social gathering bill",
    "unpaid": [
      {
        "id": 2,
        "social_gathering_id": 1,
        "name": "Reynaldi Akbar M",
        "address": "Jl. H. Dahlan 75",
        "contact_person": "082987654321",
        "balance": 100000,
        "created_at": "2022-09-02T08:00:00.000Z",
        "updated_at": null,
        "is_status": false,
        "is_payment": false
      }
    ]
  }
}
```
- Response :
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "drawId": 1,
    "participant": {
      "id": 1,
      "mame": "Reynaldi Akbar M",
      "contactPerson": "082123456789",
      "balance": 635000,
      "isStatus": true,
      "isPayment": false
    },
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000
    },
    "drawAmount": 600000,
    "drawDate": "2022-09-09T08:00:00.000Z",
    "createdAt": "2022-09-09T08:00:00.000Z",
    "updatedAt": null
  }
}
```

- Request: `GET`
- Endpoint: `/draw`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
    {
      "drawId": 1,
      "participant": {
        "id": 1,
        "mame": "Reynaldi Akbar M",
        "contactPerson": "082123456789",
        "balance": 635000,
        "isStatus": true,
        "isPayment": false
      },
      "socialGathering": {
        "id": 1,
        "name": "Arisan 1",
        "amount": 300000
      },
      "drawAmount": 600000,
      "drawDate": "2022-09-09T08:00:00.000Z",
      "createdAt": "2022-09-09T08:00:00.000Z",
      "updatedAt": null
    }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/draw/1`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "drawId": 1,
    "participant": {
      "id": 1,
      "mame": "Reynaldi Akbar M",
      "contactPerson": "082123456789",
      "balance": 635000,
      "isStatus": true,
      "isPayment": false
    },
    "socialGathering": {
      "id": 1,
      "name": "Arisan 1",
      "amount": 300000
    },
    "drawAmount": 600000,
    "drawDate": "2022-09-09T08:00:00.000Z",
    "createdAt": "2022-09-09T08:00:00.000Z",
    "updatedAt": null
  }
}
 ```
