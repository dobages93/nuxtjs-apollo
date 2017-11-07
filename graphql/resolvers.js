// import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/nuxt-dogs";
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we'er connected!
  console.log("mongo connected");
});

const DogSchema = new mongoose.Schema({ breed: String, __v: Number, v: Number });
const Dogs = mongoose.model("dogs", DogSchema);

// const prepare = o => {
//   o._id = o._id.toString();
//   return o;
// };

export const resolvers = {
  RootQuery: {
    testString: () => "resolved test string",

    Breeds: async () => {
      const dogs = await Dogs.find({});
      console.log("dogs:", dogs);
      return dogs.filter(d => d.breed).map(d => {
        // NOTE: GraphQL cmplains about fields that start with __ so change it
        d.v = d.__v;
        delete d.__v;
        return d;
      });
    },
    // breeds: () => [
    //   'affenpinscher',
    //   'african',
    //   'airedale',
    //   'akita',
    //   'appenzeller',
    //   'basenji',
    //   'beagle',
    //   'bluetick',
    //   'borzoi',
    //   'bouvier',
    //   'boxer',
    //   'brabancon',
    //   'briard',
    //   'bulldog',
    //   'bullterrier',
    //   'cairn',
    //   'chihuahua',
    //   'chow',
    //   'clumber',
    //   'collie',
    //   'coonhound',
    //   'corgi',
    //   'dachshund',
    //   'dane',
    //   'deerhound',
    //   'dhole',
    //   'dingo',
    //   'doberman',
    //   'elkhound',
    //   'entlebucher',
    //   'eskimo',
    //   'germanshepherd',
    //   'greyhound',
    //   'groenendael',
    //   'hound',
    //   'husky',
    //   'keeshond',
    //   'kelpie',
    //   'komondor',
    //   'kuvasz',
    //   'labrador',
    //   'leonberg',
    //   'lhasa',
    //   'malamute',
    //   'malinois',
    //   'maltese',
    //   'mastiff',
    //   'mexicanhairless',
    //   'mountain',
    //   'newfoundland',
    //   'otterhound',
    //   'papillon',
    //   'pekinese',
    //   'pembroke',
    //   'pinscher',
    //   'pointer',
    //   'pomeranian',
    //   'poodle',
    //   'pug',
    //   'pyrenees',
    //   'redbone',
    //   'retriever',
    //   'ridgeback',
    //   'rottweiler',
    //   'saluki',
    //   'samoyed',
    //   'schipperke',
    //   'schnauzer',
    //   'setter',
    //   'sheepdog',
    //   'shiba',
    //   'shihtzu',
    //   'spaniel',
    //   'springer',
    //   'stbernard',
    //   'terrier',
    //   'vizsla',
    //   'weimaraner',
    //   'whippet',
    //   'wolfhound',
    // ]
  },
  RootMutation: {
    createBreed(obj, args) {
      const { input } = args;
      if (input) {
        console.log(`createBreed mutation for: ${input}`);
        try {
          const dog = new Dogs({ breed: input, __v: 0 });
          dog.save();
          // console.log(`dog: ${JSON.stringify(dog)}`);
          dog.v = dog.__v;
          console.log(`modified dog: ${JSON.stringify(dog)}`);
          return { _id: dog._id, breed: dog.breed, v: dog.v };
        } catch (error) {
          console.log(`Dog save error: ${error.message}`);
          return false;
        }
      }
    },
  },
};
