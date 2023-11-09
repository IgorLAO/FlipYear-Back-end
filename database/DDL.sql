CREATE DATABASE Flipyear2000_DB;

USE Flipyear2000_DB;


CREATE TABLE IMAGES_USER(
	ID_IMG			INT PRIMARY  KEY auto_increment,
    DS_IMG_PERFIL	VARCHAR(400)
);

CREATE TABLE ENDERECO_TB(
	ID_ENDERECO			INT primary KEY auto_increment,
    DS_CEP				INT NOT NULL,
    NM_CIDADE			VARCHAR(400) NOT NULL,
    NM_RUA				VARCHAR(400) NOT NULL,
    DS_COMPLEMENTO		VARCHAR(400),
    NR_NUMERO			INT NOT NULL
);
					

CREATE TABLE USERS_TB(
	ID_USUARIO			INT primary KEY auto_increment,
    ID_ENDERECO			INT NOT NULL,
    ID_IMG				INT,
    NM_USUARIO			VARCHAR(100) NOT NULL,
    DS_TELEFONE			VARCHAR(100) NOT NULL,
    DS_CPF				VARCHAR(11)  NOT NULL,
    DS_EMAIL			VARCHAR(400) NOT NULL,
    DS_SENHA			VARCHAR(50)  NOT NULL,
	DS_TIER				VARCHAR(50),
    foreign key (ID_ENDERECO) REFERENCES ENDERECO_TB (ID_ENDERECO),
    FOREIGN KEY (ID_IMG) REFERENCES IMAGES_USER(ID_IMG)
);



CREATE TABLE COMENTARIOS_TB (
	ID_COMENTARIO		INT PRIMARY KEY auto_increment NOT NULL,
    ID_USUARIO			INT NOT NULL,
    DS_COMENTARIO		VARCHAR(300) NOT NULL,
    DT_COMENTARIO		DATE NOT NULL,
    QTD_LIKES			INT NOT NULL,
    BT_DENUNCIA			BOOL NOT NULL,
		FOREIGN KEY (ID_USUARIO) REFERENCES USERS_TB(ID_USUARIO)
);
	
    
CREATE TABLE FORMA_PAG(
	ID_FORMA_PAG 	INT primary KEY auto_increment,
	NM_FORMA_PAG	VARCHAR(100)
);


CREATE TABLE CATEGORIA_TB (
	ID_CATEGORIA				INT primary KEY auto_increment,
    NM_CATEGORIA				VARCHAR(100)
);

                        
CREATE TABLE PEDIDO_TB(
	ID_PEDIDO		INT primary KEY auto_increment,
    ID_USUARIO		INT,
	ID_CATEGORIA    INT,
    ID_ENDERECO		INT,
    ID_FORMA_PAG	INT,
    NM_PEDIDO		VARCHAR(100),
    DS_NOTA_FISCAL  VARCHAR(100),
    QTD_PARCELAS	INT,
    DT_PEDIDO		DATETIME,
    DS_SITUACAO		VARCHAR(100),
        FOREIGN KEY (ID_USUARIO) REFERENCES USERS_TB(ID_USUARIO),
		FOREIGN KEY (ID_ENDERECO) REFERENCES ENDERECO_TB (ID_ENDERECO),
		FOREIGN KEY (ID_FORMA_PAG) REFERENCES FORMA_PAG(ID_FORMA_PAG),
		foreign key (ID_CATEGORIA) REFERENCES CATEGORIA_TB(ID_CATEGORIA)    
);



-- ------------------------------ --------------------------------- --


CREATE TABLE PRODUTO_TB(
	ID_PRODUTO					INT primary KEY auto_increment,
	ID_CATEGORIA				INT NOT NULL,
	NM_PRODUTO					VARCHAR(400) NOT NULL,
    VL_PRECO					DECIMAL(21, 2) NOT NULL,
	VL_PRECO_PROMOCIONAL		DECIMAL(21, 2) NOT NULL,
    BT_DESTAQUE					BOOLEAN NOT NULL,
    BT_PROMOCAO					BOOL NOT NULL,
    BT_DISPONIVEL				BOOL NOT NULL,
    QTD_ESTOQUE					INT NOT NULL,
    DS_DETALHES					varchar(500) NOT NULL,
    VL_AVALIACAO                DECIMAL(5, 1) NOT NULL,
    NM_FABRICANTE               VARCHAR(400) NOT NULL,
    TP_ESTADO                   VARCHAR(400) NOT NULL,
    TP_COLECIONADOR             BOOL NOT NULL,
    foreign key (ID_CATEGORIA) REFERENCES CATEGORIA_TB(ID_CATEGORIA)
);

CREATE TABLE IMAGEM_PRODUTO_TB(
	ID_IMAGEM_PRODUTO			INT primary KEY auto_increment,
    ID_PRODUTO					INT,
    IMG_PRODUTO					VARCHAR(100),
    foreign key (ID_PRODUTO) REFERENCES	PRODUTO_TB(ID_PRODUTO)
);	


CREATE TABLE PEDIDO_ITEM_TB(
	ID_PEDIDO_ITEM		INT primary KEY auto_increment,
    ID_PEDIDO			INT,
    ID_PRODUTO			INT,
	QTD_ITEM			INT,
		FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO_TB(ID_PEDIDO),
		FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO_TB(ID_PRODUTO)
);



CREATE TABLE CARRINHO_TB (
	ID_CARRINHO INT NOT NULL primary KEY auto_increment,
	ID_USUARIO INT,
	ID_PRODUTO INT,
	QTD_PRODUTO_CARRINHO INT
);






