import config from "../DB/db_connection.js";

export async function ListClientes() {
    let sql = `	select *
                    
                        from clientes_tb			 AS C_TB
                INNER JOIN ENDERECOS_TB AS E_TB ON E_TB.ID_ENDERECO= C_TB.ID_ENDERECO`;
    let [resp] = await config.query(sql)
    return resp
};

export async function InsertClientes(C) {
    let sql = `INSERT INTO CLIENTES_TB  (ID_ENDERECO, NM_CLIENTE, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA)
                                        VALUES (?, ?, ?, ?, ?, ?)`;
    let [resp] = await config.query(sql, [  C.id_endereco, 
                                            C.Nome, 
                                            C.Telefone, 
                                            C.CPF, 
                                            C.Email, 
                                            C.Senha]);
    return resp
};