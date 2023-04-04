import { Request, Response } from "express";
import { client } from "./database";
import { IMoviesCreate, IMoviesRequest } from "./interfaces";
import format from 'pg-format';
import { QueryResult } from 'pg';

const createMovie = async (request: Request, response: Response): Promise<Response> => {

  const moviesDataRequest: IMoviesRequest = request.body;

  const query: string = format(
    `
      INSERT INTO movies (%I)
      VALUES (%L)
      RETURNING *;
    `,
    Object.keys(moviesDataRequest),
    Object.values(moviesDataRequest)
  );

  try {
    const queryResult: IMoviesCreate = await client.query(query);
    return response.status(201).json(queryResult.rows[0]);
    
  } catch (error) {
    console.log(error)
    return response.status(409).json({
      error: "Movie name already exists!"
    })
  }

}

const retrieveAllMovies = async (request: Request, response: Response): Promise<Response> => {

  const category = request.query.category || true; 

  const query = `
    SELECT *
    FROM movies
    WHERE $1
  `

  const queryResult: QueryResult = await client.query(query, [category]);

  return response.status(200).json(queryResult.rows);
}

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  const id: number = Number(response.locals.movies.id);

  const query = `
    DELETE FROM movies
    WHERE id = $1
  `
  const queryResults = await client.query(query, [id]);

  return response.status(204).json();
}

export {
  createMovie,
  retrieveAllMovies,
  deleteMovie
}