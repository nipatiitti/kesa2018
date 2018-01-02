import { oneDay, singlePoint } from './database/queries';
import { hasProp, places, validPlace } from './utils';
import { DataModel } from './database/models';

async function handleGet(req, res) {
  if(hasProp(req.query, "mode") && hasProp(req.query, "place") && validPlace(req.query.place)) {
    let mode = req.query.mode;
    let place = req.query.place;
    switch (mode) {
      case "day":
        let place = req.query.place;
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
      break;

      case "every":
        try {
          let data = [];
          await Promise.all(places.map(async (location) => {
            let dataToPush = await singlePoint(DataModel, location);
            if(dataToPush !== null)
              data.push(dataToPush);
          }));
          if (data.lenght > 0)
            res.json(data);
          else
            res.status(500).send({ error: 'Error, No data for any location' });
        } catch(e) {
          console.log(e);
          res.status(500).send(e);
        }
      break;

      case "single":
      default:
        try {
          let data = await singlePoint(DataModel, place);
          if (data === null) {
            res.status(500).send({ error: 'No data for this location' });
          }else {
            res.json(data);
          }
        } catch(e) {
          console.log(e);
          res.status(500).send(e);
        }
    }
  } else if(hasProp(req.query, "place") && !validPlace(req.query.place)){
    res.status(500).send({ error: 'Valid place needed' });
  } else if(hasProp(req.query, "place") && !validPlace(req.query.place)){
    res.status(500).send({ error: 'Valid place needed' });
  }

}

export default handleGet;
