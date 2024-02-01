const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: [
    {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      province: {
        type: String,
      },
      city: {
        type: String,
      },
      subdistrict: {
        type: String,
      },
      postCode: {
        type: String,
      },
      detail: {
        type: String,
      },
    },
  ],
});

const Address = mongoose.model("addresses", addressSchema);

module.exports = Address;
