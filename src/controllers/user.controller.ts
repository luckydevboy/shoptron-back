import User from "@/models/user.model";
import catchAsync from "@/utils/catchAsync";

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    status: "success",
    data: users,
  });
});
