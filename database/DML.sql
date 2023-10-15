USE Flipyear2000_DB;


-- PERFIL CLIENTES 
INSERT INTO USERS_TB (ID_ENDERECO, ID_IMG, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
						VALUES (1, 2, "Usuario Totalmente Normal", "0", 0, "NORMAL", "123", 'NORMAL_USERS'),
								(2, 1, "JOAO", "0", 0, "joao.admin", "123", 'ADM'    ),
                                (2, 1, "Igor", "0", 0, "igor.admin", "123", 'ADM'    ),
                                (2, 1, "Italo", "0", 0, "italo.admin", "123", 'ADM'  ),
                                (2, 1, "Denzel", "0", 0, "denzel.admin", "123", 'ADM'),
                                (2, 1, "David", "0", 0, "david.admin", "123", 'ADM'  );
                                
INSERT INTO IMAGES_PERFIL_USER (DS_BANNER, DS_IMG_PERFIL)
							VALUES('2', 'BBBB');
                               
                               
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
			INSERT INTO PRODUTO_TB (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONAL, BT_PROMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES, VL_AVALIACAO, NM_FABRICANTE, TP_ESTADO, TP_COLECIONADOR)
									VALUES(1, "Madeira", 15.00, 0.00, false, true, false, 150, "madeira de boa qualidade madeira boa hein madeira", 9.5, 'HASBRO', 'VELHO', );
			
            SELECT *
				FROM PRODUTO_TB;
            
			INSERT INTO CATEGORIA_TB (NM_CATEGORIA)
									 VALUES("OIII");
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
    
    
    SELECT 
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
	 INNER JOIN CATEGORIA_TB		AS C ON C.ID_CATEGORIA = P.ID_CATEGORIA;
     WHERE NM_PRODUTO 

