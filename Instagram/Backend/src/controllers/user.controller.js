const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 * Follow a User
 */
async function followUserController(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  /**
   * Checking if followee exists or not ,if not then return
   */
  const isFolloweeExist = await userModel.findOne({ username: followee });
  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "User doesn't exist !",
    });
  }

  /**
   * If user is trying to follow himself then return
   */
  const isSameAccount = follower === followee;
  if (isSameAccount) {
    return res.status(403).json({
      message: "You cannot follow yourself !",
    });
  }

  /**
   * If user has already followed then return
   */
  const isAlreadyFollowed = await followModel.findOne({
    follower: follower,
    followee: followee,
  });

  if(isAlreadyFollowed){
    return res.status(400).json({
        message:"You have already followed this user !"
    })
  }

  /**
   * Created model which will show relation between user follower and followee
   */
  const followRecord = await followModel.create({
    follower: follower,
    followee: followee,
  });

  return res.status(201).json({
    message: `${follower} Followed ${followee} Successfully`,
    followRecord,
  });
}

module.exports = {
  followUserController,
};
