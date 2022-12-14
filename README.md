# Student Workspace Application

For now project consists of REACT.js frontend and Express.js backend. Right now only documents upload API is available on the backend. 

To install all packges for both frontend and backend use 
```
npm install
```

Backend can be started on port 3001 from the `/server` directory using:
```
npm run start
```
We run backend on 3001 because 3000 is used by frontend when debugging it locally.

Documents upload API can be tested using Postman collection inside `/postman` directory. Server is going to store uploaded files inside `/server/uploads` directory which it is  going to create if it does not exist.


Test can also be done using frontend. For now I have been running frontend using debugging mode in VSCode with Chrome.

