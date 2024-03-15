const express = require("express")
const fs = require('fs')
const app = express()
const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/dummy.json`));
    
const defaultRoute = (req, res, next) => {
    res.send("<h1> Hello anastasia </h1>")
}

const getAllCustomer = (req, res, next) => {
    res.status(200).json({
        status: "success",
        requestAt: req.requestTime,
        totalData: customers.length,
        data: {
            customers,
        }
    })
}

const getCustomersById = (req, res, next) => {
    const {id} = req.params.id;
    // menggunakan array method untuk membantu menemukan data
    const customer = customers.find(cust => cust.id === id)
    console.log(customer);
    res.status(200).json({
        status: "success", 
        data: {
            customers
        }
    })
}

const updateCustomersById = (req,res) => {
    const {id} = req.params.id;

    // 1. melakukan pencarian data berdasar id
    const customer = customers.find(cust => cust.id === id)
    console.log(customer);
    const customerIndex = customers.findIndex(cust => cust.id === id);

    // 2. cek apakah data customer ada

    if(!customer){
        return res.status(404).json({
            status: "fail",
            massage: `customer dengan id ${id} tidak ditemukan`
        });
    }

    // 3. jika ada berikan respon berdasar data customer
    // object assign = menggabungkan objek or spread operator

    customer[customerIndex] = {...customer[customerIndex], ...req.body}
    // 4. melakukan update dari dokumen json

    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customer), (err) => {
        res.status(200).json({
            status: "success",
            massage: "update data costumers",
            data: {
                customers:customer[customerIndex],
                customers
            }
        })
    })
}

const deteleCustomersById = (req,res) => {
    const {id} = req.params.id;

    // 1. melakukan pencarian data berdasar id
    const customer = customers.find(cust => cust.id === id)
    console.log(customer);
    const customerIndex = customers.findIndex(cust => cust.id === id);

    // 2. cek apakah data customer ada

    if(!customer){
        return res.status(404).json({
            status: "fail",
            massage: `customer dengan id ${id} tidak ditemukan`
        });
    }

    // 3. jika ada berikan respon berdasar data customer
    // object assign = menggabungkan objek or spread operator

    customers.splice(customerIndex, 1)
    // 4. melakukan update dari dokumen json

    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customer), (err) => {
        res.status(200).json({
            status: "success",
            massage: "delete data costumers",
            data: {
                customers:customer[customerIndex],
                customers
            }
        })
    })
}

const createCustomer =  (req, res) => {

    const newCustomer = req.body;
    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                customer:newCustomer
            }
        })
    })
}

module.exports = {
    getAllCustomer,
    defaultRoute,
    getCustomersById,
    deteleCustomersById,
    updateCustomersById,
    createCustomer
}