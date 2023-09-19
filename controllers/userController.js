const User = require('../models/User');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get Single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update User
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {username: req.params.userId},
        {username: req.body.username}
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({username: req.params.userId});
      res.status(200).json(deletedUser)
    } catch (error) {
      res.status(500).json(error);
    }
  }
};