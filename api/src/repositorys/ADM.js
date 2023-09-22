import config from "./DB/db_connection.js";

export async function getADM() {
    let sql = `SELECT * 
            FROM ADMS_TB`;
    const [resp] = await config.query(sql)
    return resp
};