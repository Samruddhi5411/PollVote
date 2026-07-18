# PollVote

**Java, Spring Boot, Spring Data JPA, MySQL, React.js**
PollVote is a full-stack polling application where users can create polls with multiple options, view available polls, and vote for their preferred option.

- Built REST APIs for creating, retrieving, deleting polls, and casting votes using Spring Boot, Spring Data JPA, Hibernate, and MySQL.



## Project structure

```
pollvote/
├── backend/            Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/pollvote/
│       ├── model/          Poll, PollOption, Vote (JPA entities)
│       ├── repository/     Spring Data JPA repositories
│       ├── controller/     PollController (REST endpoints)
│       ├── dto/             PollRequest
│       └── config/         WebConfig (CORS)
└── frontend/            React app
    └── src/
        ├── components/     PollList.jsx, CreatePoll.jsx, PollDetail.jsx
        ├── api.js           axios client
        └── App.jsx / App.css / index.jsx / index.css
```

## API endpoints

| Method | Endpoint                              | Description               |
|--------|----------------------------------------|----------------------------|
| GET    | `/api/polls`                           | List all polls             |
| GET    | `/api/polls/{id}`                      | Get one poll with options   |
| POST   | `/api/polls`                           | Create a poll               |
| POST   | `/api/polls/options/{optionId}/vote`   | Cast a vote for an option    |
| DELETE | `/api/polls/{id}`                      | Delete a poll                |

`POST /api/polls` body:
```json
{
  "question": "What's your favorite language?",
  "options": ["Java", "Python", "JavaScript"]
}
```

## Running it

### Backend (Spring Boot)
1. Create a MySQL database (or let `createDatabaseIfNotExist=true` do it).
2. Update credentials in `backend/src/main/resources/application.properties`.
3. From `backend/`: `mvn spring-boot:run` (requires Java 17 + Maven).
   The API starts on `http://localhost:8083`.

### Frontend (React)
1. From `frontend/`: `npm install`
2. `npm start`
   The app starts on `http://localhost:3000` and talks to the API at
   `http://localhost:8083/api` (see `src/api.js`).


