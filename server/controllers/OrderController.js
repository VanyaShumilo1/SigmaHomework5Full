import OrderModel from "../models/order.js";

class OrderController {
    async create(req, res) {
        try {
            const order = await OrderModel.create({
                fullName: req.body.fullName,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                message: req.body.message,
                products: req.body.products,
            })

            res.status(200).json(order)

        } catch (err) {
            res.status(500).json({
                message: 'something went wrong while creating order',
                err
            })
            console.log(err)
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrderModel.find().populate('products.product')

            res.status(200).json(orders)

        } catch (err) {
            res.status(500).json({
                message: 'something went wrong while getting order',
                err
            })
            console.log(err)
        }
    }

    async delete(req, res) {
        try {
            const orderId = req.params.id
            const order = await OrderModel.findOneAndDelete({_id: orderId})

            if (!order) {
                return res.status(404).json({
                    message: 'order not found'
                })
            }

            res.status(200).json(order)

        } catch (err) {
            res.status(500).json({
                message: "something went wrong while deleting order",
                err
            })
            console.log(err)
        }
    }
}

export default new OrderController