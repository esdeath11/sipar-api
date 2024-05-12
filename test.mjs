// import sqliteHelper from "./helper/sqlite3_helper.mjs";

import similarityInstance from "./controller/similiarity.mjs";
import getDataDBInstance from "./data/get_data_db.mjs";


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
// let kasus = ['G01', 'G03','G11', 'G15'];
// let data = await similarityInstance.getKemiripanGejala({
//     requestKodeGejala: kasus
// })
// console.log(data);

let data = await getDataDBInstance.getBobotGejala('G01', 'G04');
console.log(data);