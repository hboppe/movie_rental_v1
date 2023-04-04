import express, { Application } from 'express';
import { startDatabase } from './database';
import { createMovie, deleteMovie, retrieveAllMovies } from './logic';
import { ensureMovieExists } from './middleware';

const app: Application = express();

app.use(express.json());

app.listen(3000, async () => {
  await startDatabase();
  console.log('Server is running');
});

app.get('/movies', retrieveAllMovies);
app.post('/movies', createMovie);
app.delete('/movies/:id', ensureMovieExists, deleteMovie);