# Aircall frontend test - Pierre Goutheraud

Project deployed here: [https://aircall-frontend-hiring-test.vercel.app](https://aircall-frontend-hiring-test.vercel.app)

## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Dev

`yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

`yarn build && serve -s build`
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Run tests

`yarn test`

## Features

There are a billion things I could improve but I tried to do my best in the time I had to allow to the project.<br />
I hope you like it.

### Authentication

If you are not authenticated and try to go to a private route, you get redirected to the login page.
When first logging-in, I fetch the token and user with `/auth/login`.
The authentication informations (token, its expiration etc.) are stored in local storage and redux.
When coming back on the website again, I check for a token in local storage, if so I only fetch the user with `/me`.
The token is refreshed when needed with `/auth/refresh-token`.

### Home & Pagination

When you navigate to a page, calls are fetched from the api and stored in redux to be re-used when you navigate back to that page.
Redux state uses an array (call.list) to store the position of the calls in the pages and a map (call.data) to store the calls data.

### Archive / Unarchive

When you archive/unarchive a call, the redux data gets changed immediately so the user gets instant feedback on the UI.
In the background the api call gets done and ultimately the data get confirmed by an update from `PUSHER` and also allows to be synched with all the other users.
I intentionnally delay `PUSHER` updates when the user is doing a new action, so the user can spam the archive button and gets the `PUSHER` update when he is done.

### Call page

When you navigate from the home to the call page (and vice versa) if redux data exists, the page does not fetch from the api.

### Styling

I used a mix between elements, styling props from Traktor and my own custom css.
I am aware that this is not very elegant and we should focus on one of those 2 solutions, but
I felt more comfortable writing a mix, knowing the limited time I had to work on the project.

### Testing

I use jest for pure functions and redux actions/reducers testing.
I use jest and react-testing-library for react components testing.
Since I had a lot of features to design, tests are not exhaustive but should be enough to
understand what I can do.

### Project architecture

Presentational components are in `./src/components/` while Containers are in `./src/pages/`.<br />
React hooks in `./src/hooks/`.<br />
Service and utils in `./src/lib/`.<br />
Redux related stuff in `./src/redux/`. For small project like that I usually re-group actions types, actions and reducers in a single file. (`./src/redux/modules/`).
