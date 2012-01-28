This is a proof of concept for running realtime apps off a WordPress database with high scalability

Setup:

sudo apt-get install node

npm install mysql
npm install socket.io

In server.js, configure DB params from lines 8-11.

cd to dir, type node server.js

Visit http://hostname:1337 in the browser

The text will change color on every refresh. Save a new draft and it will show up on the page with the next color change.