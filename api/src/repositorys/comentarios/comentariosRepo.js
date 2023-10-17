import config from "../DB/db_connection.js";

export async function ListComments(qtd, offset){
    const sql = `select US_TB.ID_USUARIO 							AS ID,
    NM_USUARIO 							AS NOME,
    DS_COMENTARIO 						AS COMENTÁRIO,
    DT_COMENTARIO						AS PUBLICAÇÃO,
    QTD_LIKES							AS LIKES
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

