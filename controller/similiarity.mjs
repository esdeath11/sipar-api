import getDataDBInstance from "../data/get_data_db.mjs";


class Similarity {
    async getKasus({list, data}) {
        let sameCase = [];
        list.forEach(item => {
            if (data.includes(item)) {
                sameCase.push(item)
            }
        })
        return sameCase;
    }

    async getKemiripanGejala({requestKodeGejala}) {
        let data = await getDataDBInstance.getKodeGejala();
        let result = [];
        // console.log(data);
        
        for (let i = 0; i < data.length; i++) {
            let a = await this.getKasus({
                list: requestKodeGejala,
                data: data[i]
            });
            result.push(a);
        }
        return result;
    }
}

const similarityInstance = new Similarity();
export default similarityInstance;