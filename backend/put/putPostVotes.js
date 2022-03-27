const connect = require('../database');
const {ObjectId} = require("mongodb");

exports.putPostVote = (req, res) => {
    if (req.session.user) {
        if (typeof req.body.vote !== "boolean") {
            res.status(400).send('Error - Invalid Vote Value');
            return;
        }
        console.log('Update vote');
        const dbConnect = connect.getDb();
        dbConnect.collection('CommentVotes')
            .updateOne({
                commentID: ObjectId(req.params.commentID),
                username: req.session.user.username,
            }, {
                $set: {vote: req.body.vote},
            }, (err, result) => {
                if (err) {
                    console.error(`Failed to find documents: ${err}`);
                    res.status(400).send('Error updating Rating');
                } else {
                    console.log('Rating updated');
                    res.status(200).json(result);
                }
            });
    } else {
        res.status(401).send("Can't PUT post vote, not logged in");
    }
};
