## Atelier Reviews API 

Create a dedicated micro-service with modern architecture to boost performance and reliability of legacy API 

## Installation Instructions: 

- [ ] **Git Clone:** `git clone https://github.com/Fairy-Company/Atelier-Reviews-API.git`


- [ ] **Install the dependencies:**
`npm install`


- [ ] **Create DB:**
`Run the schema with ETL inside postgresql terminal`


- [ ] **Run the service:**
`npm run server-dev`

## Service Information: 

`1. Design a PostgreSQL schema for the reviews service` 

`2. Transform existing application data and load it into the database`

`3. Design and build an API server to provide data to the client in the format specified by the legacy API documentation`

`4. Optimize the service by analyzing query times and server responses`

`5. Deploy service on AWS` 

`6. Measure and improve the performance of the service at scale`

## Loaderio 
**No Optimization (1500 users per sec):**
![img](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6cb6286c-597e-48ad-a299-d0f1bcdda8f2%2FScreen_Shot_2022-08-06_at_3.54.54_PM.png?table=block&id=af517caf-f178-447c-b5f2-34a8d7b892f5&spaceId=a5e68ee8-c124-4823-9dad-174b61ce5b97&width=1920&userId=a3acceaa-b374-45c5-ae67-c5fced6dd299&cache=v2)

**Load Balancer(2000 users per sec):**
![img](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F782730e0-2439-4af8-8fd5-e8ef6811d550%2FScreen_Shot_2022-08-06_at_7.37.24_PM.png?table=block&id=e2f1baf2-da7d-49ab-8581-23da17c3991f&spaceId=a5e68ee8-c124-4823-9dad-174b61ce5b97&width=1920&userId=a3acceaa-b374-45c5-ae67-c5fced6dd299&cache=v2)

**Load Balancer + Caching (2000 users per sec):**
![img](http://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F393debe1-8d8d-4570-a649-3b692485b4eb%2FScreen_Shot_2022-08-07_at_11.12.08_AM.png?table=block&id=34bf6167-b541-41ee-a07f-6d248683f7b6&spaceId=a5e68ee8-c124-4823-9dad-174b61ce5b97&width=1920&userId=a3acceaa-b374-45c5-ae67-c5fced6dd299&cache=v2)

## Technologies Used:

- Express v4.18.1
- PostgreSQL v8.7.3
- PostgreSQL v1.0.4
- K6
- Loader io 


