import config from "./db_connection.js";


export async function ListarCarrinho(id){

    let comando = 
    `SELECT *
    FROM CARRINHO_TB
    INNER JOIN PRODUTO_TB ON CARRINHO_TB.ID_PRODUTO = PRODUTO_TB.ID_PRODUTO
    WHERE ID_USUARIO = ?;
    `

    let [resp] = await config.query(comando, [id]);
    return resp;

}

export async function InserirProdutoNoCarrinho(info){


    let comando =
    `INSERT INTO CARRINHO_TB (ID_USUARIO, ID_PRODUTO, QTD_PRODUTO_CARRINHO)
            VALUES (?, ?, ?)
    `


    let [resp] =  await config.query(comando, [
        info.usuario,
        info.produto,
        info.qtd
    ])

    info.id = resp.insertId
    return info;


}

export async function LimparCarrinho(id){


let comando = `
DELETE FROM CARRINHO_TB 
            WHERE ID_USUARIO = ?
`

let [resp] = await config.query(comando, [id]);
return resp.affectedRows;

}

export async function RemoverProdutoDoCarrinho(idUsuario, idProduto){


    let comando = `
    DELETE FROM CARRINHO_TB
            WHERE ID_USUARIO = ? AND ID_PRODUTO = ? 
    `

    let [resp] = await config.query(comando, [idUsuario, idProduto]);
    return resp.affectedRows;


}

export async function AlterarProdutosDoEstoque(qtd, idProduto){

    let comando = `
    update produto_tb 
		set qtd_estoque = ? where id_produto = ?
    `

    let [resp] = await config.query(comando, [qtd, idProduto]);
    return resp.affectedRows;


}

export async function AlterarQtdNoCarrinho(qtd, idUsuario, idProduto){

    let comando = `
    UPDATE CARRINHO_TB
	        SET QTD_PRODUTO_CARRINHO = ? WHERE ID_USUARIO = ? AND ID_PRODUTO = ?
    `

    let [resp] = await config.query(comando, [qtd, idUsuario, idProduto]);
    return resp.affectedRows;


}