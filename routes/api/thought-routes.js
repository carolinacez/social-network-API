const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought,
    addReaction, 
    updateThought, 
    deleteThought 
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


module.exports = router;