import config from './db_connection.js';

export async function ListProd(qtd, offset) {
    const sql = `SELECT	*
                  FROM PRODUTO_TB 		    AS P 
            INNER JOIN CATEGORIA_TB		    AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                 ORDER BY nm_produto
                 LIMIT ?
                OFFSET ? `;
    let [resp] = await config.query(sql, [qtd, offset])
    return resp
}

export async function ListAllProd() {
    const sql = `SELECT	*
                    FROM PRODUTO_TB 		    AS P 
                INNER JOIN CATEGORIA_TB		    AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                    ORDER BY nm_produto`
    const [resp] = await config.query(sql)
    return resp;
}

export async function InsertProdutos(produto) {
    const resp = `
    INSERT INTO PRODUTO_TB  (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONAL, BT_DESTAQUE, BT_PROMOCAO, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES, VL_AVALIACAO, NM_FABRICANTE, TP_ESTADO, TP_COLECIONADOR)
       VALUES(? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `

    const [linhas] = await config.query(resp, [
        produto.categoria,
        produto.img,
        produto.nome,
        produto.preco,
        produto.precoPromocao,
        produto.destaque,
        produto.promocao,
        produto.disponivel,
        produto.estoque,
        produto.detalhes,
        produto.avaliacao,
        produto.fabricante,
        produto.estado,
        produto.colecionador
    ]);

    produto.id = linhas.insertId
    return resp[0];
}


export async function RemoverProdutos(id) {
    const comando = `
    
    DELETE FROM PRODUTO_TB
        WHERE ID_PRODUTO = ? `

    const [resp] = await config.query(comando, [id]);
    return resp.affectedRows;
}


export async function SearchProd(search) {
    const sql = `  SELECT 
                            NM_PRODUTO			 	AS Nome, 
                            VL_PRECO			 	AS Preco, 
                            VL_PRECO_PROMOCIONAL 	AS Promo, 
                            BT_DESTAQUE				AS Destaque, 
                            BT_PROMOCAO				AS IsPromo, 
                            BT_DISPONIVEL			AS IsDisponivel, 
                            QTD_ESTOQUE				AS Qtd_estq, 
                            DS_DETALHES				AS Detalhes, 
                            VL_AVALIACAO			AS Avaliacao,	 
                            NM_FABRICANTE			AS Fabricante, 
                            TP_ESTADO				AS Estado, 
                            TP_COLECIONADOR			AS Colecionador
                            FROM PRODUTO_TB 		AS P 
                        INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                        WHERE   NM_PRODUTO			 like ?  `

    const [resp] = await config.query(sql, [
        search + '%'])
    return resp
}

export async function ConsultarProdPorId(id) {


    let comando = `
    SELECT * FROM PRODUTO_TB
                WHERE ID_PRODUTO = ?
    `

    const [resp] = await config.query(comando, [id])
    return resp;

}

export async function AlterarProduto(id, produto) {
    const comando = `
            UPDATE PRODUTO_TB
            SET 	NM_PRODUTO					=?,
                    VL_PRECO					=?,
                    VL_PRECO_PROMOCIONA			=?,
                    BT_DESTAQUE					=?,
                    BT_PRMOCAO					=?,
                    BT_DISPONIVEL				=?,
                    QTD_ESTOQUE					=?,
                    DS_DETALHES					=?,
            WHERE ID_PRODUTO				=? `

    const [resp] = await config.query(comando, [
        produto.nome,
        produto.preco,
        produto.precoPromocao,
        produto.promocao,
        produto.destaque,
        produto.disponivel,
        produto.estoque,
        produto.detalhes,
        id
    ]);

    return resp.affectedRows;
}

export async function ListDestProd(qtd, offset) {
    const sql = `			SELECT *
    FROM PRODUTO_TB 		AS P 
    INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
    where bt_destaque = true
    order by nm_produto
    limit ?
    offset ?;`

    const [resp] = await config.query(sql, [qtd, offset])
    return resp;
}

export async function ListAllDestProd(qtd, offset) {
    const sql = `			SELECT *
    FROM PRODUTO_TB 		AS P 
    INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
    where bt_destaque = true
    order by nm_produto`

    const [resp] = await config.query(sql, [qtd, offset])
    return resp;
}

