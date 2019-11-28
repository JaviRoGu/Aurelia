const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
};

const insert = ({username, first_name, last_name, telegram_id}) => {
    console.log(username, first_name, last_name, telegram_id);
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (username, first_name, last_name, telegram_id) values (?, ?, ?, ?)', [username, first_name, last_name, telegram_id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

const getById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where telegram_id = ?', [pUsuarioId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) {
                resolve(rows[0]);
            } else {
                resolve(null)
            }
        });
    });
}




module.exports = {
    getAll: getAll,  
    insert: insert,
    getById: getById,
}