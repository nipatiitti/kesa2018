import { oneDay, singlePoint } from './database/queries';
import { hasProp, places, validPlace } from './utils';
import { DataModel } from './database/models';

async function handleGet(req, res) {
  if(hasProp(req.query, "place") && validPlace(req.query.place)) {
    let place = req.query.place;

    if(hasProp(req.query, "day") && req.query.day == "true") {
      try {
        let data = await oneDay(DataModel, place);
        if (data === "undefined") {
          res.status(500).send({ error: "Can't fetch hole day" });
        }else {
          res.json(data);
        }
      } catch(e) {
        console.log(e);
        res.status(500).send(e);
      }
    }

    else if( hasProp(req.query, "all") && req.query.all == "true") {
      try {
        let data = [];
        places.forEach((location) => {
          let dataToPush = await singlePoint(DataModel, location);
          if(dataToPush !== undefined)
            data.push(dataToPush);
        })
        if (data.lenght > 0)
          res.json(data);
        else
          res.status(500).send({ error: 'Error, No data for any location' });
      } catch(e) {
        console.log(e);
        res.status(500).send(e);
      }
    }

    else {
      try {
        let data = await singlePoint(DataModel, place);
        if (data === "undefined") {
          res.status(500).send({ error: 'No data for this location' });
        }else {
          res.json(data);
        }
      } catch(e) {
        console.log(e);
        res.status(500).send(e);
      }
    }

  }

  else if (hasProp(req.query, "place")) {
    res.send('Invalid place');
    return;
  }

  else {
    res.send('Welcome to the api!')
  }
}

export default handleGet;
