// import { MongoClient, ObjectId } from "mongodb";
import { GraphQLDateTime } from "graphql-iso-date";
import mongoose from "mongoose";
import debug from "debug";

const logger = debug("dg:resolvers");
const elogger = debug("dg:resolvers_error");

const MONGO_URL = "mongodb://localhost:27017/nuxt-dogs";
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we'er connected!
  console.log("mongo connected");
});

const DogSchema = new mongoose.Schema(
  {
    breed: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
  },
  { versionKey: "v" },
);
const Dogs = mongoose.model("dogs", DogSchema);

export const resolvers = {
  Date: GraphQLDateTime,

  RootQuery: {
    testString: () => "resolved test string",

    Breeds: async () => {
      const dogs = await Dogs.find({}).lean();
      // console.log("dogs:", dogs);
      return dogs;
    },
  },

  RootMutation: {
    async createBreed(obj, args) {
      const { input } = args;
      if (input) {
        logger(`createBreed mutation input: ${input}`);
        try {
          const dog = new Dogs({ breed: input });
          dog.save();
          logger("createBreed mutation output: %j", dog.toObject());
          return dog.toObject();
        } catch (error) {
          elogger(`Dog save error: ${error.message}`);
          return false;
        }
      }
    },
  },
};

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
