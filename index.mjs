import express from 'express';
import getDataDBInstance from './data/get_data_db.mjs';
import solusiInstance from './controller/solusi.mjs';
import gejalaInstance from './controller/gejala.mjs';
import penyakitInstance from './controller/penyakit.mjs';
import similarityInstance from './controller/similiarity.mjs';
import calculateInstance from './controller/calculate.mjs';
import path from 'path';
import multer from 'multer';

import {
    fileURLToPath
} from 'url';
import sqliteHelper from './helper/sqlite3_helper.mjs';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({
    storage: multer.memoryStorage()
});


const app = express();
app.use(express.json());
app.use('/images/penyakit', express.static(path.join(__dirname, 'data', 'img', 'penyakit')));
app.use('/images/gejala', express.static(path.join(__dirname, 'data', 'img', 'gejala')));

app.get('/', async (req, res) => {
    res.send('Skripsi API')
});

app.get('/image/penyakit', (req, res) => {
    const {
        id
    } = req.query;
    try {
        res.sendFile(path.join(__dirname, 'data', 'img', 'penyakit', `${id}.jpg`));
    } catch (error) {
        res.status(404).send('DATA NOT FOUND!')
    }

});

app.get('/image/gejala', (req, res) => {
    const {
        id
    } = req.query;
    res.sendFile(path.join(__dirname, 'data', 'img', 'gejala', `${id}.jpg`));
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

app.post('/solusi/v1/detail', async (req, res) => {
    const {
        data
    } = req.body;
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

app.post('/penyakit/v1/detail', async (req, res) => {
    const {
        data
    } = req.body;
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

app.post('/gejala/v1/detail', async (req, res) => {
    const {
        data
    } = req.body;
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

app.post('/upload-gejala', upload.single('image'), async (req, res) => {
    try {
        const {
            buffer: image
        } = req.file;
        const {
            kode_gejala //data.kode_gejala
        } = req.body;
        let column = ['KODE_GEJALA', 'IMAGE']
        let table = 'T_IMAGE_GEJALA'
        let value = [kode_gejala, image]
        await sqliteHelper.insertData({
            columns: column,
            table: table,
            values: value
        })
        res.status(200).json({
            message: 'Image uploaded successfully!'
        });
    } catch (error) {
        res.status(409).json({
            error: `Failed to upload image -> ${error}`
        });
    }
})

app.get('/image/gejala/:kode', async (req, res) => {
    try {
        const {
            kode
        } = req.params;
        const image = await sqliteHelper.getData({
            column: ['IMAGE'],
            table: 'T_IMAGE_GEJALA',
            condition: `WHERE KODE_GEJALA = '${kode}'`
        });
        console.log(image);
        if (!image) {
            return res.status(404).json({
                error: 'Image not found'
            });
        }
        res.set('Content-Type', 'image/jpeg');
        res.status(200).send(image[0].IMAGE);
    } catch (error) {
        res.status(409).json({ error: 'Failed to fetch image' });
    }
})

app.post('/upload-penyakit', upload.single('image'), async (req, res) => {
    try {
        const {
            buffer: image
        } = req.file;
        const {
            kode_penyakit //data.kode_gejala
        } = req.body;
        let column = ['KODE_PENYAKIT', 'IMAGE']
        let table = 'T_IMAGE_PENYAKIT'
        let value = [kode_penyakit, image]
        await sqliteHelper.insertData({
            columns: column,
            table: table,
            values: value
        })
        res.status(200).json({
            message: 'Image uploaded successfully!'
        });
    } catch (error) {
        res.status(409).json({
            error: `Failed to upload image -> ${error}`
        });
    }
})

app.get('/image/penyakit/:kode', async (req, res) => {
    try {
        const {
            kode
        } = req.params;
        const image = await sqliteHelper.getData({
            column: ['IMAGE'],
            table: 'T_IMAGE_PENYAKIT',
            condition: `WHERE KODE_PENYAKIT = '${kode}'`
        });
        console.log(image);
        if (!image) {
            return res.status(404).json({
                error: 'Image not found'
            });
        }
        res.set('Content-Type', 'image/jpeg');
        res.status(200).send(image[0].IMAGE);
    } catch (error) {
        res.status(409).json({ error: 'Failed to fetch image' });
    }
})

app.delete('/image/penyakit/:kode', async (req, res) => {
    try {
        const {
            kode
        } = req.params;
        const image = await sqliteHelper.deleteData({
            table: 'T_IMAGE_PENYAKIT',
            kode: kode,
            column: 'KODE_PENYAKIT'
        })
        console.log(image);
        if (image === 'Rows deleted: 0') {
            return res.status(404).json({
                error: 'Image not found'
            });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: 'Failed to delete image' });
    }
})

app.delete('/image/gejala/:kode', async (req, res) => {
    try {
        const {
            kode
        } = req.params;
        const image = await sqliteHelper.deleteData({
            table: 'T_IMAGE_GEJALA',
            kode: kode,
            column: 'KODE_GEJALA'
        })
        console.log(image);
        if (image === 'Rows deleted: 0') {
            return res.status(404).json({
                error: 'Image not found'
            });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: 'Failed to delete image' });
    }
})





let port = 9999;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});