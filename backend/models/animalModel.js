const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  animalCategory: {
    type: String,
    // required: [true, "कृपया पशु चुने |"],
  },
  breed: {
    type: String,
  },
  caughNumber: {
    type: Number,
    // required: [true, "कृपय पशु का ब्यात डाले, अर्थात पशु कितनी बार जना हे | "],
    // maxLength: [
    // 7,
    // "पशु ब्यात 7 से अधिक मान्य नहीं हे , आप अधिक से अधिक 7 डाल सकते हे |",
    // ],
    default: 0,
  },
  milkCurrent: {
    type: Number,
    // maxLength: [25, " अभी का दूध (प्रति-दिन), अमान्य!!"],
    default: 0,
  },
  milkCapacity: {
    type: Number,
    // maxLength: [25, "दूध की क्षमता (प्रति-दिन), अमान्य!!"],
    default: 0,
  },
  rate: {
    type: Number,
    // maxLength: [500000, "पशु की कीमत, अमान्य |"],
    // required: [true, "पशु की कीमत, आवश्यक |"],
  },
  isPregnent: {
    type: Boolean,
    default: false,
  },
  pregDuration: {
    type: Number,
    default: 0,
  },
  currentlyCaughOrNot: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // maxLength: [500, " कृपया 100 वाक्यों  से काम  लिखे !"],
  },
  images: [
    {
      public_id: {
        type: String,
        // required: [true, "पशु की फोटो , आवश्यक |"],
      },
      url: {
        type: String,
        // required: [true, "पशु की फोटो , आवश्यक |"],
      },
    },
  ],

  place: {
    type: String,
  },
  pinCode: {
    type: Number,
    // required: [true, "पशु का स्थान पिनकोड , आवश्यक |"],
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  sellerData: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  publishedOn: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Animal", animalSchema);
