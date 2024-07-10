let listGejala = ['G01', 'G03', 'G05', 'G06']
let bobotGejala = [1,3,3,2]
let solusi = {
    penyakit : 'P01',
    gejala: ['G01', 'G03', 'G04', 'G06'],
    bobot: [1,3,2,2],
    totalBobot: 8,
    solusi: 'lorem ipsum  si dolor'
}


// rumus 
// let s; // true or false dimana gejala yang di input ada di solusi, misal G01 ada di solusi, berarti s = 1, jika G01 tidak ada maka s = 0
// let w; // ini adalah bobot
// let k; // ini adalah total keseluruhan bobot yang ada di solusi
// let hasil;

// let up = (s[0] * w[0]) + (s[1] * w[1]) + '...' + (s[n] * w[n])
// let down = k[0] + k[1] + '...' + k[n]

// hasil = up/down * 100


// let k = solusi.bobot.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
// let up;
// for (let x = 0; x < gejala[i].length; x++) {
//     up += s[x] * w[x]
// }

// let hasil = up/k * 100




// rumus ini menghitung setiap solusi yang ada
// jika ada 5 solusi, maka semua solusi dihitung dengan rumus diatas satu persatu dan menghasilkan persentase kemiripan
// jika sudah dihitung maka akan menampilkan 3 persentase terdekat atau mirip 