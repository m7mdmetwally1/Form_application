exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (!error) {
      console.log("no error");
      next();
    } else {
      res.status(500).json({
        status: "error",
        message: error.details,
      });
    }
  };
};
