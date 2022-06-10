import path from "path";
// import fs from "fs";
import cluster from "cluster";
import os from "os";
import express from "express";
// import multer from "multer";
import sequelize from "./utilities/database.js";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";

//all error controllers imported here
import { corsError } from "./middleware/error-handlers/cors-error.js";

import { centralError } from "./middleware/error-handlers/central-error.js";

//all routes imported here

const cpu = os.cpus().length;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port = process.env.PORT || 3300;

const app = express();

//handle cors error
app.use(corsError);

app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Callback-Type, Content-Type, Accept"
  );
  res.header("Cache-Control", "no-cache");
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

if (cluster.isMaster) {
  console.log(`Master  ${process.pid} is running`);
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }
  console.log(cpu);
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  //multer file storage
  // const fileStorage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     let dir = "./uploaded-pdf";
  //     //this will create the folder if not exists
  //     if (!fs.existsSync(dir)) {
  //       fs.mkdirSync(dir);
  //     }
  //     cb(null, dir);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(
  //       null,
  //       new Date().toISOString().replace(/:/g, "-") +
  //         "-" +
  //         file.originalname.toString().replace(/\s/g, "-")
  //     );
  //   },
  // });
  //defining absolute path of current WORKDIR
  const __dirname = path.resolve();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(__dirname));
  // app.use(express.static(path.join(__dirname, "uploaded-pdf")));

  // multer configuration
  // app.use(
  //   multer({
  //     storage: fileStorage,
  //     fileFilter: fileFilter,
  //   }).single("pdf")
  // );

  // app.use(
  //   "/uploaded-pdf",
  //   express.static(path.join(__dirname, "uploaded-pdf"))
  // );

  // app.use(
  //   "/uploaded-image",
  //   express.static(path.join(__dirname, "testportal-img"))
  // );

  //All routes entrypoint here
  // app.use("/auth", authenticationRoutes);
  // app.use("/administrator", administratorRoutes);

  app.use(helmet());
  app.use(compression());

  //central error handler here
  app.use(centralError);

  // sync with database
  sequelize
    .sync()
    .then(() => {
      app.listen(port);
      console.log(`✔️  Server listening on port: ${port} ✔️ `);
    })
    .catch((err) => {
      console.log(err);
    });
}
