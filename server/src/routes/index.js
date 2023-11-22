const { Router } = require("express");
const {getAllProductsH} = require("../handlers/getAllProductsH");
const {getProductsByNameH} = require("../handlers/getProductsByNameH");
const {getProductsByIdH} = require("../handlers/getProductsByIdH");

const router = Router();

router.get('/products', (req, res) => {
    getAllProductsH(req, res);
})

// http://localhost:3001/products/name?name=batman
router.get('/products/name/', (req, res) => {
    getProductsByNameH(req, res);
})

http://localhost:3001/products/5
router.get('/products/:id', (req, res) => {
    getProductsByIdH(req, res);
})

module.exports = router;
