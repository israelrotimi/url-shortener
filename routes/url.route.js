import { Router, json } from "express";

const urlRouter = Router();

urlRouter.get("/", async (req, res) => {
  const { url } = req.query;

  // save url in db, retrieve generated string and send the shortened url as response
  const newUrl = await URL.create({ targetURL: url })
  res.statusCode(201)
  .json({
    originalURL: url.targetURL,
    shortURL: url.shortURL
  })

});


export default urlRouter;
