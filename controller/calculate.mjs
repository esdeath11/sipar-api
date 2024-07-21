import sqliteHelper from "../helper/sqlite3_helper.mjs";
import similarityInstance from "./similiarity.mjs";
import solusiInstance from "./solusi.mjs";

class Calculate {

    // similiarity = ((s1 * w1) + (s2 * w2) + ... + (sn * wn))/(k1 + k2  + ... + kn)

    calculateWeightedAverage({scores, weights, factors}) {
        if (scores.length !== weights.length || scores.length !== factors.length) {
            throw new Error("The length of scores, weights, and factors must be the same.");
        }
    
        let totalWeightedScore = 0;
        let totalFactors = 0;
    
        for (let i = 0; i < scores.length; i++) {
            totalWeightedScore += parseInt(scores[i]) * parseInt(weights[i]);
            totalFactors += parseInt(factors[i]);
        }
    
        if (totalFactors === 0) {
            throw new Error("The sum of factors must not be zero.");
        }
        console.log(`${totalWeightedScore} / ${totalFactors}`)
        return totalWeightedScore / totalFactors;
    }


    async similiarityCalculate({kodeKasus}){
        try {
        let a = [];
        
        let listSolusi = await solusiInstance.getAll();
        // console.log('im here', listSolusi)
        let dataKemiripan = await similarityInstance.getKemiripanGejala({
            requestKodeGejala: kodeKasus
        });
        // console.log('im here 2', dataKemiripan)
        for (let i = 0; i < listSolusi.length; i++) {
            let result = this.calculateWeightedAverage({
                scores: dataKemiripan[i].sBobot,
                weights: listSolusi[i].BOBOT_PENYAKIT.split(', '),
                factors: listSolusi[i].BOBOT_PENYAKIT.split(', ')
            })
            // console.log('im here 3', result)
            // console.log(result * 100);
            let value = result * 100;
            let obj = {
                kode_solusi: dataKemiripan[i].kode,
                score: Number(value.toFixed(2))
            }
            console.log('im here 4', obj)
            a.push(obj);
            
        }
        console.log('im here 5', a)
        a.sort((c, b) => b.score - c.score)
        
        return a.slice(0, 3);
        } catch (error) {
            throw new Error(error);
        }

    }

}

const calculateInstance = new Calculate();
export default calculateInstance;
