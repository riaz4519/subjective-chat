const asyncHandler = require("../middleware/async");

const pagination = (model) =>
  asyncHandler(async (req, res, next) => {
    let total;

    const conditions = req.conditions ? req.conditions : null;

    total = conditions
      ? await model.find(conditions).countDocuments()
      : await model.find().countDocuments();
    let page = 1;
    let limit = 10;
    let now;

    if (req.query.page) {
      page = parseInt(req.query.page);
    }
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    now = page;
    skip = (page - 1) * limit;
    const pagination = {};

    //set previous page
    if (page > 1) {
      pagination.prev = now - 1;
    }

    if (total > page * limit) {
      pagination.next = now + 1;
    }

    const data = conditions
      ? await model
          .find(conditions)
          .sort("-createdAt")
          .skip(skip)
          .limit(limit)
          .select(req.selects ? req.selects : "")
      : await model
          .find()
          .sort("-createdAt")
          .skip(skip)
          .limit(limit)
          .select(req.selects ? req.selects : "");
    res.data = data;
    res.pagination = pagination;
    next();
  });

module.exports = pagination;
