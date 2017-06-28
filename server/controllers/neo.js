import { Neo } from '../models/neo';

function all(req, res) {
  Neo.find()
    .then((neos) => {
      res.json(neos);
    })
    .catch(res.send);
}

function hazardous(req, res) {
  Neo.getAllHazardous()
    .then((resp) => {
      res.json(resp);
    })
    .catch(res.send);
}

function fastest(req, res) {
  Neo.getFastest(req.query.hazardous === 'true')
    .then((resp) => {
      res.json(resp);
    })
    .catch(res.send);
}

function getBest(filter, neos) {
  try {
    let neoFilters = {};
    let maxNeosFilter = { filter: '', neos: 0 };
    console.log('get best');
    console.log('filter', filter);
    neos.forEach((oneNeo) => {
      let currFilter;
      switch (filter) {
        case 'year':
          currFilter = new Date(oneNeo.date)
            .getFullYear();
          break;
        case 'month':
          currFilter = new Date(oneNeo.date)
            .getMonth();
          break;
        default:
          throw 'Invalid filter';
      }

      if (neoFilters.hasOwnProperty(currFilter))
        neoFilters[currFilter]++;
      else {
        neoFilters[currFilter] = 1;
      }
      if (maxNeosFilter.filter === '')
        maxNeosFilter = { filter: currFilter, neos: neoFilters[currFilter] };
      else {
        if (maxNeosFilter.neos < neoFilters[currFilter])
          maxNeosFilter = { filter: currFilter, neos: neoFilters[currFilter] }
      }
    });
    console.log('neoFilters', neoFilters);
    return Promise.resolve(maxNeosFilter.filter);
  } catch (e) {
    return Promise.reject(e);
  }

}

function bestMonth(req, res) {
  Neo.getAllHazardous(req.query.hazardous === 'true')
    .then((neos) => {
      getBest('month', neos)
        .then((bestM) => {
          res.json(Number(bestM) + 1);
        })
    })
    .catch(e => res.send);
}

function bestYear(req, res) {
  Neo.getAllHazardous(req.query.hazardous === 'true')
    .then((neos) => {
      getBest('year', neos)
        .then((year) => {
          res.json(year);
        })
    })
    .catch(e => res.send);
}

export default { all, hazardous, fastest, bestYear, bestMonth }
