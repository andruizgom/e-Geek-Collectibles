const { Router } = require("express");
const { getAllProductsH } = require("../handlers/getAllProductsH");
const { getProductsByNameH } = require("../handlers/getProductsByNameH");
const { getProductsByIdH } = require("../handlers/getProductsByIdH");
const { postCreateProductH } = require("../handlers/postCreateProductH");
const { postReviewH } = require("../handlers/postReviewH");
const { postUserH } = require("../handlers/postUserH");
const { postFavoritesH } = require("../handlers/postFavoritesH");
const { getFavoritesH } = require("../handlers/getFavoritesH");
const { deleteFavoritesH } = require("../handlers/deleteFavoritesH");

const router = Router();

router.get("/products", getAllProductsH);

// http://localhost:3001/products/name?name=batman
router.get("/products/name/", getProductsByNameH);

// http://localhost:3001/products/5
router.get("/products/:id", getProductsByIdH);

router.post("/products", postCreateProductH);

router.post("/reviews", postReviewH);

router.post("/users", postUserH);

router.get("/favorites/email/", getFavoritesH);

router.post("/favorites", postFavoritesH);

router.put("/favorites", deleteFavoritesH);

module.exports = router;
