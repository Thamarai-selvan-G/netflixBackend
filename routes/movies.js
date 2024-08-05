var express = require("express");
var router = express.Router();
let moviesController = require("../Controller/movie.controller");

router.post("/moviecreate", moviesController.createMovie);
router.get("/viewall", moviesController.viewAll);
router.get("/viewid/:id", moviesController.viewId);
router.post("/update/:id", moviesController.updateMovie);
router.delete("/deleteid/:id",moviesController.deleteId)

module.exports = router;
