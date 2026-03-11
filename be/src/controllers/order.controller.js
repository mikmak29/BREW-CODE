import asyncErrorHandler from "express-async-handler";

import * as orderService from "../services/order.service.js";
import ResponseHandler from "../helpers/ResponseHandler.js";

export const newCustomer = asyncErrorHandler(async (req, res) => {
  const { userId, username, purchasedProducts, totalAmount } = req.data;

  const purchasedInfo = {
    userId,
    username,
    purchasedProducts,
    totalAmount,
  };

  await orderService.newOrder(purchasedInfo);

  ResponseHandler(res, "success", 201, {
    purchasedData: null,
    message: "Purchased successfully!",
  });
});

export const retrieveOrders = asyncErrorHandler(async (req, res) => {
  const orders = await orderService.retrieveOrders();

  ResponseHandler(res, "success", 200, {
    orders,
    message: "Retrieve data successfully!",
  });
});

export const totalCustomersOrder = asyncErrorHandler(async (req, res) => {
  const totalOrders = req.data;

  ResponseHandler(res, "success", 200, {
    totalOrders,
    message: "Retrieve data successfully!",
  });
});

export const totalRevenue = asyncErrorHandler(async (req, res) => {
  const revenue = req.data;

  ResponseHandler(res, "success", 200, {
    revenue,
    message: "Retrieve data successfully!",
  });
});
