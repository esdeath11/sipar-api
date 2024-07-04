// createTable.js
import sqlite3 from 'sqlite3';




// Open a database connection
const db = new sqlite3.Database('./mydatabase.db');

// Define the SQL statement to create a table
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS T_SOLUSI (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     KODE_SOLUSI TEXT,
//     KODE_PENYAKIT TEXT,
//     KODE_GEJALA TEXT,
//     BOBOT_PENYAKIT TEXT,
//     BOBOT_TOTAL INTEGER,
//     SOLUSI TEXT
//   )
// `;

// Execute the SQL statement to create the table
// db.serialize(() => {
//   db.run(createTableQuery, (err) => {
//     if (err) {
//       console.error('Error creating table:', err.message);
//     } else {
//       console.log('Table created successfully.');
//     }
//   });
// });

// // Close the database connection
// db.close((err) => {
//   if (err) {
//     console.error('Error closing database connection:', err.message);
//   } else {
//     console.log('Database connection closed.');
//   }
// });

let query = `CREATE TABLE IF NOT EXISTS T_IMAGE_PENYAKIT (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      KODE_PENYAKIT TEXT NOT NULL,
      IMAGE BLOB NOT NULL
    )`
let data;
db.all(query, (err, rows) => {
    console.log(rows);
    data = rows;
})


db.close();
