import Product from "../models/productsModel";
import { uploadFile } from "../services/storage.service";

export async function createProduct(req, res, next) {
  try {
    const { title, description, price } = req.body;
    const seller = req.user;
    const files = req.files || [];

    if (!files.length) {
      const error = new Error("At least one image is required");
      error.statusCode = 400;   
      return next(error);
    }

    //upload images to imagekit
    const uploadedImages = await Promise.all(
      files.map((file) =>
        uploadFile(file.buffer, file.originalname, `/products/${seller._id}`)
      )
    );

    //to create a product we need the img urls 
    const imageUrls = uploadedImages.map((image) => ({ url: image.url }));

    const product = await Product.create({
      title,
      description,
      seller: seller._id,
      price: {
        amount: price,
        currency: "INR",
      },
      imgaes: imageUrls,
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("createProduct error:", error);
    next(error);
  }
}
