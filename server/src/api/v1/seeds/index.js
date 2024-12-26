import { Types } from "mongoose";
import Product from "../product/product.model";
import User from "../user/user.model";
import { staticIds } from "./static-ids";
import { faker } from "@faker-js/faker";
import { connectDatabase } from "../../../lib/mongoose";
import passwordManager from "../../../utils/password-manager";
import array from "../../../utils/array";
import Roles from "../../../constansts/roles";
import Storefront from "../storefront/storefront.model";
import Order from "../order/order.model";
import logger from "../../../utils/logger";
import Category from "../category/category.model";
import Address from "../address/address.model";

function randomId(arr) {
  return new Types.ObjectId(array(arr).random());
}

const seeds = [
  {
    Model: User,
    count: 100,
    generateData: async (
      ids,
      { assignedIds: { Storefront: StorefrontIds  } }
    ) => {
      return await Promise.all([
        ...ids.slice(0, 97).map(async (e, i) => {
          const _id = new Types.ObjectId(e);
          return {
            _id,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await passwordManager.hashPassword("123456"),
            role: array(Object.values(Roles)).random(),
            storefront: randomId(StorefrontIds),
            loggedInAt: faker.date.past(),
            deletedAt: null,
          };
        }),
        ...[
          {
            name: "super_admin",
            email: "super_admin@super_admin.com",
            role: Roles.SuperAdmin,
          },
          {
            name: "admin",
            email: "admin@admin.com",
            role: Roles.Admin,
          },
          {
            name: "user",
            email: "user@user.com",
            role: Roles.User,
          },
        ].map(async (e, i) => ({
          ...e,
          _id: ids.slice(97)[i],
          storefront: randomId(StorefrontIds),
          password: await passwordManager.hashPassword("123456"),
        })),
      ]);
    },
  },
  {
    Model: Storefront,
    count: 10,
    generateData: async (ids, { assignedIds: { User: UserIds } }) => {
      return await Promise.all(
        ids.map(async (e, i) => {
          const _id = new Types.ObjectId(e);
          return {
            _id,
            name: faker.company.name(),
            description: faker.lorem.sentence(),
            createdBy: randomId(UserIds),
            deletedAt: null,
          };
        })
      );
    },
  },
  {
    Model: Category,
    count: 20,
    generateData: async (
      ids,
      { assignedIds: { Storefront: StorefrontIds } }
    ) => {
      return await Promise.all(
        ids.map(async (e, i) => {
          const _id = new Types.ObjectId(e);
          const storefront = randomId(StorefrontIds);
          return {
            _id,
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            // images: Array.from({ length: 3 }, () => faker.image.url()),
            // price: parseFloat(faker.commerce.price()),
            storefront,
            deletedAt: faker.datatype.boolean() ? faker.date.past() : null,
          };
        })
      );
    },
  },
  {
    Model: Product,
    count: 200,
    generateData: async (
      ids,
      {
        assignedIds: { Storefront: StorefrontIds },
        data: { Category: Categories },
      }
    ) => {
      return await Promise.all(
        ids.map(async (e, i) => {
          const _id = new Types.ObjectId(e);
          const storefront = randomId(StorefrontIds);
          const categoryIdsInStronfront = Categories.filter(
            (category) => storefront === category.storefront
          ).map((category) => category.storefront);

          return {
            _id,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            images: Array.from({ length: 3 }, () => faker.image.url()),
            price: parseFloat(faker.commerce.price()),
            storefront,
            category: randomId(categoryIdsInStronfront),
            deletedAt: faker.datatype.boolean() ? faker.date.past() : null,
          };
        })
      );
    },
  },
  {
    Model: Address,
    count: 400, 
    generateData: async (ids, { assignedIds: { User: UserIds } }) => {
      const addresses = [];
      UserIds.forEach((userId) => {
        const addressCount = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < addressCount; i++) {
          const _id = new Types.ObjectId(ids.pop());
          addresses.push({
            _id,
            user: new Types.ObjectId(userId), 
            addressLine1: faker.location.streetAddress(),
            addressLine2: faker.datatype.boolean() ? faker.location.secondaryAddress() : null, // Optional
            city: faker.location.city(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country(),
          });
        }
      });
      return addresses;
    },
  },
  {
    Model: Order,
    count: 1000,
    generateData: async (
      ids,
      {
        assignedIds: { User: UserIds, Product: ProductIds },
        data: { User: Users , Address : Addresses },
      }
    ) => {
      return await Promise.all(
        ids.map(async (e, i) => {
          const products = array(ProductIds)
            .shuffle()
            .arr.slice(0, faker.number.int({ min: 1, max: 50 }))
            .map((e) => ({
              product: new Types.ObjectId(e),
              quantity: faker.number.int({ min: 1, max: 100 }),
              price: parseFloat(faker.commerce.price()),
            }));

          const amount = products.reduce(
            (total, product) => total + product.quantity * product.price,
            0
          );

          const customerId = new Types.ObjectId(array(UserIds).random());
          const customer = Users.find(
            (user) => customerId.toString() === user._id.toString()
          )
          const storefront = customer.storefront;
          const addressId = (array(Addresses.filter((address) => address.user.toString() === customerId.toString())).random())._id
          const _id = new Types.ObjectId(e);
          return {
            _id,
            customer: customerId,
            storefront: storefront,
            products,
            amount,
            address: addressId , 
            status: faker.helpers.arrayElement([
              "Pending",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
            ]),
            paymentMethod: faker.helpers.arrayElement([
              "Credit Card",
              "Debit Card",
              "PayPal",
              "Cash on Delivery",
            ]),
            paymentStatus: faker.helpers.arrayElement([
              "Started",
              "Pending",
              "Paid",
              "Failed",
            ]),
            deletedAt: faker.datatype.boolean() ? faker.date.past() : null,
          };
        })
      );
    },
  },
];

async function seedDatabase() {
  try {
    logger.info("✨ Starting database seeding process! ✨\n");
    await connectDatabase();

    let assignedIds = {};

    for (let i = 0; i < seeds.length; i++) {
      const { Model, count, generateData } = seeds[i];
      let currentIndex = 0;
      assignedIds[Model.modelName] = [];
      for (let j = 0; j < count; j++) {
        if (currentIndex < staticIds.length) {
          assignedIds[Model.modelName].push(staticIds[currentIndex]);
          currentIndex++;
        } else {
          throw new Error("Not enough static IDs to assign.");
        }
      }
    }
    let data = {};
    for (let i = 0; i < seeds.length; i++) {
      const { Model, count, generateData } = seeds[i];

      data = {
        ...data,
        [Model.modelName]: await generateData(assignedIds[Model.modelName], {
          assignedIds,
          data,
        }),
      };

      const currentData = data[Model.modelName];
      const ids = currentData.map((item) => item._id).filter(Boolean);

      logger.info(`📚 Seeding ${Model.modelName || "Model"}...`);

      // Check for existing documents
      const existingDocuments = await Model.find({ _id: { $in: ids } }).lean();
      const existingIds = existingDocuments.map((doc) => doc._id.toString());
      logger.info(
        `🔍 Found ${existingDocuments.length} existing records in ${
          Model.modelName || "Model"
        }.`
      );

      // Filter new and old records
      const newRecords = currentData.filter(
        (item) => !existingIds.includes(item._id?.toString())
      );
      if (newRecords.length > 0) {
        await Model.create(newRecords);
        logger.info(
          `🆕 Inserted ${newRecords.length} new records into ${
            Model.modelName || "Model"
          }! 🚀`
        );
      } else {
        logger.info(
          `💯 No new records to insert for ${Model.modelName || "Model"}.`
        );
      }
      if (existingIds.length > 0 && !(newRecords.length > 0)) {
        const updatePromises = existingIds.map((id) => {
          return Model.findByIdAndUpdate(
            id,
            currentData.find((e) => e._id.toString() === id)
          );
        });
        const updatedDocuments = await Promise.all(updatePromises);
        logger.info(
          `🆕 Updated ${updatedDocuments.length} old records into ${
            Model.modelName || "Model"
          }! 🚀`
        );
      } else {
        logger.info(
          `💯 No new records to update for ${Model.modelName || "Model"}.`
        );
      }
    }
    logger.info("✨ Database seeding completed successfully! ✨\n");
  } catch (error) {
    logger.error("🔥 Error during database seeding: " + error.message, error);
  }
}

// Run the seed script
seedDatabase();
// logger.info(JSON.stringify(generateStaticIds(2000)))
