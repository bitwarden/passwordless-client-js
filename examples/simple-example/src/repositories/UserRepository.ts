import { v4 as uuidv4 } from 'uuid';
import sqlite3 from 'sqlite3';

export default class UserRepository {
    private _db: sqlite3.Database;

    constructor() {
        this._db = new sqlite3.Database('your-backend.db', (err): void => {
            if (err) {
                console.error('Error connecting to the database:', err);
            } else {
                console.log('Connected to SQLite database.');
            }
        });
        this._db.run('CREATE TABLE IF NOT EXISTS users (id TEXT constraint users_pk primary key, username text constraint users_pk2 unique);');
    }

    create = (username: string): Promise<string> => {
        return new Promise((resolve, reject): void => {
            const id: string = uuidv4();

            const sql: string = `INSERT INTO users (id, username) VALUES (?, ?)`;

            this._db.run(sql, [id, username], (err): void => {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                } else {
                    console.log('User inserted successfully!');
                    resolve(id);
                }
            });
        });
    }

    get(userId: string) {
        const sql: string = `SELECT * FROM users WHERE id = ?`
        this._db.get(sql, [userId], (err, user) => {
            if (err) {
                console.error(err.message);
                return;
            }
            return user;
        });
    }

    close(): void {
        this._db.close();
    }
}
