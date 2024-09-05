import mongoose,{Schema, Document} from "mongoose";


const UserSchema = new mongoose.Schema({
   username: {
    type: String,
    required: [true, "username is required"],
    unique: true
   },
   phoneNo: {
    type: Number,
    required: [true, "phone number is required"],
    unique: true
   },
   password: {
    type: String,
    required: [true, 'Password is required'],
  },
   
})
const UserModel = (mongoose.models.User) || mongoose.model('User', UserSchema);

export default UserModel;