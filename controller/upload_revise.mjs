import sqliteHelper from "../helper/sqlite3_helper.mjs";

class UploadRevise {
    async reviseGejala({gejala, bobot}){
        let result;
        let data = await sqliteHelper.getData({
            table: 'T_GEJALA',
            column: ['KODE', 'GEJALA'],
            condition: 'ORDER BY CAST(SUBSTR(KODE, 2) AS INTEGER) DESC'
        })

        let kode = parseInt(data[0].KODE.slice(1)) < 9 ? `G0${parseInt(data[0].KODE.slice(1)) + 1}` : `G${parseInt(data[0].KODE.slice(1)) + 1}`
        data.map(item => {
            if(item.GEJALA.toLowerCase() == gejala.toLowerCase()){
                // result = 'DUPLICATE DATA'
                throw new Error('DUPLICATE DATA')
            }
        })
        // return result
        // values.push(kode);
        await sqliteHelper.insertData({
            table: 'T_GEJALA',
            columns: ['KODE', 'GEJALA', 'BOBOT'],
            values: [kode, gejala, bobot]
        })
    }

    async revisePenyakit({penyakit}){
        let data = await sqliteHelper.getData({
            table: 'T_PENYAKIT',
            column: ['KODE', 'PENYAKIT'],
            condition: 'ORDER BY CAST(SUBSTR(KODE, 2) AS INTEGER) DESC'
        })

        let kode = parseInt(data[0].KODE.slice(1)) < 9 ? `P0${parseInt(data[0].KODE.slice(1)) + 1}` : `P${parseInt(data[0].KODE.slice(1)) + 1}`
        data.map(item => {
            if(item.PENYAKIT.toLowerCase() == penyakit.toLowerCase()){
                // result = 'DUPLICATE DATA'
                throw new Error('DUPLICATE DATA')
            }
        })
        // values.push(kode);
        await sqliteHelper.insertData({
            table: 'T_PENYAKIT',
            columns: ['KODE', 'PENYAKIT'],
            values: [kode, penyakit]
        })
    }

    async reviseSolusi({kode_penyakit, kode_gejala = [], bobot_penyakit, bobot_total, solusi}){
        let data = await sqliteHelper.getData({
            table: 'T_SOLUSI',
            column: ['KODE_SOLUSI', 'KODE_GEJALA'],
            condition: 'ORDER BY CAST(SUBSTR(KODE_SOLUSI, 2) AS INTEGER) DESC'
        })
        let kode = parseInt(data[0].KODE_SOLUSI.slice(1)) < 9 ? `S0${parseInt(data[0].KODE_SOLUSI.slice(1)) + 1}` : `S${parseInt(data[0].KODE_SOLUSI.slice(1)) + 1}`
        // values.push(kode);
        console.log(data);
        let result;
        let status = false
        let kodeSolusi;
        data.map(item => {
            if(item.KODE_GEJALA == kode_gejala){
                status = true
                kodeSolusi = item.KODE_SOLUSI
            }
        })

        if(status){
            await sqliteHelper.updateData({
                table: 'T_SOLUSI',
                column: ['SOLUSI'],
                values: [solusi],
                condition: `WHERE KODE_SOLUSI = '${kodeSolusi}'`
            })
            result = await sqliteHelper.getData({
                table: 'T_SOLUSI',
                column: ['KODE_SOLUSI', 'KODE_PENYAKIT', 'KODE_GEJALA', 'BOBOT_PENYAKIT','SOLUSI'],
                condition: `WHERE KODE_SOLUSI = '${kodeSolusi}'`
            })
        } else {
            await sqliteHelper.insertData({
                table: 'T_SOLUSI',
                columns: ['KODE_SOLUSI', 'KODE_PENYAKIT', 'KODE_GEJALA', 'BOBOT_PENYAKIT', 'BOBOT_TOTAL', 'SOLUSI'],
                values: [kode, kode_penyakit, kode_gejala, bobot_penyakit, bobot_total, solusi]
            })
            result = await sqliteHelper.getData({
                table: 'T_SOLUSI',
                column: ['KODE_SOLUSI', 'KODE_PENYAKIT', 'KODE_GEJALA', 'BOBOT_PENYAKIT','SOLUSI'],
                condition: 'ORDER BY CAST(SUBSTR(KODE_SOLUSI, 2) AS INTEGER) DESC;'
            })
        }
        

        
        return result;
        

        
    }
}

const uploadRevise = new UploadRevise();
export default uploadRevise;