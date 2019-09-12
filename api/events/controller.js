const router = require("express").Router();
const Events = require("./model");

router
  .route("/events")
  .get(async (req, res, next) => {
    try {
      const events = await Events.find();
      return res.json(events);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: err.message
      });
    }
  })
  .post(async (req, res, next) => {
    try {
      const event = new Events(req.body);
      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(err.errors ? 400 : 500).json({
        message: err instanceof Error ? err.toString() : JSON.stringify(err)
      });
    }
  });

module.exports = router;
