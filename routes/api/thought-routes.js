const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought,
    addReaction, 
    updateThought, 
    deleteThought, 
    deleteReaction
} = require('../../controllers/thought-controller');


router.route('/thoughts')
.get(getAllThoughts)
.post(createThought)


router
.route('/:id')
.get(getThoughtById) 
.put(updateThought) 
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)


module.exports = router;