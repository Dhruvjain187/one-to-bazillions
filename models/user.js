const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: false,
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model("User", userSchema);

// const makeUser = async () => {
//     const u = new User({
//         first: "Harry",
//         last: "Potter",
//     })
//     u.addresses.push({
//         street: "123 Sesame St.",
//         city: "New York",
//         state: "NY",
//         country: "USA"
//     })
//     const res = await u.save();
//     console.log(res)
// }

// makeUser();

// const makeUser = async () => {
//     const u = new User({
//         first: "Harry",
//         last: "Potter",
//         addresses: [{
//             street: "134 Sesame St.",
//             city: "New York",
//             state: "NY",
//             country: "USA"
//         }]
//     })
//     u.addresses.push({
//         street: "133 Sesame St.",
//         city: "New York",
//         state: "NY",
//         country: "USA"
//     },
//         {
//             street: "132 Sesame St.",
//             city: "New York",
//             state: "NY",
//             country: "USA"
//         })
//     const res = await u.save();
//     console.log(res)
// }

// makeUser();


const addAddress = async (id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: "169 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await user.save();
    console.log(res);
}

addAddress('66d2847b6071cf509ec9f93b')