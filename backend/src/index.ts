import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import router from "./router";
import validateEnv from "./utils/validateEnv";
import setCookieLang from "./middlewares/setLangCookie";
import { CompraDto } from "./resources/compra/compra.types";

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuarioID: string;
    carrinho: CompraDto[];
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "d0141e8d-99d4-4682-872f-9e1993a169bd",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(setCookieLang);
app.use(express.json());
app.use(router);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
