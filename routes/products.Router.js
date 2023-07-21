const express = require("express");
const productModel = require("../models/product.model");

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to the Server</h1><h2>Navigation</h2><ul><li><a href="/signup">Signup</a></li><li><a href="/login">Login</a></li><li><a href="/ALLProducts">Products</a></li><li><a href="/cart">Cart</a></li></ul>'
  );
});

productsRouter.get("/ALLProducts", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte, price } =
      req.query;
    const { title, rating, oldMRP, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (price) {
      filter.price = parseInt(price);
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (type) {
      filter.type = type;
    }
    if (_id) {
      filter._id = _id;
    }

    if (q) {
      const regexQ = new RegExp(q, "i");
      const fieldsToMatch = [
        "title",
        "rating",
        "description",
        "oldMRP",
        "discount",
        "price",
        "type",
      ];

      filter.$or = fieldsToMatch.map((field) => ({
        [field]: regexQ,
      }));
    }
    // console.log(filter);

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Popular_Combo_Deals", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Popular_Combo_Deals";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Calcium_supplement", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Calcium_supplement";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Spotlight", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Spotlight";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Treading", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Treading";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Breakfast", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Breakfast";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/Bodymassagers", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "Bodymassagers";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/FootHealth", async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, price_gte, price_lte } = req.query;
    const { title, rating, oldMRP, price, type, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    filter.type = "FootHealth";

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (title) {
      filter.title = title;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (oldMRP) {
      filter.oldMRP = oldMRP;
    }
    if (price) {
      filter.price = price;
    }

    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { rating: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { oldMRP: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // res.json({ data, totalPages });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = productsRouter;
