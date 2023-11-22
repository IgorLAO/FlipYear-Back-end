import config from "./db_connection.js";

export async function ListComments(qtd, offset){
    const sql = `select US_TB.ID_USUARIO 							AS ID,
    ID_PRODUTO                          AS PRODUTO,
    NM_USUARIO 							AS NOME,
    DS_COMENTARIO 						AS COMENTARIO,
    DT_COMENTARIO						AS PUBLICACAO,
    QTD_LIKES							AS LIKES,
    BT_DENUNCIA                         AS DENUNCIA
FROM COMENTARIOS_TB 						AS C_TB
INNER JOIN USERS_TB AS US_TB
                 ON US_TB.ID_USUARIO = C_TB.ID_USUARIO
ORDER BY DT_COMENTARIO DESC
LIMIT ?
OFFSET ?;`

    const [resp] = await config.query(sql, [qtd, offset])
    return resp;
}

export async function DeleteComment(id){
    const sql = `delete from comentarios_tb
    where id_comentario = ?;`

    const [resp] = await config.query(sql, [id])
    return resp.affectedRows;
}

export async function InsertComment(C){
    const sql = `INSERT INTO COMENTARIOS_TB (ID_USUARIO, ID_PRODUTO,  DS_COMENTARIO, DT_COMENTARIO, QTD_LIKES, BT_DENUNCIA)
    VALUES (?, ?, ?, ?, ?, ?); `

    const [resp] = await config.query(sql,[C.idUsuario,
                                           C.idProduto,
                                           C.comentario,
                                           C.data,
                                           C.likes,
                                           C.denuncia])
    return resp;
}

