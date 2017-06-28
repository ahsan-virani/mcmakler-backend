import rp from 'request-promise';

import { Neo } from '../models/neo';
import { base_url, NEO_API_KEY } from './constants';
import { dateToString } from '../utils';

function addNeos() {
  console.log('addnig neos');
  let addNeoProms = [];
  for (var i = 0; i < 51; i++) {
    const neo = new Neo({
      date: '20' + getRandomInt(14, 17) + '-07-22',
      //date: '20' + getRandomInt(14, 17) + '-0' + Math.random +'-22',
      reference: '12' + i,
      name: 'name' + i,
      speed: getRandomInt(20, 30),
      isHazardous: Math.random() > 0.5
    });
    addNeoProms.push(neo.save());
  }
  return Promise.all(addNeoProms);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function fetchNeoLast3Days() {
  let today = new Date();
  const endDate = dateToString(today, 'yyyy-mm-dd');
  today.setDate(today.getDate() - 1);
  const midDate = dateToString(today, 'yyyy-mm-dd');
  today.setDate(today.getDate() - 1);
  const startDate = dateToString(today, 'yyyy-mm-dd');

  var options = {
    uri: `${base_url}feed`,
    qs: {
      start_date: startDate,
      end_date: endDate,
      detailed: true,
      api_key: NEO_API_KEY
    },
    json: true
  };

  return rp(options)
    .then((resp) => {
      if (resp.element_count > 0) {
        const neoObjs = resp.near_earth_objects;
        let allPromises = [];
        for (var key in neoObjs) {
          if (neoObjs.hasOwnProperty(key)) {
            const promises = neoObjs[key].map((neoObj) => {
              const { neo_reference_id, name, close_approach_data, is_potentially_hazardous_asteroid } = neoObj;
              const neo = new Neo({
                date: key,
                reference: neo_reference_id,
                name,
                speed: close_approach_data[0].relative_velocity.kilometers_per_hour,
                isHazardous: is_potentially_hazardous_asteroid
              });
              return neo.save();
            });
            allPromises = allPromises.concat(promises);
          }
        }
        return Promise.all(allPromises);
      }
      return resp;
    })
    .catch((err) => {
      console.error(err);
    });
}

// var myArgs = process.argv.slice(2);

// console.log('adding neos');
// addNeos()
//   .then((result) => {
//     console.log('added!');
//   })
//   .catch(err => console.console.error);

export { fetchNeoLast3Days, addNeos };
