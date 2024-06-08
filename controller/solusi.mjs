import getDataDBInstance from "../data/get_data_db.mjs";
import sqliteHelper from "../helper/sqlite3_helper.mjs";
import gejalaInstance from "./gejala.mjs";

class Solusi {
    async getAll(){
        let db = await sqliteHelper.getData({
            column: [
                'KODE_SOLUSI', 
                'KODE_PENYAKIT', 
                'KODE_GEJALA', 
                'BOBOT_PENYAKIT', 
                'BOBOT_TOTAL',
                'SOLUSI'
            ],
            table: 'T_SOLUSI',
            condition: ''
        });
        
        return db;
    }

    async getDetail({kode}){
        let db = await sqliteHelper.getData({
            column: [
                'KODE_SOLUSI', 
                'KODE_PENYAKIT', 
                'KODE_GEJALA', 
                'BOBOT_PENYAKIT', 
                'BOBOT_TOTAL',
                'SOLUSI'
            ],
            table: 'T_SOLUSI',
            condition: `WHERE KODE_SOLUSI = '${kode}'`
        });
        
        return db;
    }

    // async inputNewSolusi({kodePenyakit, kodeGejala}){
    //     let dataGejala = await gejalaInstance.getAll();
    //     let bobot = [];
    //     for (let i = 0; i < dataGejala.length; i++) {
            
            
    //     }

    // }

}

const solusiInstance = new Solusi();
export default solusiInstance