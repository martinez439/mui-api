const router = require('express').Router();
let NewReminder = require('../models/reminderModel');

router.route('/').get((req, res) => {
  NewReminder.find({isComplete: false})
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/unchecked').get((req, res) => {
  NewReminder.find({isComplete: true})
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


router.route("/:id").patch((req, res) => {
  NewReminder.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Reminder updated to complete status."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  NewReminder.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reminder deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;