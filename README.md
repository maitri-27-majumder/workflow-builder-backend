# Setup

- Add .env file. 

- Add `PORT` you want to run on and `DATABASE_URL` of the mongoDB.

- run `npm install`.

`npm start` to roll up the server locally.

# Endpoint

- GET `/api/workflows`: retrieves all saved workflows from the database.
- GET `/api/workflows/:id`: retrieves an individual workflow from the database.
- POST `/api/workflows`: Takes an workflow and saves it to the db.
  Payload `{ _id: string, steps: Array<{ name: string }> }`

- POST `/api/upload`: Takes a file to automate and workflow id, and triggers the particular workflow on the document.
  Payload `{ id: string, file }`
