import User from "../modals/userModel.js";

export const create = async (req, res) => {
  try {
    const {email} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userData = new User(req.body);
    if (!userData) {
      return res.status(201).send({ message: "Failed to create user data" });
    }
    const saveData = await userData.save();
    res.status(201).send({ message: "Your data has been added", saveData });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const getData = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(201).send({ msg: "UserData has not found" });
    }
    res.status(200).send({ message: "Your data has been found", userData });
  } catch (error) {
    res.status(400).send({ message: userData });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(201).send({ message: "UserId has not found" });
    }
    res.status(200).send({ message: "userId id find", userId });
  } catch (error) {}
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(201).send({ message: "UserId has not found" });
    }

    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "User has been updated successfully", updateData });
  } catch (error) {
    res.status(201).send({ message: "userId has been not found", error });
  }
};

export const deleteData = async (req, res) => {
  try {
      const id = req.params.id;
      const userId = await User.findById(id);
      if (!userId) {
          return res.status(404).send({ message: "Id has not been found" });
      }
      const userData = await User.findByIdAndDelete(id);
      return res.status(200).send({ message: "User  has been deleted successfully." });
  } catch (error) {
      return res.status(500).send({ message: "Error", error: error.message });
  }
}