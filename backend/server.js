import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "./models/user.js";

dotenv.config();

mongoose.connect(
	process.env.MONGO_URL, {
	useNewUrlParser:true,
	useUnifiedTopology:true
}).then((res) => console.log("mongodb connection create"));


const saveUser = async (id, name) => {
	const existing = await User.findOne({name});
	if (existing) throw new Error(`data ${name} exists!!`);
	try {
		const newUser = new User({id, name});
		console.log("Create user", newUser);
		return newUser.save();
	} catch (e) { throw new Error("User creation error" + e);}
};

const deleteDB = async () => {
	try {
		await User.deleteMany({});
		console.log("Database deleted");
	} catch (e) { throw new Error("Database delete failed!!");}
};

const db = mongoose.connection; 

db.on("error", (err) => console.log(err));

db.once("open", async () => {
	await deleteDB();
	await saveUser(57, "Rix");
	await saveUser(11, "wei");
});