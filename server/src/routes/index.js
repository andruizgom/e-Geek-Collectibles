const { Router } = require("express");
const { getAllProductsH } = require("../handlers/getAllProductsH");
const { getProductsByNameH } = require("../handlers/getProductsByNameH");
const { getProductsByIdH } = require("../handlers/getProductsByIdH");
const { postCreateProductH } = require("../handlers/postCreateProductH");

const router = Router();

router.get('/products', getAllProductsH)

// http://localhost:3001/products/name?name=batman
router.get('/products/name/', getProductsByNameH)

// http://localhost:3001/products/5
router.get('/products/:id', getProductsByIdH)

router.post('/products', postCreateProductH)

module.exports = router;
