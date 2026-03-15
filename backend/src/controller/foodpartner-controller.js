import foodPartnerModel from "../models/foodPartner.js";
import foodModel from "../models/foodItem.js";

async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);

  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ error: "Food partner not found" });
  }

  res.status(200).json({
    message: "Food partner fetched successfully",
    foodPartner,
    foodItems: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
}

export default getFoodPartnerById;
