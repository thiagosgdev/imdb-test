## About

This API manages gives the users the opportunity to sign in, list movies and score how much they liked the movie. The movie management has to be done by an admin. Most of the routes are guarded, and the user has to provide a JWT Token in the request Header.

## Project Structure

I tried to keep as close as I can to a Clean Archtecture Pattern. Every module has a context folder that keeps the service, controller and unit tests for a single use case. The infra folder keeps the DB implementation and the shared folder the entities and code used by more than one use case.

## Running the project

### Docker

- After you clone the repository, open the terminal and navigate to the local repository folder.
- On the terminal, type the command yarn to install all dependencies
- Rename the file .env.example to .env and fill all the environment variables.
- On the terminal, type the command docker-compose up --build to build the containers, run the migrations and the application.
- Open a new terminal window to run the commands docker exec -it app_imdb yarn seed:admin e docker exec -it app_imdb yarn seed:users to seed the DB.
- If any error happens please try to run the application locally.

### Locally

- After you clone the repository, open the terminal and navigate to the local repository folder.
- On the terminal, type the command yarn to install all dependencies
- Rename the file .env.example to .env and fill all the environment variables.
- On the terminal, run the commands:

## Stack

Nestjs
Posgres
