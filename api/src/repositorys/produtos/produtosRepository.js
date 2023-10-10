import config from '../DB/db_connection.js';

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

export async function InsertProdutos(produto) {
    const resp = `
    INSERT INTO PRODUTO_TB  (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONAL, BT_DESTAQUE, BT_PROMOCAO, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES)
       VALUES(? ,?, ?, ?, ?, ?, ?, ?, ?) `

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


export async function ConsultProd(busca) {
    const chamar = ` 
    SELECT *
				FROM PRODUTO_TB 		AS P 
			INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
            INNER JOIN IMAGEM_PRODUTO_TB	AS IMG ON IMG.ID_IMAGEM_PRODUTO = P.ID_IMAGEM_PRODUTO
        `
    const [resp] = await config.query(chamar)
    return resp
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

