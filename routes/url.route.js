import { Router } from "express";
import Url from "../models/url.model.js";

const urlRouter = Router();

urlRouter.post("/", async (req, res, next) => {
  const { url } = req.body;

  // save url in db, retrieve generated string and send the shortened url as response
  try {
    const newUrl = await Url.create({ targetURL: url })
    res.status(201)
    .json({
      originalURL: newUrl.targetURL,
      shortURL: `${req.baseUrl}/${newUrl.shortenedStringId}`,
    })
  } catch (error) {
    next(error)
  }

});


export default urlRouter;
