import { Router } from "express";
import { InsertEnderecos, ListEnderecos } from "../../repositorys/enderecos/enderecosRepo.js";

let server = Router();

server.get("/enderecos", async (req, resp) => {
  let data = await ListEnderecos();
  resp.send(data);
});

server.post("/enderecos", async (req, resp) => {
      try {
        let bodyReq = req.body

        if (!bodyReq.CEP)
          throw new Error("Digite um CEP");

        if(!bodyReq.Cidade)
          throw new Error("Digite uma cidade");

        if(!bodyReq.Numero)
          throw new Error("Digite um numero");

        let data = await InsertEnderecos(bodyReq);
        resp.send(data)

      } catch (err) {
        resp.send(err.message)
      };
});

export default server;