import { Router} from "express";
import { InsertEnderecos, ListEnderecos } from "../../repositorys/enderecos/enderecosRepo.js";

let server = Router();

  server.get("/enderecos", async (req, resp) => {
    let data = await ListEnderecos();
    resp.send(data)
  });

  server.post("/enderecos", async (req, resp) => {
    let bodyReq = req.body
    let data = await InsertEnderecos(bodyReq);
    resp.send(data)
  });

export default server;