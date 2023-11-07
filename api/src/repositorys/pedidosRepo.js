import config from "./db_connection.js";

export async function ListPedido(){
    const sql = `SELECT ID_PEDIDO       AS Id,
                        ID_USUARIO		AS IdUser,
                        ID_ENDERECO		AS IdEndereco,
                        ID_FORMA_PAG	AS FormaPag,
                        NM_PEDIDO       AS Pedido,
                        DS_NOTA_FISCAL  AS Nota,
                        QTD_PARCELAS    AS PARCELAS,
                        DT_PEDIDO	    AS DataPedido,
                        DS_SITUACAO	    AS Situacao
                 FROM PEDIDO_TB`;

    let [resp] = await config.query(sql);
    return resp
}

export async function UpdtPedido(situacao, id){
    const sql = `UPDATE PEDIDO_TB
                    SET DS_SITUACAO = ?
                 WHERE ID_PEDIDO    = ?`;

    let [resp] = await config.query(sql, [situacao, id]);
    return resp

}