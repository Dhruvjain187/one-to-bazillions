const mongoose = require('mongoose');
const { Schema } = mongoose;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"]
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const Product = mongoose.model("Product", productSchema);

const Farm = mongoose.model("Farm", farmSchema);

const func = async () => {
    const product = await Product.insertMany([
        {
            name: "Goddess Melon",
            price: 4.99,
            season: "Summer"
        },
        {
            name: "Sugar Baby Watermelon",
            price: 4.99,
            season: "Summer",
        },
        {
            name: "Asparagus",
            price: 3.99,
            season: "Spring",
        }
    ])
    console.log(product)
}

func();


const makeFarm = async () => {
    const farm = new Farm({
        name: "Full Belly Farms",
        city: "Guida, CA"
    })

    const asparagus = await Product.findOne({ name: "Asparagus" });

    farm.products.push(asparagus);
    await farm.save();
    console.log(farm);

}

makeFarm();

const populateFunc = async () => {
    const farm = await Farm.findOne({ name: "Full Belly Farms" }).populate("products");

    // const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });

    // farm.products.push(watermelon);
    await farm.save();
    console.log(farm);

}

populateFunc();