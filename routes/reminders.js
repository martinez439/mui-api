const router = require('express').Router();
let NewReminder = require('../models/reminderModel');

router.route('/').get((req, res) => {
  NewReminder.find({isComplete: false})
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/unchecked').get((req, res) => {
  NewReminder.find()
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const reminder = req.body.reminder;
  const isComplete = req.params.isComplete;

  const newReminder = new NewReminder({reminder, isComplete});

  newReminder.save()
    .then(() => res.json('Reminder added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;