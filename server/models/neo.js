import mongoose from 'mongoose';

const NeoSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reference: { type: String, required: true },
  name: { type: String, required: true },
  speed: { type: String, required: true },
  isHazardous: { type: Boolean, required: true },
});

NeoSchema.statics = {
  getAllHazardous(isHazardous = true) {
    return this.find({ isHazardous })
      .then((hazardousNeos) => {
        return hazardousNeos.map((oneNeo) => {
          return {
            date: oneNeo.date,
            reference: oneNeo.reference,
            name: oneNeo.name,
            speed: oneNeo.speed,
            isHazardous: oneNeo.isHazardous
          };
        });
      })
  },
  getFastest(isHazardous) {
    return this.getAllHazardous(isHazardous)
      .then((neos) => {
        const fastestNeo = neos.reduce((acc, val) => {
          return acc.speed > val.speed ? acc : val;
        }, neos[0]);
        return fastestNeo;
      });
  }
}

const Neo = mongoose.model('Neo', NeoSchema);

export default { Neo };
