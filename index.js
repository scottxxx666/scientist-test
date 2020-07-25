"use strict";

const _ = require('underscore');
const Scientist = require('scientist');
const scientist = new Scientist();
const science = scientist.science.bind(scientist);

scientist.on('result', function (result) {
  const control = result.control;

  const each = function (set, iterator) {
    for (let i = 0; i < result[set].length; i++) {
      iterator(result[set][i]);
    }
  };

  // Log failures with observations
  each('mismatched', function (candidate) {
    console.error("Experiment candidate did not match the control", {
      context: result.context,
      expected: control.inspect(),
      received: candidate.inspect(),
    });
  });
});

const sumList = (arr) => {
  return science('sum-list', (experiment) => {
    experiment.context({ desc: 'test sum list', input: arr });
    experiment.use(() => sumListOld(arr));
    experiment.try(() => sumListNew(arr));
  });
};

const sumListOld = (arr) => {
  let sum = 0;
  for (let i of arr) {
    sum += i;
  }
  return sum;
};

const sumListNew = (arr) => {
  return _.reduce(arr, (sum, i) => sum + i);
};

console.log(sumList([1, 2, 3]));
console.log(sumList([]));
