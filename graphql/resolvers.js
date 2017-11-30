// import { MongoClient, ObjectId } from "mongodb";
import { GraphQLDateTime } from "graphql-iso-date";
import mongoose from "mongoose";
import debug from "debug";
import fs from "fs";
import path from "path";
import Dogs from "./models/dog";

const logger = debug("dg:resolvers");
const elogger = debug("dg:resolvers_error");

const MONGO_URL = "mongodb://localhost:27017/nuxt-dogs";
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we'er connected!
  console.log("mongo connected");
  seedData(Dogs, path.resolve(`${process.env.PWD}/graphql/data/dogs.json`), {
    clean: false,
  });
});

async function seedData(model, dataFile, opts) {
  if (model && fs.existsSync(dataFile)) {
    if (opts.clean && process.env.NODE_ENV === "development") {
      await model.remove({});
    }
    const cnt = await model.count({});
    if (cnt === 0) {
      const { data } = JSON.parse(fs.readFileSync(dataFile));
      if (data && data.length > 0) {
        data.forEach(element => {
          const obj = new model(element);
          obj.save();
        });
      }
    }
  }
}

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
