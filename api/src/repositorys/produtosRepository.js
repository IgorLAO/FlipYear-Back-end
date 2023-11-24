import config from './db_connection.js';

export async function ListProd(qtd, offset) {
    const sql = `SELECT	*
                  FROM PRODUTO_TB 		AS P 
            INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
            INNER JOIN PRODUTO_IMG_TB   AS P_IMG
                                             ON P.ID_PROD_IMG = P_IMG.ID_PROD_IMG
                 ORDER BY nm_produto
                 LIMIT ?
                OFFSET ? `;
    let [resp] = await config.query(sql, [qtd, offset])
    return resp
}

export async function ListAllProd() {
    const sql = `SELECT *
    FROM PRODUTO_TB AS P
        INNER JOIN CATEGORIA_TB AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
        INNER JOIN PROD_IMG_TB AS P_IMG ON P.ID_PROD_IMG = P_IMG.ID_PROD_IMG
    ORDER BY P.nm_produto`
    const [resp] = await config.query(sql)
    return resp;
}

export async function GetCatego() {
    const sql = `SELECT *
                    FROM CATEGORIA_TB`

    const [resp] = await config.query(sql);
    return resp
}

export async function InsertProdutos(produto) {
    const resp = `
    INSERT INTO PRODUTO_TB (ID_CATEGORIA, ID_PROD_IMG, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONAL, BT_PROMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES, VL_AVALIACAO, NM_FABRICANTE, TP_ESTADO, TP_COLECIONADOR)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `

    const [linhas] = await config.query(resp, [
        produto.Idcategoria,
        produto.IdImg,
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
    return linhas;
}


export async function RemoverProdutos(id) {
    const sql = `DELETE FROM PRODUTO_TB
        WHERE ID_PRODUTO = ? `

    const [resp] = await config.query(sql, [id]);
    return resp.affectedRows;
}


export async function SearchProd(search) {
    const sql = `  SELECT   *
                        INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                        WHERE   NM_PRODUTO			 like ?  `

    const [resp] = await config.query(sql, [
        search + '%'])
    return resp
}

export async function ConsultarProdPorId(id) {


    let sql = `
    SELECT * FROM PRODUTO_TB
                WHERE ID_PRODUTO = ?
    `

    const [resp] = await config.query(sql, [id])
    return resp;

}

export async function AlterarProduto(id, produto) {
    const sql = `
            UPDATE PRODUTO_TB
            SET 	NM_PRODUTO					=?,
                    VL_PRECO					=?,
                    VL_PRECO_PROMOCIONAL		=?,
                    BT_DESTAQUE					=?,
                    BT_PROMOCAO					=?,
                    BT_DISPONIVEL				=?,
                    QTD_ESTOQUE					=?,
                    DS_DETALHES					=?
            WHERE ID_PRODUTO				    =? `

    const [resp] = await config.query(sql, [
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
    INNER JOIN CATEGORIA_TB	 C ON C.ID_CATEGORIA = P.ID_CATEGORIA
    INNER JOIN PROD_IMG_TB AS P_IMG ON P.ID_PROD_IMG = P_IMG.ID_PROD_IMG
    where bt_destaque = true
    order by nm_produto
    limit ?
    offset ?;`

    const [resp] = await config.query(sql, [qtd, offset])
    return resp;
}


export async function ListAllDestProd(qtd, offset) {
    const sql = `SELECT *
                        FROM PRODUTO_TB 		AS P 
                        INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA
                        where bt_destaque = true
                        order by nm_produto`

    const [resp] = await config.query(sql, [qtd, offset])
    return resp;

    //Filtros
}

export async function FiltroFoda(filtro) {
    const sql = `SELECT * FROM PRODUTO_TB
                    WHERE`
};

export async function AlterarImagem(imagem, id) {
    const sql = `
        update IMAGEM_PRODUTO_TB
            SET IMG_PRODUTO = ?
                WHERE ID_PRODUTO = ?`

    const [resp] = await config.query(sql, [imagem, id]);
    return resp.affectedRows;
}

export async function InserirImagem(Frente,
                                    Tras,
                                    LadoDir,
                                    LadoEsq,
) {
    const sql = `insert into PROD_IMG_TB (FRENTE, TRAS, LADO_DIRE, LADO_ESQ)
                                     VALUES (?,?,?,?)`;

    const [resp] = await config.query(sql, [Frente, Tras, LadoDir, LadoEsq]);


    return resp;
}
