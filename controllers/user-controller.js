const { User, Thought } = require('../models'); 

const userController = {

    getAllUser(req, res) {
        
        User.find()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(400).json(err)
        })
    }, 

    getUserbyId({ params }, res) {
        User.findOne ({_id : params.id}) 
        .populate ('thought')
        .populate ('friends')
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    }, 
    
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err)); 
    }, 

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id : req.params.id },
             {$set : req.body}, 
             {runValidators : true, new: true})
        .then (dbUserData => {
            if (!dbUserData) {
                return res.status(404).json(err);
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }, 

    deleteUser(req, res) {
        User.findOneAndDelete({_id : req.params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json(err);
            }
            return Thought.deleteMany({_id:{$in: req.params.id}})
            // res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }


    
}