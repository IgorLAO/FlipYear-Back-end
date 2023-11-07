import config from "./db_connection.js";

export async function SelectAllPed() {
    const sql = `   SELECT          
                        NM_PEDIDO           AS Pedido,
                        NM_CATEGORIA        AS Categoria,
                        DT_PEDIDO           AS Data,
                        DS_SITUACAO         AS Situacao
                        FROM PEDIDO_TB		AS P
                    INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA`;
    const [resp] = await config.query(sql, []);
   
    return resp;
}