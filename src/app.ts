import express, { Application } from 'express';
import { startDatabase } from './database';
import { createMovie, deleteMovie, retrieveAllMovies, retrieveMovieById, updateMovie } from './logic';
import { ensureMovieExists } from './middleware';

const app: Application = express();

app.use(express.json());

app.listen(3000, async () => {
  await startDatabase();
  console.log('Server is running');
});

app.get('/movies', retrieveAllMovies);
app.get('/movies/:id', ensureMovieExists, retrieveMovieById)
app.post('/movies', createMovie);
app.delete('/movies/:id', ensureMovieExists, deleteMovie);
app.patch('/movies/:id', ensureMovieExists, updateMovie)