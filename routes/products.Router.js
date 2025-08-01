const express = require("express");
const productModel = require("../models/product.model");

const productsRouter = express.Router();

// Home Route
productsRouter.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Server</h1>
    <h2>Navigation</h2>
    <ul>
      <li><a href="/signup">Signup</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/ALLProducts">Products</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
  `);
});

// Utility: build filter from query
function buildFilter(query, fixedType = null) {
  const {
    title, rating, oldMRP, price, type, _id, q,
    price_gte, price_lte
  } = query;

  const filter = {};
  if (fixedType) filter.type = fixedType;
  if (title) filter.title = title;
  if (rating) filter.rating = rating;
  if (oldMRP) filter.oldMRP = oldMRP;
  if (price) filter.price = price;
  if (type && !fixedType) filter.type = type;
  if (_id) filter._id = _id;

  if (price_gte && price_lte) {
    filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
  }

  if (q) {
    const regexQ = new RegExp(q, "i");
    const numericQ = Number(q);
    filter.$or = [
      { title: regexQ },
      { description: regexQ },
      { type: regexQ },
      { discount: regexQ },
      ...(isNaN(numericQ)
        ? []
        : [{ rating: numericQ }, { price: numericQ }, { oldMRP: numericQ }]),
    ];
  }

  return filter;
}

// Utility: build sort options
function buildSortOptions({ _sort, _order }) {
  const sortOptions = {};
  if (_sort) {
    sortOptions[_sort] = _order === "desc" ? -1 : 1;
  }
  return sortOptions;
}

// Generic handler for product listing
async function handleProductQuery(req, res, fixedType = null) {
  try {
    const { _page = 1, _limit = 9 } = req.query;
    const page = parseInt(_page);
    const limit = parseInt(_limit);
    const skip = (page - 1) * limit;

    const filter = buildFilter(req.query, fixedType);
    const sortOptions = buildSortOptions(req.query);

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    return res.json({ data, totalPages });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}

// All Products
productsRouter.get("/ALLProducts", (req, res) =>
  handleProductQuery(req, res)
);

// Type-specific routes (all return { data, totalPages })
const types = [
  "Popular_Combo_Deals",
  "Calcium_supplement",
  "Spotlight",
  "Treading",
  "Breakfast",
  "Bodymassagers",
  "FootHealth"
];

types.forEach(type =>
  productsRouter.get(`/${type}`, (req, res) =>
    handleProductQuery(req, res, type)
  )
);

// Single Product by ID
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = productsRouter;
