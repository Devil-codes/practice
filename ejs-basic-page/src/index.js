import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(morgan('dev'));
app.use(express.static('../public'));

const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    console.log(import.meta.url, __filename, __dirname, process.cwd());
    res.sendFile(__dirname + '/index.html');
});
