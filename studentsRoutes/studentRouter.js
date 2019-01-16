const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

// add student
router.post('/', (req, res) => {
  const { name } = req.body;

  if(name.length) {
    db('students')
      .insert(req.body)
      .then( ids => {
        db('students')
          .where({id: ids[0]})
          .then(student => {
            res.status(201).json(student)
          });
      })
      .catch(err => res.status(500).json({ message: "there was an error saving the student"}));
  } else {res.status(400).json({ message: " Must include a student name"})}
})

// list students
router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ message: "there was an error retrieving the students data"}))
});

// list single student
// router.get('/:id', (req, res) => {
//   db('students')
//     .where({id: req.params.id})
//     .then(student => {
//       if(student.length) {
//         res.status(200).json(student)
//       } else {
//         res.status(404).json({ message: "No student by that id"})
//       }
//     })
//     .catch(err => res.status(500).json({ message: "there was an error retrieving the student data"}))
// });

router.get('/:id', (req, res) => {
  db('students')
    .where({id: req.params.id})
    .then(student => {
      if(student.length) {
        console.log(student[0].cohort_id);
        db('cohorts')
        .where({id: student[0].cohort_id})
        .then(cohort => {
            res.status(200).json({id: student[0].id, name: student[0].name, cohort: cohort[0].name})
        })
        .catch(err => res.status(500).json({message: "there was an error retrieving the data"}))

        // res.status(200).json(student)
      } else {
        res.status(404).json({ message: "No student by that id"})
      }
    })
    .catch(err => res.status(500).json({ message: "there was an error retrieving the student data"}))
});

//update student
router.put('/:id', (req, res) => {
  const changedstudent = req.body;

  if(changedstudent.name.length) {
    db('students')
      .where({ id: req.params.id})
      .update(changedstudent)
      .then(count => {
        if(count) {
          res.status(200).json(count)
        } else {
          res.status(404).json({ message: "No student with that id"})
        }
      })
      .catch(err => res.status(500).json({ message: "there was an error updating the student"}))
  } else { res.status(400).json({ message: "Must provide name updates"})}
})

// delete student
router.delete('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id})
    .del()
    .then(count => {
      if(count) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: 'no student with that id'})
      }
    })
    .catch(err => res.status(500).json({ message: "there was an error deleting the student"}))
})

module.exports = router;