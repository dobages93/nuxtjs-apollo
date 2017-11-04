import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL = "mongodb://localhost:27017/nuxt-dogs";
let Dogs = null;

const prepare = o => {
  o._id = o._id.toString();
  return o;
};

const connectToMongo = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  Dogs = db.collection("dogs");
};
connectToMongo();

export const resolvers = {
  RootQuery: {
    testString: () => "resolved test string",

    Breeds: async () => {
      const dogs = await Dogs.find({}).toArray();
      console.log("dogs:", dogs);
      return dogs.filter(d => d.breed).map(prepare);
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
      // console.log("createBreed called");
      // console.log(`args: ${JSON.stringify(args)}`);
      const { input } = args;
      if (input) {
        console.log(`createBreed mutation for ${input}`);
        const res = Dogs.insert({ _id: new ObjectId(), breed: input });
        if (res) {
          return true;
        }
      }
      return false;
    },
    // clearBreeds() {
    //   const res = Dogs.remove({ breed: null }, { multi: true });
    //   if (res) {
    //     return true;
    //   }
    //   return false;
    // },
  },
};
