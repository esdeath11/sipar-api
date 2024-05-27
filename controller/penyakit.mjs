import sqliteHelper from "../helper/sqlite3_helper.mjs";

class Penyakit {
    async getAll(){
        let db = await sqliteHelper.getData({
            column: [
                'KODE',
                'PENYAKIT'
            ],
            table: 'T_PENYAKIT',
            condition: ''
        });
        return db;
    }

    async getDetail({kode}){
        let db = await sqliteHelper.getData({
            column: [
                'KODE',
                'PENYAKIT'
            ],
            table: 'T_PENYAKIT',
            condition: `WHERE KODE = '${kode}'`
        });
        return db;
    }
}

const penyakitInstance = new Penyakit();
export default penyakitInstance;