const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// create main model
const User = db.users;

// main work
// 1. create user
const addUser = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      const successMessage = {
        message: "User created successfully!",
        status: "success",
      };
  
      res.status(200).json(successMessage);
      console.log(user);
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage = {
        message: "User creation failed",
        status: "error",
      };
      res.status(400).json(errorMessage);
    }
  };

//login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(400).send('User not found');
            return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, 'qwe1234', { expiresIn: '1h' });
            res.status(200).json({
                message: "Login successful",
                status: "success",
                token: token
            });
        } else {
            res.status(401).json(
                {
                    message: "Incorrect password",
                    status: "Failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "login failed",
        });
    }
};


// get all Users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['id','username', 'email','role'] });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Error fetching users' }); 
    }
  };
  

// get Single User
const getOneUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findOne({attributes: [id, 'username', 'email', 'role'], where: { id } });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "user not found",
                status: "success"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "error fetching user",
            status: "failed"
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({ where: { id } });

    if (!user) {
        res.status(404).json({
            message: "user not found",
            status: "success"
        });
        return;
    }

    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        await user.save();
        res.status(200).json({ 
            message: 'User updated!',
            status: "success"
     });
    } catch (error) {
        res.status(500).json({
            message:'Error updating user',
            status: "failed"
        }
           
    );
    }
};

const updateUserr = async (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;
  
    try {
        let user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({
            message: 'User not found',
            status: "success"
        });
      }
      if (updatedFields.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updatedFields.password, saltRounds);
        updatedFields.password = hashedPassword;
      }
      await user.update(updatedFields);
      await user.save();
      res.status(200).send({ 
        message: 'User updated!',
        status: "success"
     });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        message: 'Error updating user',
        status: "failed"
    });
    }
  };
  

// Delete any User
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedCount = await User.destroy({ where: { id } });
        if (deletedCount > 0) {
            res.status(200).json({
                message: 'User is deleted',
                status: "success"
        });
        } else {
            res.status(404).json({
                message:'User not found',
                status:'success'
            });
        }
    } catch (error) {
        res.status(500).json({
            message:'Error deleting user',
            status: "failed"
        });
    }
};

module.exports = {
    addUser,
    loginUser,
    getAllUsers,
    getOneUser,
    updateUser,
    updateUserr,
    deleteUser,
}
