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
const { getUserByEmailH } = require("../handlers/getUserByEmailH");
const { updateUserH } = require("../handlers/updateUserH");
const { getAllUsersH } = require("../handlers/getAllUsersH");
const { crearPago } = require("../controllers/Stripe/checkoutSession");
const {putUpdateProductH} = require('../handlers/putUpdateProductH');

const router = Router();

router.get("/products", getAllProductsH);

// http://localhost:3001/products/name?name=batman
router.get("/products/name/", getProductsByNameH);

// http://localhost:3001/products/5
router.get("/products/:id", getProductsByIdH);

router.post("/products", postCreateProductH);

router.post("/reviews", postReviewH);

router.get("/users", getAllUsersH);

router.post("/users", postUserH);

router.put("/users", updateUserH);

router.get("/users/email/", getUserByEmailH);

router.get("/favorites/email/", getFavoritesH);

router.post("/favorites", postFavoritesH);

router.put("/favorites", deleteFavoritesH);

router.post('/crear-pago', crearPago);

router.put("/products/:id",putUpdateProductH)

module.exports = router;
