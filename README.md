# autumnal-polyphonic
Browse all the rooftops in the browser

## RUNNING THE PROJECT FROM THE REPO

#### Node version v12.13.0 - lts/erbium - is presumed.

-------------------------

**In a NEW terminal window,**

1. Start the `zesty-fs` docker service using default host and ports

-------------------------

**In a NEW terminal window,**

2. Clone the project repo: 
`git clone git@github.com:netaisllc/autumnal-polyphonic.git`

3. Locate to the API folder
`cd autumnal-polyphonic/api`

4. Install deps
`npm install`

5. Start the API
`npm start`

6. Confirm the API's start up message
"2019-11-11 14:39:08.481 INFO  [Proper.ty API v0.0] Listening on port 3000."

7. Confirm the API's identity 
`curl localhost:3000`
=> {"service":"Proper.ty API","version":"0.0","message":"Browse all the roofs"}

A more involved query is as follows:
`curl -X GET 'localhost:3000/property?latitude=41.8781&longitude=-87.6298&radius=100000'`
=> {... big object ... }

-------------------------

**In a NEW terminal window,**

8. Locate to the APP UI folder
`cd autumnal-polyphonic/app/public`

9. Run an HTTP server to serve the UI on port 5000.
Any local http server will suffice as long as the port can be configured to 5000.
(The port is fixed to tht value because I configured my Google API credential to expect it.)

For example,the following command uses the Node package 'serve':
`serve -l 5000`  or simply `serve` as that package defaults to port 5000.

10. Observe the UI on localhost:5000

-------------------------


You are not expected to build the application from its components; source is provided 
for review purposes.

Kevin McGee
netaisllc@gmail.com
415-990-7169