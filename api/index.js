import 'dotenv/config';
import cors from "cors";
import express from 'express';

import usuarioController from './src/controllers/usuario.js';
import produtosCtrl from './src/controllers/produtosCtrl.js';
import enderecosCtrls from './src/controllers/enderecosCtrls.js';
import carrinhoCtrl from './src/controllers/carrinhoCtrl.js';
import commentCtrl from './src/controllers/comentariosCrtl.js';
import pedidoCrtl from './src/controllers/pedidosCtrl.js';

const server = express();

server.use('/storage/images/profile', express.static('storage/images/profile'));
server.use('/storage/images/produtos', express.static('storage/images/produtos'));

server.use(cors());
server.use(express.json());
   
server.listen(process.env.PORT,() => console.log(`
        API ONLINE NA PORTA ${process.env.PORT}
`));
   
server.use(usuarioController);
server.use(produtosCtrl);
server.use(enderecosCtrls);
server.use(carrinhoCtrl);
server.use(commentCtrl);

server.use(pedidoCrtl);
