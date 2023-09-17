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

    produto.id = linhas.insertId
    return produto;  
}
export async function ConsultProd(busca){
    const chammar = ` 
    SELECT *
        FROM PRODUTO_TB 
        `

    const [resp] = await config.query
    return resp
}