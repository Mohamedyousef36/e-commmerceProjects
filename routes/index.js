// Routes
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import categoryRoute from "./categoryRoute.js";
import subCategoryRoute from "./subcategoryRoute.js";
import brandRoute from "./brandRoute.js";
import reviewRoute from "./reviewRoute.js";
import productRoute from "./productRoute.js";
import wishListRoute from "./wishListRoute.js";
import addressesRoute from "./addressesRoute.js";
import cartRoute from "./cartRoute.js";
import couponRoute from "./couponRoute.js";
import orderRoute from "./orderRoute.js";
import notFound from "../config/notFound.js";

const mountRoutes = (app) => {
    
app.use("/api/vi/user", userRoute); //
app.use("/api/vi/auth", authRoute);
app.use("/api/vi/category", categoryRoute);
app.use("/api/vi/subcategory", subCategoryRoute);
app.use("/api/vi/brand", brandRoute);
app.use("/api/vi/review", reviewRoute); // 
app.use("/api/vi/products", productRoute); 
app.use("/api/vi/wishlist", wishListRoute); 
app.use("/api/vi/addresses", addressesRoute);
app.use("/api/vi/coupons", couponRoute);
app.use("/api/vi/cart", cartRoute);
app.use("/api/vi/order", orderRoute);

app.use("*", notFound);
}

export default mountRoutes