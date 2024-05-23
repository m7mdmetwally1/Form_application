exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    console.log("after validation error");

    if (!error) {
      next();
    } else {
      res.status(500).json({
        status: "error",
        message: error.details,
      });
    }
  };
};
