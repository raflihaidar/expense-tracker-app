import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { router } from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
