# Search interface using Twitter API

## Installation

### Frontend

Run the following commands in command line(assuming yarn is installed) in the sequence mentioned to start the web application

```
    yarn install
    yarn start
```

Testing the application:

Run in command line:

```
    yarn test
```

### Libraries used

- React
- Create React App
- Axios
- Styled Components
- Jest
- React Testing Library

### Backend

- Backend is an express application hosted on heroku. 
- It exposes one REST endpoint. This server is required to avoid the Cross Orgin Request (CORS) exception.
- Currently the backend accepts connections from anywhere.