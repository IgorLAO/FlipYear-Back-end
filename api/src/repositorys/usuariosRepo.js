import { query } from "express";
import config from "./db_connection.js";

export async function getUsers() {
    let sql = `	SELECT ID_USUARIO         AS      Id,
                        NM_USUARIO        AS      Nome,
                        DS_EMAIL          AS      Email,
                        DS_TELEFONE       AS      Telefone,
                        DS_CPF            AS      CPF,
                        NM_CIDADE         AS      Nome_Cidade,
                        NM_RUA            AS      Nome_Rua,
                        NR_NUMERO         AS      Numero 
            FROM USERS_TB 				  AS U_TB
                INNER JOIN ENDERECO_TB    AS E_TB 
                                        ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO`;
    let [resp] = await config.query(sql)
    return resp
};

export async function GetUserById(id) {
    let sql = `                               
            SELECT  ID_USUARIO        AS      Id,
                    NM_USUARIO        AS      Nome,
                    DS_EMAIL          AS      Email,
                    DS_TELEFONE       AS      Telefone,
                    DS_CPF            AS      CPF,
                    NM_CIDADE         AS      Nome_Cidade,
                    NM_RUA            AS      Nome_Rua,
                    NR_NUMERO         AS      Numero,
                    DS_IMG_PERFIL	  AS      ImageProfile
		FROM USERS_TB 				  AS U_TB
        INNER JOIN IMAGES_USER AS IMG_TB
									  ON  U_TB.ID_IMG = IMG_TB.ID_IMG
		INNER JOIN ENDERECO_TB 		  AS E_TB 
									  ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO
			WHERE ID_USUARIO = ?`;

    const [resp] = await config.query(sql, [id]);
    return resp
}

export async function InsertClientes(C) {
    let sql = `INSERT INTO USERS_TB (ID_ENDERECO, ID_IMG, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    let [resp] = await config.query(sql, [ C.Id_endereco,
                                           C.Id_img,
                                           C.Nome,
                                           C.Telefone,
                                           C.CPF,
                                           C.Email,
                                           C.Senha,
                                           C.Tier]);

    return resp
};


export async function GetImages() {
    let sql = `SELECT ID_IMG AS Id, 
                    DS_IMG_PERFIL AS NameImg
                FROM IMAGES_USER`;

    const [resp] = await config.query(sql, []);
    return resp
}


export async function Login(Email, Senha) {
    let sql = `     SELECT   ID_USUARIO           AS      Id,
                                NM_USUARIO        AS      Nome,
                                DS_EMAIL          AS      Email,
                                DS_TELEFONE       AS      Telefone,
                                DS_CPF            AS      CPF,
                                NM_CIDADE         AS      Nome_Cidade,
                                NM_RUA            AS      Nome_Rua, 
                                NR_NUMERO         AS      Numero,
                                DS_TIER           AS      Tier  
                            FROM USERS_TB 		  AS U_TB
                    INNER JOIN ENDERECO_TB 		  AS E_TB 
                                        ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO
        WHERE DS_EMAIL = ?
        AND   DS_SENHA = ?`;

    const [resp] = await config.query(sql, [Email, Senha]);
    return resp[0]
}

export async function SearchUser(search) {
    let sql = `SELECT *
                         FROM USERS_TB
                WHERE NM_USUARIO  LIKE ? 
                      OR DS_CPF   LIKE ?
                      OR DS_EMAIL LIKE ?`
    let [resp] = await config.query(sql, [  '%' + search + '%',
                                            '%' + search + '%',
                                            '%' + search + '%']);
                                            console.log(resp);
    return resp
};

export async function Delete(id) {
    let sql = `DELETE FROM USERS_TB
                      WHERE ID_USUARIO = ?`;
    let [resp] = await config.query(sql, [id]);

    return resp.affectedRows
};


export async function AlterImage(imagem, id) {
    const sql = `  UPDATE IMAGES_USER 
                SET DS_IMG_PERFIL = ?
                    WHERE ID_IMG  = ?`;
    const [res] = await config.query(sql, [imagem, id]);

    return res.affectedRows;
}