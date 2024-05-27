import express from 'express';
import getDataDBInstance from './data/get_data_db.mjs';
import solusiInstance from './controller/solusi.mjs';
import gejalaInstance from './controller/gejala.mjs';
import penyakitInstance from './controller/penyakit.mjs';
import similarityInstance from './controller/similiarity.mjs';
import calculateInstance from './controller/calculate.mjs';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Skripsi API')
});

app.get('/v1/get-solusi', async (req, res) => {
    let result = await solusiInstance.getAll();
    res.status(200).json({
        'data': result
    })
});

app.get('/v1/get-gejala', async (req, res) => {
    let result = await gejalaInstance.getAll();
    res.status(200).json({
        'data': result
    })
});

app.get('/v1/get-penyakit', async (req, res) => {
    let result = await penyakitInstance.getAll();
    res.status(200).json({
        'data': result
    })
});

app.post('/v1/check/kesamaan-gejala', async (req, res) => {
    const {
        data
    } = req.body;
    console.log(data);
    try {
        let result = await similarityInstance.getKemiripanGejala({
            requestKodeGejala: data.gejala
        })
        res.json({
            'status': 'success',
            'data': result
        })
    } catch (error) {
        res.status(409).json({
            error: error
        })
    }
    
})

app.post('/v1/calculate/similiarity', async (req, res) => {
    const {
        data
    } = req.body;
    try {
        let result = await calculateInstance.similiarityCalculate({
            kodeKasus: data.kodeKasus
        })
        res.json({
            'status': 'success',
            'data': result
        })
    } catch (error) {
        res.status(409).json({
            error: error
        })
    }
})

app.post('/solusi/v1/detail', async(req, res) => {
    const {data} = req.body;
    try {
        let result = await solusiInstance.getDetail({
            kode: data.kode
        });
        res.json({
            'status': 'success',
            'data': result
        })
    } catch (error) {
        res.status(409).json({
            error: error
        })
    }
})

app.post('/penyakit/v1/detail', async(req, res) => {
    const {data} = req.body;
    try {
        let result = await penyakitInstance.getDetail({
            kode: data.kode
        });
        res.json({
            'status': 'success',
            'data': result
        })
    } catch (error) {
        res.status(409).json({
            error: error
        })
    }
})

app.post('/gejala/v1/detail', async(req, res) => {
    const {data} = req.body;
    try {
        let result = await gejalaInstance.getDetail({
            kode: data.kode
        });
        res.json({
            'status': 'success',
            'data': result
        })
    } catch (error) {
        res.status(409).json({
            error: error
        })
    }
})



let port = 9999;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});