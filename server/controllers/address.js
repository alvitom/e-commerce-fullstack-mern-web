const Address = require("../models/Address");
const User = require("../models/User");

exports.getAddressUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const userAddress = await Address.findOne({ userId: user._id });

    res.status(200).json(userAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAddressUser = async (req, res) => {
  const { userId, name, phone, province, city, subdistrict, postCode, detail } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    let userAddress = await Address.findOne({ userId: user._id });

    if (!userAddress) {
      userAddress = new Address({
        userId: user._id,
        address: [],
      });
    }

    userAddress.address.push({ name, phone, province, city, subdistrict, postCode, detail });

    await userAddress.save();

    res.status(200).json(userAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
