import express from 'express';
import getDataDBInstance from './data/get_data_db.mjs';
import solusiInstance from './controller/solusi.mjs';
import gejalaInstance from './controller/gejala.mjs';
import penyakitInstance from './controller/penyakit.mjs';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Skripsi API')
});

app.get('/v1/get-solusi', async (req, res) => {
    let result = await solusiInstance.getAll();
    res.status(200).json({
        'data' : result
    })
});

app.get('/v1/get-gejala', async (req, res) => {
    let result = await gejalaInstance.getAll();
    res.status(200).json({
        'data' : result
    })
});

app.get('/v1/get-penyakit', async (req, res) => {
    let result = await penyakitInstance.getAll();
    res.status(200).json({
        'data' : result
    })
})

let port = 9999;
app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
});