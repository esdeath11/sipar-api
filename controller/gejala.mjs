import sqliteHelper from "../helper/sqlite3_helper.mjs";

class Gejala {
    async getAll(){
        let db = await sqliteHelper.getData({
            column: [
                'KODE',
                'GEJALA',
                'BOBOT'
            ],
            table: 'T_GEJALA',
            condition: ''
        });
        return db;
    }

    async getDetail({kode}){
        let db = await sqliteHelper.getData({
            column: [
                'KODE',
                'GEJALA',
                'BOBOT'
            ],
            table: 'T_GEJALA',
            condition: `WHERE KODE = '${kode}' `
        });
        console.log(db);
        return db;
    }
}

const gejalaInstance = new Gejala();
export default gejalaInstance;