const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');
const { create } = require('../../models/User');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtid/reactions/:reactionId').delete(deleteReaction)

module.exports = router