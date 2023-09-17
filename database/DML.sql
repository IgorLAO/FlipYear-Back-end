USE FLIPYEARDB;


-- PERFIL GERAL CLIENTS e ADM
INSERT INTO USERS_TB (ID_ENDERECO, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
						VALUES (1, "Igor L. A ", "0", 0, "igorF@ADMIN.com", "ADM12345678", "ADM");
							   
		select *
			from USERS_TB 			AS U_TB
			INNER JOIN ENDERECOS_TB AS E_TB 
									ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO
			WHERE DS_TIER = "ADM";
			
			SELECT 	ID_CLIENTE,
					NM_CLIENTE    AS Nome,
					DS_EMAIL      AS Email
			FROM    CLIENTES_TB     
			WHERE   DS_EMAIL      = 'rogerio@gmail.com'
			AND     DS_SENHA      = '123aa4';
            
            SELECT *
                         FROM USERS_TB
                WHERE NM_USUARIO  LIKE "%rogerio%" 
                      OR DS_CPF   LIKE "%rogerio%"
                      OR DS_EMAIL LIKE "%rogerio%";

		-- ENDERECO
			INSERT INTO ENDERECOS_TB (DS_CEP, NM_CIDADE, NM_RUA, DS_COMPLEMENTO, NR_NUMERO)
									  VALUES("341343978", "Beverly hills", " Rua Gigachad da silva "," CASA QUE FICA PERTO DE UMA CALÇADA", 123);
									 
		-- PRODUTOS
			INSERT INTO PRODUTO_TB  (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONA, BT_PRMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES)
									VALUES(1, "Madeira", 15.00, 0.00, false, true, false, 150, "madeira de boa qualidade madeira boa hein madeira");
									
			INSERT INTO CATEGORIA_TB (NM_CATEGORIA)
									 VALUES("Fliperama");

  ----									 
			SELECT *
				FROM PRODUTO_TB 		AS P 
			INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA;
  ----
	---	DELETE
		DELETE FROM TB_PRODUTO
			WHERE ID_PRODUTO = ?
	---
			UPDATE PRODUTO_TB
				SET 	NM_PRODUTO					=?,
						VL_PRECO					=?,
						VL_PRECO_PROMOCIONA			=?,
						BT_DESTAQUE					=?,
						BT_PRMOCAO					=?,
						BT_DISPONIVEL				=?,
						QTD_ESTOQUE					=?,
						DS_DETALHES					=?,
				WHERE ID_PRODUTO				=?