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
}

const penyakitInstance = new Penyakit();
export default penyakitInstance;