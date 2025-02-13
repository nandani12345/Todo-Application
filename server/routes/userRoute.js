import express from "express";
import {
  create,
  getData,
  getOne,
  update,
  deleteData,
} from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getData", getData);
route.get("/getOne/:id", getOne);
route.put("/update/:id", update);
route.delete("/deleteData/:id", deleteData);

export default route;
