USE Flipyear2000_DB;


-- PERFIL CLIENTES 
INSERT INTO USERS_TB (ID_ENDERECO, ID_IMG, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
						VALUES (1, "joana", "0", 0, "NORMAL", "123", 'NORMAL_USERS'),
								(2, "FAISKA MASSACRE", "0", 0, "ADM", "123", 'ADM');
							   
		select  ID_USUARIO			AS Id,
			 	NM_USUARIO			AS Nome,
                DS_EMAIL			AS Email
			from USERS_TB			AS U_TB
			INNER JOIN ENDERECO_TB AS E_TB 
									ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO;

			SELECT 	ID_USUARIO,
					NM_USUARIO    AS Nome,
					DS_EMAIL      AS Email
			FROM    USERS_TB     
			WHERE   DS_EMAIL      = 'rogerio@gmail.com'
			AND     DS_SENHA      = '123aa4';
            -- -------
            SELECT *
                         FROM USERS_TB
                WHERE NM_USUARIO  LIKE "%rogerio%" 
                      OR DS_CPF   LIKE "%rogerio%"
                      OR DS_EMAIL LIKE "%rogerio%";


		
		-- ENDERECO
			INSERT INTO ENDERECO_TB (DS_CEP, NM_CIDADE, NM_RUA, DS_COMPLEMENTO, NR_NUMERO)
									  VALUES("0", "adm", "0","0", 0),
											("341343978", "Beverly hills", " Rua Gigachad da silva "," CASA QUE FICA PERTO DE UMA CALÇADA", 123);
									 
		-- PRODUTOS
			INSERT INTO PRODUTO_TB  (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONA, BT_PRMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES)
									VALUES(1, "Madeira", 15.00, 0.00, false, true, false, 150, "madeira de boa qualidade madeira boa hein madeira");
									
			INSERT INTO CATEGORIA_TB (NM_CATEGORIA)
									 VALUES("Fliperama");
-- ---------------------

  -- ----									 
			SELECT *
				FROM PRODUTO_TB 		AS P 
			INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA;
  -- --
	-- -	DELETE
		DELETE FROM TB_PRODUTO
			WHERE ID_PRODUTO = ?;
	-- -
