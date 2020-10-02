const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reaction = require('./Reaction')

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: 'Text is required', 
            minlength: 1, 
            maxlength: 280 
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        
        username: {
            type: String, 
            required: 'username is required'
        },
        
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the User model
module.exports = Thought;