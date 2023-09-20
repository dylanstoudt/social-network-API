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
        { _id: req.params.userId },
        { username: req.body.username },
        { new: true }
      )
      console.log(updatedUser);
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
      res.status(200).json(deletedUser)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Add Friend
  async addFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      const friendId = req.body.friendId; 

      if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'User is already a friend' });
      }

      user.friends.push(friendId);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete Friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      const userId = req.body.userId;

      if (!userId) {
        return res.status(400).json({ message: 'Friend ID is required' });
      }

      if (!user.friends.includes(userId)) {
        return res.status(400).json({ message: 'User is not a friend' });
      }

      user.friends = user.friends.filter((id) => id !== userId);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};