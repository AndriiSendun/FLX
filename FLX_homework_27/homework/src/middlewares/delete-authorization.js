function deleteMiddleware(req, res, next) {
  const header = req.header('Authorization');

  if(header !== 'X-Password qwerty') {
    return res.status(401).json({message: 'Unauthorized'});
  }
  try {
    next();
  } catch(err) {
    res.status(400).json(err);
  }
}

module.exports = deleteMiddleware;
