import { Client } from 'pg';

const client: Client = new Client({
  user: 'hannanascimento',
  password: '31121995',
  host: 'localhost',
  database: 'locadora_de_filmes', 
  port: 5432
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log('Database is connected.')
}

export {
  startDatabase,
  client
}