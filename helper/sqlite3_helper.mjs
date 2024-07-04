import sqlite3 from 'sqlite3';

class SqliteHelper {
    result;
    async getData({
        column = [],
        table,
        condition
    }) {

        let joinColumn = column.join(', ');
        let query = `SELECT ${joinColumn} FROM ${table} ${condition}`;
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('mydatabase.db');
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
            db.close();
        })
    }

    async insertData({
        columns = [],
        table,
        values = []
    }) {
        const joinColumn = columns.join(', ');
        console.log(joinColumn);
        const placeholders = values.map(() => '?').join(', '); // Create placeholders for values
        const query = `INSERT INTO ${table} (${joinColumn}) VALUES (${placeholders})`;

        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('mydatabase.db', (err) => {
                if (err) {
                    console.error('Error opening database', err);
                    reject(err);
                } else {
                    db.run(query, values, function (err) {
                        if (err) {
                            console.error('Error executing query', err);
                            reject(err);
                        } else {
                            console.log(`Rows inserted: ${this.changes}`);
                            resolve(`Rows inserted: ${this.changes}`);
                        }
                        db.close(); // Close the database connection
                    });
                }
            });
        });
    }

    async deleteData({
        table,
        kode,
        column
    }) {
        let query = `DELETE FROM ${table} WHERE ${column} = ?`;
        console.log(query);
        return new Promise((resolve, reject) => {
            
            const db = new sqlite3.Database('mydatabase.db');
            db.run(query, [kode], function (err) {
                if (err) {
                    console.error('Error deleting data:', err.message);
                    reject(err);
                } else {
                    console.log(`Rows deleted: ${this.changes}`);
                    resolve(`Rows deleted: ${this.changes}`);
                }
                db.close(); // Close the database connection
            });
        });
    }
}

const sqliteHelper = new SqliteHelper();
export default sqliteHelper;