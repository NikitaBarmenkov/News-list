function handle(err, req, res) {
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
}

module.exports = handle;
