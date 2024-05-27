import getDataDBInstance from "../data/get_data_db.mjs";


class Similarity {
    async getKasus({list, data, kode, index}) {
        let sameCase = [];
        let sBobot = [];
        
        // s = data.map(item => list.includes(item) ? 1 : 0);
        data.forEach(item => {
            if (list.includes(item)) {
                sameCase.push(item);
                sBobot.push(1)
            } else {
                sBobot.push(0);
            }
        })
        return {
            sameCase: sameCase,
            sBobot: sBobot,
            kode: kode[index]
        };
    }

    async getKemiripanGejala({requestKodeGejala}) {
        let data = await getDataDBInstance.getKodeGejala();
        let result = [];
        console.log(data.listKodeSolusi);
        
        for (let i = 0; i < data.listDataKodeGejala.length; i++) {
            let a = await this.getKasus({
                list: requestKodeGejala,
                data: data.listDataKodeGejala[i],
                kode: data.listKodeSolusi,
                index: i
            });
            result.push(a);
        }
        return result;
    }
}

const similarityInstance = new Similarity();
export default similarityInstance;