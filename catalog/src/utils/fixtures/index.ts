import { Product } from "@/models/product.mode";
import {Factory } from 'rosie'
import { faker } from '@faker-js/faker'

export const ProductFactory = new Factory<Product>()
    .attr("id",faker.number.int({min:1,max:1000}))
    .attr("name",faker.commerce.productName())
    .attr("description",faker.commerce.productDescription())
    .attr("stock",faker.number.int({min:10,max:1000}))
    .attr("price",+faker.commerce.price())
