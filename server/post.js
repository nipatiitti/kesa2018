import { validate } from './utils';
import { DataModel } from './database/models';

function handlePost(req, res) {
  // Validate data, make object if valid
  if(validate(req.query)) {
    let data = new DataModel({
      temp: req.query.temp,
      time: Math.floor(Date.now() / 1000),
      place: req.query.place,
    });

    // Save data
    data.save(err => {
      if(err) {
        res.status(500).send({ error: 'Error saving data!' });
        return;
      };
      res.send('Added data');
    });
  } else {
    // If not valid
    res.status(500).send({ error: 'Not valid' });
  }
}

export default handlePost;
