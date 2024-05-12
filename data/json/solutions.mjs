class Solutions {

    S01 = {
        penyakit: {
            kode: 'P01',
            nama: 'Tripis (Thrips Parvispinus)'
        },
        data: {
            gejala: ['G03', 'G11', 'G12', 'G16'],
            bobot: [1, 4, 4, 1],
            solusi: {
                'sol1': 'Menggunakan tanaman perangkap seperti kenikir kuning.',
                'sol2': 'Menggunakan tanaman perangkap seperti kenikir kuning.',
                'sol3': 'Pemanfaatan musuh alami yang potensial untuk mengendalikan hama thrips, antara lain predator kumbang Coccinellidae, tungau, predator larva Chrysopidae, kepik Anthocoridae dan patogen Entomophthora sp'
            }
        }

    }

    S02 = {
        penyakit: {
            kode: 'P02',
            nama: 'Lalat Buah (Bactrocera sp)'
        },
        data: {
            gejala: ['G01', 'G06', 'G11', 'G13'],
            bobot: [1, 2, 4, 2],
            solusi: {
                'sol1': 'Pemusnahan buah terserang',
                'sol2': 'Pembungkusan buah',
                'sol3': 'Pemanfaatan musuh alami antara lain parasitoid larva dan pupa (Biosteres sp, Opius sp), predator semut, Arachnidae (laba - laba), Staphylinidae (kumbang) dan Dermatera (Cecopet).'
            }
        }
    }

    S03 = {
        penyakit: {
            kode: 'P03',
            nama: 'Ulat Grayak'
        },
        data: {
            gejala: ['G01', 'G13', 'G17'],
            bobot: [1, 2, 3],
            solusi: {
                'sol1': 'Penggunaan pestisida nabati, yang bahan aktifnya berasal dari tanaman dan memiliki sifat toksik terhadap hama seperti Pepaya.',
            }
        }
    }
}

const solutions = new Solutions();
export default solutions;