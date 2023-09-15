import 'dotenv/config';
import cors from "cors";
import express from 'express';

import clientesController from './src/controllers/clientes/clientesController.js';
import produtosProdutos from './src/controllers/produtos/produtosProdutos.js';

const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT,() => console.log(`
        API ONLINE NA PORTA ${process.env.PORT}
`));


server.get('/japodemossar',async (req, resp) =>{
    let horario = Date()
    resp.send('pode, pois são '+ horario)
});


server.use(clientesController);
server.use(produtosProdutos);