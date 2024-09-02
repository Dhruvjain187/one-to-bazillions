const mongoose = require('mongoose');
const { Schema } = mongoose;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}

const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);


// const makeTweets = async () => {
//     // const user = new User({ username: "steve", age: 44 });
//     const user = await User.findOne({ username: "steve" });
//     // const tweet = new Tweet({ text: "hey there, I am new to tweeter", likes: 257 });
//     const tweet2 = new Tweet({ text: "buy one bitcoin please", likes: 57 });
//     tweet2.user = user;
//     await user.save();
//     await tweet2.save();
//     console.log(tweet2);
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate("user");
    console.log(t);
}

findTweet();