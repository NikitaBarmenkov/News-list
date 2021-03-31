function handle(err, req, res, next) {
  if (err.status !== 500) {
    res.status(err.status);
    res.json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
  });

  next(err);
}

module.exports = handle;
