import { oneDay, singlePoint } from './database/queries';
import { hasProp, places, validPlace } from './utils';
import { DataModel } from './database/models';

async function handleGet(req, res) {
  // Check for mode
  if(hasProp(req.query, "mode")) {
    let mode = req.query.mode;
    switch (mode) {

      // Get Single day for one place
      case "day":
        if(hasProp(req.query, "place") && validPlace(req.query.place)){
          let place = req.query.place;
          try {
            let data = await oneDay(DataModel, place);
            res.json(data);
          } catch(e) {
            console.log(e);
            res.status(500).send(e);
          }
        } else {
          res.status(500).send({error: "Location needed for this mode"});
        }
      break;

      // Get most resent for all places
      case "every":
        try {
          let data = [];
          await Promise.all(places.map(async (location) => {
            let dataToPush = await singlePoint(DataModel, location, 1);
            data.push(dataToPush[0]);
          }));
          res.json(data);
        } catch(e) {
          console.log(e);
          res.status(500).send(e);
        }
      break;

      // Default: Incorrect mode
      default:
        res.status(500).send({error: "Invalid mode"});
    }
  }
  // If there is no mode but place get n for one day
  else if(hasProp(req.query, "place") && validPlace(req.query.place)){
    let place = req.query.place;
    let n;
    if(hasProp(req.query, "n")) {
      n = parseInt(req.query.n);
      console.log(n);
      if(isNaN(n)){
        // If not proper number default to 1
        n = 1;
      }
    } else {
      // If n isn't defined default to 1
      n = 1;
    }
    try {
      // Fetch n amount for single location
      let data = await singlePoint(DataModel, place, n);
      res.json(data);
    } catch(e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  // ONLY FOR DEVELOPMENT!! Comment out in production
  else if(hasProp(req.query, "delete") && req.query.delete === "true"){
    DataModel.remove({}, (err) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.send("Done");
      }
    })
  }

}

export default handleGet;
