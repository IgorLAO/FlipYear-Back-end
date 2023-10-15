import 'dotenv/config';
import cors from "cors";
import express from 'express';

import usuarioController from './src/controllers/usuario/usuario.js';
import produtosCtrl from './src/controllers/produtos/produtosCtrl.js';
import enderecosCtrls from './src/controllers/endereco/enderecosCtrls.js';
import carrinhoCtrl from './src/controllers/carrinho/carrinhoCtrl.js'


const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT,() => console.log(`
        API ONLINE NA PORTA ${process.env.PORT}
`));


server.use(usuarioController);
server.use(produtosCtrl);
server.use(enderecosCtrls);
server.use(carrinhoCtrl);