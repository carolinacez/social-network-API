const { User, Thought } = require('../models'); 

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err)
        })
    }, 

    getThoughtById({ params }, res) {
        Thought.findOne ({_id : params.id}) 
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
    
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                { $push: { thought: _id}},
                {new: true}
            )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json(err);
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }, 

    addReaction({params, body}, res) {
       Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: { reactions: body}},
            {runValidators: true, new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json(err);
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate (
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json(err);
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id : req.params.id },
             {$set : req.body}, 
             {runValidators : true, new: true})
        .then (dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json(err);
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }, 

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id : params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json(err);
            }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

}; 

module.exports = thoughtController; 