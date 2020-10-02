const { Schema, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: 
            {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
            },
        
        reactionBody: {
            type: Date,
            required: 'This field is required',
            maxlength: 280
        },
        
        username: {
            type: String, 
            required: 'username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


// export the User model
module.exports = ReactionSchema;