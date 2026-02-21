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
    const isFolloweeExist = await userModel.findOne({username: followee});
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

    if (isAlreadyFollowed) {
        return res.status(400).json({
            message: "You have already followed this user !",
        });
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

/**
 * Unfollow a User
 */
async function unfollowUserController(req, res) {
    const follower = req.user.username;
    const followee = req.params.username;

    /**
     * Checking if followee exists or not ,if not then return
     */
    const isFolloweeExist = await userModel.findOne({username: followee});
    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "User doesn't exist !",
        });
    }

    /**
     * If user is trying to unfollow himself then return
     */
    const isSameAccount = follower === followee;
    if (isSameAccount) {
        return res.status(403).json({
            message: "It's your account Sir ji !",
        });
    }

    /**
     * Checking whether user follows the followee,if not then return
     */
    const isFollowUser = await followModel.findOne({
        follower: follower,
        followee: followee,
    });

    if (!isFollowUser) {
        return res.status(404).json({
            message: `You dont follow ${followee}`,
        });
    }

    /**
     * Unfollowing by deleting record from database
     */
    const unfollowRecord = await followModel.findByIdAndDelete(isFollowUser._id);

    return res.status(201).json({
        message: "User unfollowed successfully !",
        unfollowRecord,
    });
}


/**
 * Accepts user follow Request
 */
async function followStatusController(req, res) {
    const follower = req.params.username
    const followee = req.user.username
    const {status} = req.body

    /**
     * Checks if status is there or not
     */
    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    /**
     * Checks status only takes accpeted and rejected
     */
    if (status != "accepted" && status != "rejected") {
        return res.status(400).json({
            message: "Invalid Status !"
        })
    }

    /**
     * Updates the follow Model
     */
    const followStatusUpdate = await followModel.findOneAndUpdate({
        follower: follower,
        followee: followee,
        status:"pending"
    }, {
        status: status
    }, {
        returnDocument: "after"
    })

    /**
     * If not present in the DB it will return
     */
    if (!followStatusUpdate) {
        return res.status(404).json({
            message: "No request Found."
        })
    }

    return res.status(200).json({
        message: `Follow request ${status} !`,
        followStatusUpdate
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    followStatusController,
};
