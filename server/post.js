import { validate, validPlace } from './utils';
import { DataModel } from './database/models';

function handlePost(req, res) {
  // Validate data, make object if valid
  if(validate(req.query) && validPlace(req.query.place) && !isNaN(parseInt(req.query.temp))) {
    let data = new DataModel({
      temp: parseInt(req.query.temp),
      time: Math.floor(Date.now() / 1000),
      place: req.query.place,
    });

    // Save data
    data.save(err => {
      if(err) {
        res.status(500).send({ error: 'Error saving data!: ' + err});
        return;
      };
      res.send('Added data');
    });
  } else {
    // If not valid
    res.status(500).send({ error: 'Not valid object' });
  }
}

export default handlePost;
