import config from "../DB/db_connection.js";

export async function getUsers(Tier) {
    let sql = `	SELECT *
                      FROM USERS_TB	        AS C_TB
                INNER JOIN ENDERECOS_TB     AS E_TB 
                                            ON E_TB.ID_ENDERECO= C_TB.ID_ENDERECO`;
    let [resp] = await config.query(sql)
    return resp
};

export async function InsertClientes(C) {
    let sql = `INSERT INTO USERS_TB  (ID_ENDERECO, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
                                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let [resp] = await config.query(sql, [ C.id_endereco, 
                                           C.Nome, 
                                           C.Telefone, 
                                           C.CPF, 
                                           C.Email, 
                                           C.Senha,
                                           C.Tier]);
                                         
    return resp
};

export async function Login(Email, Senha) {
    let sql = ` SELECT ID_USUARIO,
                       NM_USUARIO    AS Nome,
                       DS_EMAIL      AS Email,
                       DS_TIER       AS Tier   
                FROM   USERS_TB     
                WHERE  DS_EMAIL      = ?
                AND    DS_SENHA      = ?`;

    const [resp] = await config.query(sql, [Email, Senha]);
    return resp[0]
}

export async function SearchUser(search){
    let sql = `SELECT *
                         FROM USERS_TB
                WHERE NM_USUARIO  LIKE ? 
                      OR DS_CPF   LIKE ?
                      OR DS_EMAIL LIKE?`
    let [resp] = await config.query(sql, [`% ${search} % `,
                                          `% ${search} % `,
                                          `% ${search} % `])
}