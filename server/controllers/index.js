import { fetchNeoLast3Days } from '../neo';

function hello(req, res) {
  res.json({ hello: 'world' });
}

function getInitalData(req, res) {
  fetchNeoLast3Days()
    .then((neos) => {
      res.send('Fetched last 3 days data');
    })
    .catch(e => res.send(e));
}

export default { hello, getInitalData }
