# mcmakler-backend
McMakler backend test

## Overview

1. Points 1 - 7 have been implemented.
2. Tests for `hazardous` and `fastest` APIs are implemented, placed in *./server/tests* directory.
3. An additional route `/get-initial-data` is there to run the command to load initial data.
4. Another route `neo/all` is added to get all the NEOs in DB.

## Instructionss

1. Clone this repo.
2. cd to `mcmakler-backend`.
3. Have mongodb installed and running, port can be set in *./config/config.js*.
4. Run `npm install` in order to install dependencies.
5. Run `npm start` to start the dev server.
6. Make a GET call to `/get-initial-data` to fetch last 3 days data from the NASA API and store it to mongoDB.
7. Run `npm test` to run tests.
