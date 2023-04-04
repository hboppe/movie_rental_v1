import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import { QueryResult } from 'pg';

const ensureMovieExists = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

  const id: number = Number(request.params.id);
  const query = `
    SELECT *
    FROM movies
    WHERE id = $1
  `
  
  const queryResult: QueryResult = await client.query(query, [ id ]);

  if(queryResult.rowCount === 0){
    return response.status(404).json({
      error: "Movie not found!"
    });
  };

  response.locals.movies = {
    id: id
  }

  return next();
}

export {
  ensureMovieExists
}