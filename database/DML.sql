use Flipyear2000_DB;


-- PERFIL CLIENTES 
INSERT INTO USERS_TB (ID_ENDERECO, ID_IMG, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL,  DS_SENHA, DS_TIER)
						VALUES  (1, 1, "Usuario Totalmente Normal", "0", 0, "NORMAL2", "1234", 'NORMAL_USERS'),
								(1, 2, "Usuario Totalmente Normal", "0", 0, "NORMAL", "123", 'NORMAL_USERS'),
								(1, 3, "JOAO", "0", 0, "joao.admin", "123", 'ADM'    ),
								(1, 4, "Igor", "0", 0, "igor.admin", "123", 'ADM'    ),
								(1, 5, "Italo", "0", 0, "italo.admin", "123", 'ADM'  ),
								(1, 6, "Denzel", "0", 0, "denzel.admin", "123", 'ADM'),
								(1, 7, "David", "0", 0, "david.admin", "123", 'ADM'   );
                                
INSERT INTO IMAGES_USER (DS_IMG_PERFIL)	
							VALUES('/storage/images/profile');	
                            
                               SELECT *
                               FROM IMAGES_USER;

 UPDATE IMAGES_USER 
            SET DS_IMG_PERFIL = '1321'
                 WHERE ID_IMG = '1';


	SELECT * 
		FROM USERS_TB 				  AS U_TB
        INNER JOIN IMAGES_PERFIL_USER AS IMG_TB
									  ON  U_TB.ID_IMG = IMG_TB.ID_IMG
		INNER JOIN ENDERECO_TB 		  AS E_TB 
									  ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO;
                               
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
            
            
		INSERT INTO COMENTARIOS_TB (ID_USUARIO, DS_COMENTARIO, DT_COMENTARIO, QTD_LIKES, BT_DENUNCIA)
						VALUES (1, 'Produto veio amassado, não gostei!! NÃO RECOMENDO!!!!', '2020-05-23', 24, 0); 
                               
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
									VALUES(1, "Madeira", 15.00, 0.00, false, true, false, 150, "madeira de boa qualidade madeira boa hein madeira", 9.5, 'HASBRO', 'VELHO',TRUE );
			
            SELECT *
				FROM PRODUTO_TB;
            
			INSERT INTO CATEGORIA_TB (NM_CATEGORIA)
									 VALUES("Jogos de CD"),
									 		("Jogos de Fita"),
											("Consoles"),
											("Fliperama");

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
    
    
     SELECT  		ID_USUARIO        AS      Id,
                    NM_USUARIO        AS      Nome,
                    DS_EMAIL          AS      Email,
                    DS_TELEFONE       AS      Telefone,
                    DS_CPF            AS      CPF,
                    NM_CIDADE         AS      Nome_Cidade,
                    NM_RUA            AS      Nome_Rua,
                    NR_NUMERO         AS      Numero,
                    DS_IMG_PERFIL	  AS      ImageProfile,
                    DS_BANNER         AS      ImageBanner
		FROM USERS_TB 				  AS U_TB
        INNER JOIN IMAGES_PERFIL_USER AS IMG_TB
									  ON  U_TB.ID_IMG = IMG_TB.ID_IMG
		INNER JOIN ENDERECO_TB 		  AS E_TB 
									  ON E_TB.ID_ENDERECO= U_TB.ID_ENDERECO;
    
    
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

