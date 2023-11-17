		USE Flipyear2000_DB;

		-- Perfil Clientes

Select *
	from users_tb;

		INSERT INTO USERS_TB (ID_ENDERECO, ID_IMG, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_EMAIL, DS_SENHA, DS_TIER)
		VALUES  
			(1, 1, "Usuario 123123", "0", 0, "N1", "1234", 'NORMAL_USERS');
	

		INSERT INTO IMAGES_USER (DS_IMG_PERFIL)
		VALUES('/storage/images/profile');

		INSERT INTO COMENTARIOS_TB (ID_USUARIO, DS_COMENTARIO, DT_COMENTARIO, QTD_LIKES, BT_DENUNCIA)
		VALUES (1, 'Produto veio amassado, não gostei!! NÃO RECOMENDO!!!!', '2020-05-23', 24, 0);

		-- Endereço
		INSERT INTO ENDERECO_TB (DS_CEP, NM_CIDADE, NM_RUA, DS_COMPLEMENTO, NR_NUMERO)
		VALUES
			("0", "adm", "0","0", 0),
			("341343978", "Beverly hills", "Rua Gigachad da silva", "CASA QUE FICA PERTO DE UMA CALÇADA", 123);

		-- Produtos
		INSERT INTO PRODUTO_TB (ID_CATEGORIA, NM_PRODUTO, VL_PRECO, VL_PRECO_PROMOCIONAL, BT_PROMOCAO, BT_DESTAQUE, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES, VL_AVALIACAO, NM_FABRICANTE, TP_ESTADO, TP_COLECIONADOR)
		VALUES(1, "Madeira", 15.00, 0.00, false, true, false, 150, "madeira de boa qualidade madeira boa hein madeira", 9.5, 'HASBRO', 'VELHO',TRUE);

		INSERT INTO CATEGORIA_TB (NM_CATEGORIA)
		VALUES("receba carai");


		-- PEDIDOS
		INSERT INTO PEDIDO_TB (ID_USUARIO, ID_CATEGORIA, ID_ENDERECO, ID_FORMA_PAG, NM_PEDIDO, DS_NOTA_FISCAL, QTD_PARCELAS, DT_PEDIDO, DS_SITUACAO)
						VALUES 
							(1, 1, 1, 1, 'NINTENDO','NF1234', 3, '2023-11-03 12:34:56', 'Em processamento'),
							(2, 2, 2, 1, 'PLAY3', 'NF5678', 2, '2023-11-04 10:00:00', 'Enviado'),
							(3, 3, 3, 2,'CARA DA LUVA', 'NF91011', 4, '2023-11-05 14:30:00', 'Entregue'),
							(4, 4, 4, 3,'RECEBA', 'NF121314', 1, '2023-11-06 16:45:00', 'Cancelado'),
							(5, 5, 5, 1, 'KILL A GODS COMMAND', 'NF151617', 3, '2023-11-07 09:15:00', 'Em processamento'),
							(6, 6, 6, 3, 'HOLLY WARSS', 'NF181920', 2, '2023-11-08 11:20:00', 'Enviado'),
							(7, 7, 7, 2, 'UPHOLD THE LAW', 'NF212223', 4, '2023-11-09 13:40:00', 'Entregue');
                            
		INSERT INTO FORMA_PAG (NM_FORMA_PAG)
					VALUES('CREDITO');
                    
		insert into CATEGORIA_TB (NM_CATEGORIA)
								 VALUES ('Jogo'),
										('Console'),
                                        ('Fliperama'),
                                        ('Items Colecionaveis');
				
		-- SELEÇÕES --

		-- Seleção de Imagens de Perfil
		SELECT * FROM IMAGES_USER;
        

		-- Join de Usuários, Imagens de Perfil e Endereços
		SELECT
			U_TB.ID_USUARIO AS Id,
			U_TB.NM_USUARIO AS Nome,
			U_TB.DS_EMAIL AS Email
		FROM USERS_TB AS U_TB
		INNER JOIN ENDERECO_TB AS E_TB ON E_TB.ID_ENDERECO = U_TB.ID_ENDERECO;


		-- Seleção de Usuários por Email e Senha
		SELECT
			ID_USUARIO,
			NM_USUARIO AS Nome,
			DS_EMAIL AS Email
		FROM USERS_TB
		WHERE DS_EMAIL = 'rogerio@gmail.com' AND DS_SENHA = '123aa4';
        
        
		-- Seleção de Usuários por Nome, CPF ou Email
		SELECT *
		FROM USERS_TB
		WHERE NM_USUARIO LIKE "%rogerio%" OR DS_CPF LIKE "%rogerio%" OR DS_EMAIL LIKE "%rogerio%";
        
        

		-- Seleçoes pedidos
			SELECT *
				FROM PEDIDO_TB		   AS P_TB
                INNER JOIN ENDERECO_TB AS E_TB ON E_TB.ID_ENDERECO = P_TB.ID_ENDERECO
                INNER JOIN FORMA_PAG AS FP ON FP.ID_FORMA_PAG = P_TB.ID_FORMA_PAG;

		


		-- ATUALIZAÇÕES --

		-- Atualização de Imagem de Perfil
		UPDATE IMAGES_USER
			SET DS_IMG_PERFIL = '1321'
		WHERE ID_IMG  = '1';

		-- Updt situação
		UPDATE PEDIDO_TB

		-- EXCLUSÃO --

			SET DS_SITUACAO = 'GRACAAS A DEUS PAI'
		WHERE ID_PEDIDO = 4;

		-- Exclusão de Produto
		DELETE FROM TB_PRODUTO
		WHERE ID_PRODUTO = ?;
