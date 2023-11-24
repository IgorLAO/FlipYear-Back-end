import config from "./db_connection.js";


export async function ListPedido() {
    const sql = `SELECT ID_PEDIDO       AS Id,
                        ID_USUARIO		AS IdUser,
                        ID_ENDERECO		AS IdEndereco,
                        ID_FORMA_PAG	AS FormaPag,
                        NM_CATEGORIA    AS Categoria,
                        NM_PEDIDO       AS Pedido,
                        DS_NOTA_FISCAL  AS Nota,
                        QTD_PARCELAS    AS PARCELAS,
                        DT_PEDIDO	    AS DataPedido,
                        DS_SITUACAO	    AS Situacao
                 FROM PEDIDO_TB		    AS P
                INNER JOIN CATEGORIA_TB	AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA`;

    let [resp] = await config.query(sql);
    return resp
}

export async function ListPedidoInterval(Start, End) {
    const sql = `SELECT ID_PEDIDO       AS Id,
                        ID_USUARIO		AS IdUser,
                        ID_ENDERECO		AS IdEndereco,
                        ID_FORMA_PAG	AS FormaPag,
                        NM_PEDIDO       AS Pedido,
                        DS_NOTA_FISCAL  AS Nota,
                        QTD_PARCELAS    AS PARCELAS,
                        DT_PEDIDO	    AS DataPedido,
                        DS_SITUACAO	    AS Situacao
                 FROM PEDIDO_TB		    AS P
                INNER JOIN CATEGORIA_TB	AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                WHERE DT_PEDIDO BETWEEN ? AND ?`;
    let [resp] = await config.query(sql, [Start, End]);
    return resp
}


export async function PedidoSituacao(situacao, id) {
    const sql = `UPDATE PEDIDO_TB
                SET DS_SITUACAO = ?
            WHERE ID_PEDIDO    =  ?`

    const [resp] = await config.query(sql, [situacao, id]);
    return resp.affectedRows;
}

//PEDIDO ITEM
export async function InserirPedidoItem(pedido){
    const resp = `
    INSERT INTO PEDIDO_TB (ID_USUARIO, ID_CATEGORIA, ID_ENDERECO, ID_FORMA_PAG, NM_PEDIDO, DS_NOTA_FISCAL, QTD_PARCELAS, DT_PEDIDO, DS_SITUACAO)
    VALUES (?, ?, ?, ?, ?,?, ?, ?, ?) `

    const [linhas] = await config.query(resp,[
        pedido.User,
        pedido.Idcategoria,
        pedido.endereco,
        pedido.pagamento,
        pedido.pedido,
        pedido.notaFiscal,
        pedido.parcelas,
        pedido.data,
        pedido.situacao
    ]);

    return linhas
}

export async function FormaPag(pedido){
    const resp = `
    INSERT INTO FORMA_PAG (NM_FORMA_PAG)
        VALUES(?);
    `
    const [linhas] = await config.query(resp,[pedido.pagamento]);
    return linhas;
}