# Movie Rental API Endpoints

This project provides a REST API for managing a movie rental service. The API allows you to create, retrieve, update, and delete movies from the collection. The following sections describe the available endpoints.

| method | Endpoint    | Responsibilities       |
| ------ | ----------- | ---------------------- |
| POST   | /movies     | Create movies          |
| GET    | /movies     | Retrieve all movies    |
| GET    | /movies/:id | Retrive movie by id    |
| PATCH  | /movies/:id | Update movie by id     |
| DELETE | /movies/:id | Delete movie by id     |

## GET ```/movies```

This route lists all the movies in the collection and also allows you to filter movies by a specific category.

- Query parameter: category
- If the provided category does not exist, all movies will be returned.

### Example request

```GET /movies?category=Animation```

### Response

```json
[
  {
    "id": 1,
    "name": "Shrek",
     "category": "Animation",
     "duration": 120,
     "price": 23.40
  },
  {
     "id": 2,
     "name": "Luck",
     "category": "Animation",
     "duration": 120,
     "price": 40.34,
   }
]
```

## POST ```/movies```

This route creates a new movie.

### Request body

```json
{
  "name": "Inside Out",
  "category": "Animation",
  "duration": 120,
  "price": 35
}
```

### Response

Status code: ```201 CREATED```

```json
{
  "id": 1,
  "name": "Inside Out",
  "category": "Animation",
  "duration": 120,
  "price": 35
}
```

## GET ```/movies/:id```

This route retrieves a movie by its id.

### Example request

```GET /movies/1```

### Response

Status code: ```200 OK``` 

```json
{
  "id": 1,
  "name": "Inside Out",
  "category": "Animation",
  "duration": 120,
  "price": 35
}
```
## PATCH ```/movies/:id```

This route updates a movie by its id. All fields can be updated optionally.

### Example request

```PATCH /movies/2```

### Request body

```json
{
  "name": "Matrix 2"
}
```
### Response

Status code: ```200 OK```

```json
{
  "id": 2,
  "name": "Matrix 2",
  "category": "Sci-Fi",
  "duration": 120,
  "price": 35
}
```

## DELETE ```/movies/:id```

This route deletes a movie by its id.

### Example request

```DELETE /movies/1```

### Response

Status code: ```204 NO CONTENT```

## Error Handling

For the routes ```GET```, ```PATCH```, and ```DELETE``` ```/movies/:id```, if the id does not exist, the following error message and status code will be returned:

- Status code: ```404 NOT FOUND```

```json
{
  "error": "Movie not found!"
}
```
For the routes ```POST``` and ```PATCH```, if the name already exists, the following error message and status code will be returned:

- Status code: ```409 CONFLICT```

```json
{
  "error": "Movie name already exists!"
}
```

## Database


     


