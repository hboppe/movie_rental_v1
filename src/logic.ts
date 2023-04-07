import { Request, Response } from "express";
import { client } from "./database";
import { IMovies, IMoviesCreate, IMoviesRequest } from "./interfaces";
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
    return response.status(409).json({
      error: "Movie name already exists!"
    })
  }

}

const retrieveAllMovies = async (request: Request, response: Response): Promise<Response> => {

  const category: string | null = request.query.category ? request.query.category.toString() : null; 

  const perpage: number | null = parseInt(response.locals.movies.perpage) === 0 ? null : parseInt(response.locals.movies.perpage);
  const page: number | null = parseInt(response.locals.movies.page) === 0 ? null : parseInt(response.locals.movies.page);

  const query: string = `
    SELECT *
    FROM movies
    WHERE category = $1
    ORDER BY id
    LIMIT $2
    OFFSET $3;
  `
  const queryResult: QueryResult = await client.query(query, [category, perpage, page]);

  if(queryResult.rows.length === 0){

    const newQuery = `
      SELECT *
      FROM movies
      ORDER BY id
      LIMIT $1
      OFFSET $2;
    `;

    const newQueryResult: QueryResult = await client.query(newQuery, [perpage, page]);

    return response.status(200).json(newQueryResult.rows)
  }
  
  return response.status(200).json(queryResult.rows);
}

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  const id: number = Number(response.locals.movies.id);

  const query: string = `
    DELETE FROM movies
    WHERE id = $1
  `
  await client.query(query, [id]);

  return response.status(204).json();
}

const updateMovie = async (request: Request, response: Response): Promise<Response> => {
  const id: number = Number(response.locals.movies.id);
  const updatedData: Partial<IMovies> = request.body;

  if(updatedData.id){
    delete updatedData.id;
  } else if(updatedData.name){
    const query:string = `
      SELECT *
      FROM movies
      WHERE name = $1;
    `
    const queryResult: QueryResult = await client.query(query, [updatedData.name]);
    
    if(queryResult.rows.length > 0){
      return response.status(409).json({
        error: "Movie name already exists!"
      })
    }
  }

  const query: string = format(`
      UPDATE movies
      SET (%I) = ROW (%L)
      WHERE id = $1
      RETURNING *;
    `,
    Object.keys(updatedData),
    Object.values(updatedData)
  );

  try {
    const queryResult: IMoviesCreate = await client.query(query, [id]);
    return response.status(200).json(queryResult.rows[0]);
    
  } catch (error) {
    return response.status(409).json({
      error: "Movie name already exists!"
    })
  }

}

const retrieveMovieById = async (request: Request, response: Response): Promise<Response> => {
  const id: number = Number(response.locals.movies.id);

  const query: string = `
    SELECT *
    FROM movies
    WHERE id = $1;
  `
  const queryResult: QueryResult = await client.query(query, [id]);

  return response.status(200).json(queryResult.rows[0]);
}

export {
  createMovie,
  retrieveAllMovies,
  deleteMovie,
  updateMovie,
  retrieveMovieById
}