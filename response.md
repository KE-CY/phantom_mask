# Response
> The Current content is an **example template**; please edit it to fit your style and content.
## A. Required Information
### A.1. Requirement Completion Rate
- [x] List all pharmacies open at a specific time and on a day of the week if requested.
  - Implemented at `{GET} /pharmacies/open` API.
- [x] List all masks sold by a given pharmacy, sorted by mask name or price.
  - Implemented at `{GET} /pharmacies/:id/masks` API.
- [x] List all pharmacies with more or less than x mask products within a price range.
  - Implemented at `{GET} /pharmacies/mask-filter` API.
- [x] The top x users by total transaction amount of masks within a date range.
  - Implemented at `{GET} /users/top-mask-buyers` API.
- [x] The total number of masks and dollar value of transactions within a date range.
  - Implemented at `{GET} /masks/transactions/summary` API.
- [x] Search for pharmacies or masks by name, ranked by relevance to the search term.
  - Implemented at `{GET} /masks` And `{GET} /pharmacies` API.
- [x] Process a user purchases a mask from a pharmacy, and handle all relevant data changes in an atomic transaction.
  - Implemented at `{POST} /masks/purchase` API.
### A.2. API Document
> Please describe how to use the API in the API documentation.([postman](https://www.postman.com/side-project-2577/workspace/public-side-project/collection/25585578-cc971561-0f7a-4dea-927b-9a06ccb83cfd?action=share&creator=25585578).)

Import [this](https://github.com/KE-CY/phantom_mask/blob/develop/phantom_mask.postman_collection.json) json file to Postman.

### A.3. Import Data Commands
Please run these two script commands to migrate the data into the database.

#### Development Version (Using TypeScript Source)
```bash
npm run seed-dev
```
1. Executes `src/seed.ts` using `ts-node`

#### Development Version (Using JavaScript Source)
```bash
npm run seed
```
1. Executes `dist/seed.ts` using `node`

#### Make sure the following files are present in the /data folder at the root of your project:
1. data/pharmacies.json
2. data/users.json


## B. Bonus Information

>  If you completed the bonus requirements, please fill in your task below.
### B.1. Test Coverage Report

Not done.

### B.2. Dockerized
Please check my Dockerfile / docker-compose.yml.

On the local machine, please follow the commands below to build it.

```bash
# Step 1: Build the Docker image
$ docker-compose build

# Step 2: Start all containers (backend and PostgreSQL)
$ docker-compose up -d

# Step 3: Run the seed script inside the container to import data
$ docker-compose exec backend node dist/seed.js
```
The seed script will read JSON files (e.g. pharmacies.json, users.json) located under the data/ directory, and insert them into the PostgreSQL database.

### B.3. Demo Site Url

Not done.

## C. Other Information

### C.1. ERD

My ERD [[erd-link]](https://dbdiagram.io/d/Phantom-Mask-6879f5c5f413ba35088189d5).

### C.2. Technical Document

For frontend programmer reading, please check this [technical document](technical-document) to know how to operate those APIs.

- --
