import express from "express";

import { PORT } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import urlRouter from "./routes/url.route.js";
import URL from "./models/url.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/urls", urlRouter);


app.use(errorMiddleware)

app.get("/:uid", (req, res) => {
  // get unique string from url
  const uid = req.params
  // find in db
  const target = URL.findOne({ uid })
  
  // if not found raise 404
  if (!target) {
    res.statusCode(404).send("resource not found")
    return;
  }

  // redirect to target url
  res.redirect(target.targetURL)
});

app.listen(PORT, async () => {
  console.log(`server listening on http://localhost:${PORT}`);

  await connectToDatabase();
});
