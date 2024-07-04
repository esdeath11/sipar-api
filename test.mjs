// import sqliteHelper from "./helper/sqlite3_helper.mjs";

import calculateInstance from "./controller/calculate.mjs";
import similarityInstance from "./controller/similiarity.mjs";
import solusiInstance from "./controller/solusi.mjs";
import getDataDBInstance from "./data/get_data_db.mjs";
import sqliteHelper from "./helper/sqlite3_helper.mjs";


// let data = await sqliteHelper.getData({
//     column: [
//         'KODE_SOLUSI', 
//         'KODE_PENYAKIT', 
//         'KODE_GEJALA', 
//         'BOBOT_PENYAKIT', 
//         'BOBOT_TOTAL',
//         'SOLUSI'
//     ],
//     table: 'T_SOLUSI',
//     condition: ''
// })
// let sol = data;
// let dataLama;
// let kasus = ['G01', 'G03','G11', 'G15'];
// let listDataLama = [];
// for (let i = 0; i < sol.length; i++) {
//     dataLama = sol[i].KODE_GEJALA.split(', ');
//     listDataLama.push(dataLama);
// }
// // console.log(listDataLama);

// function getKasus(list, data) {
//     let sameCase = [];
//     list.forEach(item => {
//         if(data.includes(item)){
//             sameCase.push(item)
//         }
//     })
//     return sameCase;
// }

// let b = [];
// for (let x = 0; x < sol.length; x++) {
//     let a = getKasus(kasus, sol[x].KODE_GEJALA.split(', '))
//     b.push(a);
// }


// console.log(b);
// let kasus = ['G13', 'G14', 'G17'];
// let result = await calculateInstance.similiarityCalculate({kodeKasus: kasus});
// console.log(result);
// console.log(Object.values(kasus));



// let listSolusi = await solusiInstance.getAll();
// // console.log(listSolusi);
// let dataKemiripan = await similarityInstance.getKemiripanGejala({
//     requestKodeGejala: kasus
// })
// console.log(dataKemiripan)
// for (let i = 0; i < listSolusi.length; i++) {
//     let result = calculateInstance.calculateWeightedAverage({
//         scores: dataKemiripan[i].sBobot,
//         weights: listSolusi[i].BOBOT_PENYAKIT.split(', '),
//         factors: listSolusi[i].BOBOT_PENYAKIT.split(', ')
//     })
//     console.log(result * 100);
// }

// let result = calculateInstance.calculateWeightedAverage({
//     scores: dataKemiripan[3].sBobot,
//     weights: listSolusi[3].BOBOT_PENYAKIT.split(', '),
//     factors: listSolusi[3].BOBOT_PENYAKIT.split(', ')
// })
// console.log(result * 100);

// console.log(dataKemiripan);

// let data = await getDataDBInstance.getBobotGejala('G01', 'G04');
// console.log(data);

// console.log(listSolusi[0].KODE_GEJALA.split(', '));

// let cal = calculateInstance.calculateTotal()


// let result = solusiInstance.inputNewSolusi({
//     penyakit: "",
//     gejala: ["Daun Menguning", "Daun Keriting"]
// });

let data = await sqliteHelper.getData({
    table: 'T_GEJALA',
    column: ['KODE'],
    condition: 'ORDER BY CAST(SUBSTR(KODE, 2) AS INTEGER) DESC;'
})
let kode = parseInt(data[0].KODE.slice(1)) + 1;
console.log(kode);