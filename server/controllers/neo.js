import { Neo } from '../models/neo';

function all(req, res) {
  Neo.find()
    .then((neos) => {
      res.json(neos);
    })
    .catch(e => res.send(e));
}

function hazardous(req, res) {
  Neo.getAllHazardous()
    .then((resp) => {
      res.json(resp);
    })
    .catch(e => res.send(e));
}

function fastest(req, res) {
  Neo.getFastest(req.query.hazardous === 'true')
    .then((resp) => {
      res.json(resp);
    })
    .catch(e => res.send(e));
}

function getBest(filter, neos) {
  try {
    if (neos === undefined || neos.length === 0)
      throw ('No NEOs found');
    let neoFilters = {};
    let maxNeosFilter = { filter: '', neos: 0 };
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
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));
}

function bestYear(req, res) {
  Neo.getAllHazardous(req.query.hazardous === 'true')
    .then((neos) => {
      getBest('year', neos)
        .then((year) => {
          res.json(year);
        })
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));
}

export default { all, hazardous, fastest, bestYear, bestMonth }
