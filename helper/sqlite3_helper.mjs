import sqlite3 from 'sqlite3';

class SqliteHelper {
    result;
    async getData({column = [], table, condition}){
        
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
}

const sqliteHelper = new SqliteHelper();
export default sqliteHelper;