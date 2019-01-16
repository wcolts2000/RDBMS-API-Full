
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('cohorts').truncate()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('cohorts').insert([
  //       {name: 'WEB15'},
  //       {name: 'WEB16'},
  //       {name: 'WEB17'}
  //     ]);
  //   });
  return (
    knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'WEB15'},
        {name: 'WEB16'},
        {name: 'WEB17'}
      ]);
    }), 
    knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Sean', cohort_id: 1},
        {name: 'Chaya', cohort_id: 1},
        {name: 'James', cohort_id: 1},
        {name: 'Sawyer', cohort_id: 1},
        {name: 'Will', cohort_id: 1},
        {name: 'Nick', cohort_id: 1},
        {name: 'Ben', cohort_id: 1},
        {name: 'Wes', cohort_id: 1},
        {name: 'Trai', cohort_id: 1}
      ]);
    }))
};
