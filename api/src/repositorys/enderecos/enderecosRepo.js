import config from "../DB/db_connection.js";


export async function ListEnderecos(){
    let sql = `SELECT * 
                    FROM ENDERECO_TB`
    let [resp] = await config.query(sql)
    return resp
}

export async function InsertEnderecos(E) {
    let sql = `INSERT INTO ENDERECO_TB (DS_CEP, NM_CIDADE, NM_RUA, DS_COMPLEMENTO, NR_NUMERO)
                                        VALUES(?, ?, ?, ?, ?)`;
    let [resp] = await config.query(sql, [E.CEP, E.Cidade, E.Rua, E.Complemento, E.Numero])
    return [resp]
}