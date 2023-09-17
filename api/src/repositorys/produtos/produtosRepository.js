import config  from '../DB/db_connection.js';

export async function InsertProdutos(produto){

    const resp = `
    INSERT INTO PRODUTO_TB  (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONA, BT_PRMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES)
        VALUES(? ,?, ?, ?, ?, ?, ?, ?, ?) `

    const [linhas] = await config.query(resp[

        produto.categoria,
        produto.nome,
        produto.preco,
        produto.precoPromocao,
        produto.promocao,
        produto.destaque,
        produto.disponivel,
        produto.estoque,
        produto.detalhes
    ]);

  
    return linhas.affectedRows;  
}


export async function ConsultProd(busca){
    const chamar = ` 
    SELECT *
				FROM PRODUTO_TB 		AS P 
			INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
        `
    const [resp] = await config.query
    return resp
}

export async function AlterarProduto(id, produto){
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