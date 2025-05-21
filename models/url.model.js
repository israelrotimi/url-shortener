import {Schema, Model} from "mongoose";

const urlSchema = new Schema({
    shortenedStringId: {
        type: String,
        unique: true,
        // This implementation can generate approx. 56.8 billion unique strings.
        // That'll be okay for now, but if you want to use in production
        // Consider installing a package like nanoid to generate unique strings
        // or consider implementing a more robust solution.
        default: function() {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 6; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
    },
    targetURL: {
        type: String,
        required: [true, "URL is required"],
        trim: true,
        minLength: 2,
        validate: {
            message: "",
            validator: function(){
                const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                return re.test(this.targetURL)
            }
        }
    },
}, { timestamps: true });

urlSchema.index({ shortenedStringId: 1 });


const URL = new Model("URL", urlSchema);

export default URL;