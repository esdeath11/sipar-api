import sqliteHelper from "../helper/sqlite3_helper.mjs";

class GetDataDB {
    async getKodeGejala(){
        let listDataKodeGejala = [];
        let listBobotGejala = [];
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

        for (let i = 0; i < db.length; i++) {
            listDataKodeGejala.push(db[i].KODE_GEJALA.split(', '));
        }

        return listDataKodeGejala;
    }

    filterHelper(list, ...kode){
        console.log(kode);
        return list.filter(item => kode[0].includes(item.KODE))
    }

    async getBobotGejala(...kode){
        let db = await sqliteHelper.getData({
            table: 'T_GEJALA',
            column: [
                'KODE',
                'GEJALA',
                'BOBOT'
            ],
            condition: ''
        })

        let result = this.filterHelper(db, kode);

        
        return result;
    }


}

const getDataDBInstance = new GetDataDB();
export default getDataDBInstance;