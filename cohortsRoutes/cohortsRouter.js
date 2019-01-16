const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

// add cohort
router.post('/', (req, res) => {
  const { name } = req.body;

  if(name.length) {
    db('cohorts')
      .insert(name)
      .then( ids => {
        db('cohorts')
          .where({id: ids[0]})
          .then(cohort => {
            res.status(201).json(cohort)
          });
      })
      .catch(err => res.status(500).json({ message: "there was an error saving the cohort"}));
  } else {res.status(400).json({ message: " Must include a cohort name"})}
})

// list cohorts
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({ message: "there was an error retrieving the cohorts data"}))
});

// list single cohort
router.get('/:id', (req, res) => {
  db('cohorts')
    .where({id: req.params.id})
    .then(cohort => {
      if(cohort.length) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({ message: "No Cohort by that id"})
      }
    })
    .catch(err => res.status(500).json({ message: "there was an error retrieving the cohort data"}))
});

//update cohort
router.put('/:id', (req, res) => {
  const changedCohort = req.body;

  if(changedCohort.name.length) {
    db('cohorts')
      .where({ id: req.params.id})
      .update(changedCohort)
      .then(count => {
        if(count) {
          res.status(200).json(count)
        } else {
          res.status(404).json({ message: "No cohort with that id"})
        }
      })
      .catch(err => res.status(500).json({ message: "there was an error updating the cohort"}))
  } else { res.status(400).json({ message: "Must provide name updates"})}
})

// delete cohort
router.delete('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id})
    .del()
    .then(count => {
      if(count) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: 'no cohort with that id'})
      }
    })
    .catch(err => res.status(500).json({ message: "there was an error deleting the cohort"}))
})

module.exports = router;