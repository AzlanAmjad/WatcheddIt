const connect = require('../database');

exports.postPost = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('PostEvents')
      .insertOne({
        type: 'update',
        data: req.body,
        user: req.session.user.username,
        timestamp: new Date(),
      });

    res.sendStatus(200);
  } else {
    res.status(401).send("Can't PUT post, not logged in");
  }
};
