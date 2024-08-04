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
import uploadRevise from './controller/upload_revise.mjs';
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
        console.log('checkResult', result);
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
        res.status(409).json({
            error: 'Failed to fetch image'
        });
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
            condition: `WHERE KODE_PENYAKIT = '${kode}' ORDER BY ID`
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
        res.status(409).json({
            error: 'Failed to fetch image'
        });
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
        res.status(200).json({
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(409).json({
            error: 'Failed to delete image'
        });
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
        res.status(200).json({
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(409).json({
            error: 'Failed to delete image'
        });
    }
})

app.put('/update/image/:type/:prefix', upload.single('image'), async (req, res) => {
    const {
        type, prefix
    } = req.params;
    const{
        buffer: image
    } = req.file
    const {
        kode
    } = req.body;
    try {
        let check = await sqliteHelper.getData({
            column: [`KODE_${prefix}`,'IMAGE'],
            table: `T_${type}`,
            condition: `WHERE KODE_${prefix} = '${kode}'`           
        })

        if (check.length < 1) {
            await sqliteHelper.insertData({
                columns: [`KODE_${prefix}`,'IMAGE'],
                table: `T_${type}`,
                values: [kode, image]
            })
            res.status(200).json({
                code: 'IMG-001-001',
                message: 'image not found, added image successfully'
            });
        } else {
            await sqliteHelper.updateData({
                table: `T_${type}`,
                column: ['IMAGE'],
                values: [image],
                condition: `WHERE KODE_${prefix} = '${kode}'`
            })
            res.status(200).json({
                code: 'IMG-001-002',
                message: 'update image successfully'
            });
        }

        
        
    } catch (error) {
        console.error('Failed to update image:', error);
        res.status(409).json({
            code: 'IMG-001-003',
            error: 'Failed to update image'
        });
    }
})


app.post('/revise/data/gejala', async (req, res) => {
    const {data} = req.body;
    try {
        let dataDB = await uploadRevise.reviseGejala({
            gejala: data.gejala,
            bobot: data.bobot
        })
        if(dataDB == 'DUPLICATE DATA'){
            res.status(409).json({
                error: 'DUPLICATE DATA'
            })
        }
        let result = await sqliteHelper.getData({
            table: 'T_GEJALA',
            column: ['KODE', 'GEJALA'],
            condition: 'ORDER BY CAST(SUBSTR(KODE, 2) AS INTEGER) DESC;'
        })
        res.status(200).json({
            data: result[0],
            message: 'add data successfully'
        });
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(409).json({
            error: 'Failed to add data'
        });
    }
})

app.post('/revise/data/penyakit', async (req, res) => {
    const {data} = req.body;
    try {
        await uploadRevise.revisePenyakit({
            penyakit: data.penyakit
        })
        let result = await sqliteHelper.getData({
            table: 'T_PENYAKIT',
            column: ['KODE', 'PENYAKIT'],
            condition: 'ORDER BY CAST(SUBSTR(KODE, 2) AS INTEGER) DESC;'
        })
        res.status(200).json({
            data: result[0],
            message: 'update data successfully'
        });
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(409).json({
            error: 'Failed to update data'
        });
    }
})

app.post('/revise/data/solusi', async (req, res) => {
    const {data} = req.body;
    try {
        let result = await uploadRevise.reviseSolusi({
            kode_penyakit: data.kode_penyakit,
            kode_gejala: data.kode_gejala.replace(/,([^ ])/g, ', $1'),
            bobot_penyakit: data.bobot_gejala,
            bobot_total: data.bobot_total,
            solusi: data.solusi
        })
        
        res.status(200).json({
            data: result[0],
            message: 'update data successfully'
        });
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(409).json({
            error: 'Failed to update data'
        });
    }
})

app.put('/update/data/:type', async (req, res) => {
    const {data} = req.body;
    const {type} = req.params;
    try {
        if(type == 'SOLUSI'){
            await sqliteHelper.updateData({
                table: `T_${type}`,
                column: data.column,
                values: data.values,
                condition: `WHERE KODE_SOLUSI = '${data.kode}'`
            })
        } else {
            await sqliteHelper.updateData({
                table: `T_${type}`,
                column: data.column,
                values: data.values,
                condition: `WHERE KODE = '${data.kode}'`
            })
        }
        
        res.status(200).json({
            message: 'update data successfully'
        });
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(409).json({
            error: 'Failed to update data'
        });
    }
})

app.delete('/delete/data/:type/:kode', async (req, res) => {
    const {type, kode} = req.params
    let data;
    try {
        if(type == 'SOLUSI'){
            data = await sqliteHelper.deleteData({
                table: `T_${type}`,
                kode: kode,
                column: 'KODE_SOLUSI'
            })
        } else {
            data = await sqliteHelper.deleteData({
                table: `T_${type}`,
                kode: kode,
                column: 'KODE'
            })
        }
        if (data === 'Rows deleted: 0') {
            return res.status(404).json({
                error: 'data not found'
            });
        }
        res.status(200).json({
            message: 'data deleted successfully'
        });
    } catch (error) {
        res.status(200).json({
            error: 'Failed to delete data'
        });
    }
})




let port = 9999;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});