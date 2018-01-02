export function oneDay(Model, location) {
  let results;
  let ts = Math.floor(Date.now() / 1000);
  let tsYesterday = ts - (24 * 3600);
  if(Model && location) {
    return Model.find({ place: location }).where('time').gt(tsYesterday).sort('temp').exec();
  } else {
    throw "Incorrect params"
  }
}

export function singlePoint(Model, location) {
  let point;
  if(Model && location) {
    return Model.findOne({ place: location }).sort('-time').exec();
  } else {
    throw "Incorrect params"
  }
}
