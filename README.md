# Med Search

* This is a search tool for finding drugs related to a reference drug by ingredient(s)

## Dependencies

* This is a MERN project

* mongodb: v3.4.10 (installed with homebrew)
* node: v6.11.0 (via nvm); 
  * npm: v3.10.10

## Quickstart

### Installation

* If you don't have mongodb installed, please install it. 
- [Website](https://www.mongodb.com/download-center?jmp=nav#community)

* Clone this repo
* If using yarn
```
yarn install
```

* OR if using npm
```
npm install
```

### Running the App

* In one terminal instance, start mongodb (no additional configuration should be necessary).
(assumed port is default 27017)
```
mongodb
```

* In a separate terminal instance, if using yarn
```
yarn start
```

* OR if using npm
```
npm start
```

After the server has started (it can take a couple minutes) direct your browser to:
* localhost:8000

## Assumptions

* For certain reference drugs, if multiple ingredients were returned from the query, multiple queries are automatically triggered per ingredient (ex reference drugs from acetaminophen typically returned multiple ingredients)

* Based on testing from searches for alavert, it was assumed that common TTY groupings for search results were ['BPCK', 'GPCK', 'SBD', 'SCD']. This might be too limiting for all drug search results but was used to group reference drugs for display.

* It is assumed that 'popular searches' should be the reference drug queries (resulting in SBD/SCD drugs results for ingredients).

## User flows

There are 2 potential user flows

### Manual search

1 /client/modules/Post/pages/PostListPage/PostListPage.js (component)

2 /client/modules/Post/pages/PostDetailPage/PostDetailPage.js

3 /client/modules/Post/pages/Search3/Search3.js

### Popular reference drug search

1 /client/modules/Post/pages/PostListPage/PostListPage.js (component)

2 /client/modules/Post/pages/Search4/Search4.js

## Important files

These were the main files changed from the scaffolding tool template files

```
| - package.json

| - README.md

| - yarn.lock

| - client

    | - App.js

    | - index.js

    | - main.css

    | - modules 

        | - App

            | - App.js // contains client routes

            | - App.css

        | - Post

            | - PostReducer.js // reducers for all queries

            | - PostActions.js // actions for all queries and getting popular searches

            | - components // Sub components of this module

                | - SearchResultsList.js

            | - pages // React Router Pages from this module

                | - style2.css

                | - PostListPage // default view

                    | - PostListPage.js

                | - PostDetailPage // reference drugs list

                    | - PostDetailPage.js

                | - Search3 // final search view (SBD/SCD drugs by ingredients)

                    | - Search3.js

                | - Search4 // final search view (SBD/SCD drugs from popular search)

                    | - Search4.js

| - server

    | - dummyData.js

    | - server.js

    | - controllers

        | - post.controller.js

    | - models

        | - post.js

    | - routes

        | - post.routes.js
```

## Known Issues

* There is a warning in the console for duplicate search results (from query 3, based on ingredients of reference drugs) being added to the view. This should be refactored but has a dependency on the first assumption (which could be wrong).

* The views for Search3 and Search4 could be refactored and merged into one component.

* Unit tests were not included in this deliverable. Manual testing was done.

* The app was not deployed via a host.

## Nice to Have

These items were ommitted because of time.

* Search results views pagination.

* Internal links on search results views to jump to list categories (ex jump to SCD drugs).

* Additional responsive styling for desktop. For long search results lists it would be nice to break down into 2 or 3 columns.

* Renaming of files and removal of files. Since this was the first time using the mern.io scaffolding tool, I felt it would take too long to troubleshoot removing/renaming files if it broke the app.

* Future feature: it would be nice to be able to filter search results based on a patient's medical history (removing drugs which were already tried but non-effective or removing drugs that would potentially conflict with current prescriptions)

* Future feature: it would be nice to be able to sort search results based on price

* Future feature: it would be nice to have a recommender system for discovering new drugs of interest (not sure if this is the same thing as the final SCD list)

## Resources

* This project was scaffolded using the mern-starter project
- [Website](http://mern.io)

* The mern.io starter code was using an older version of react-router (2.x) and this topic was referenced for quickly upgrading to 4.x
  * https://github.com/Hashnode/mern-starter/issues/297#issuecomment-320136750

* The mern.io default header/footer (graphics) were used as is because it appeared suitable. Very little aesthetic design changes were made to the project. Most changes were functional design decisions.


