export const registerController = (req,res,next) => {
    try {
        throw new Error("User side Error");
    } catch (error) {
        error.status=400
        next(error)
    }
};
