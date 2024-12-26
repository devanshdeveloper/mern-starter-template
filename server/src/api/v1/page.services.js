import { Response } from "../../utils/response";
import orderServices from "./order/order.services";

export class PageServices {
  constructor() {}
  //   ["dashboard"](c) {

  //   }

  // ["customers"](c) {

  // }

  // {
  //     id: '1',
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     status: 'active',
  //     orders: 12,
  //     totalSpent: 1249.99,
  //     lastOrder: new Date().toISOString(),
  //     avatar: 'https://i.pravatar.cc/150?u=1',
  //   },

  async ["orders"](c) {
    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const foundDocuments = await orderServices.aggregation([
      {
        $facet: {
          metadata: [
            { $count: "totalDocuments" }, 
            {
              $addFields: {
                totalPages: {
                  $ceil: { $divide: ["$totalDocuments", limit] }, 
                },
                currentPage: page, 
              },
            },
          ],
          data: [
            {
              $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
              },
            },
            { $unwind: "$customer" },
            {
              $project: {
                status: 1,
                amount: 1,
                createdAt: 1,
                customer: { name: "$customer.name" },
                products: { $size: "$products" },
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ]);

    return Response(c)
      .body(foundDocuments)
      .message("Orders Page fetched successfully");
  }
}
const pageServices = new PageServices();

export default pageServices;
