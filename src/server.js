// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const openapiGlue = require("fastify-openapi-glue");
const mongoose = require("mongoose");
const Service = require("./service.js");

require("dotenv").config();

const options = {
  specification: `${__dirname}/schema.yaml`,
  service: new Service(),
};

fastify.register(openapiGlue, options);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    mongoose.connect(process.env.DB_CONNECT_URI).then(() => {
      console.log("MongoDB connected.");

      // By default, MongoDB adds a unique '_id' key to each record added.
      // We want to rename '_id' to 'id', to match our schema.
      // This quick hack converts MongoDB '_id' property to 'id'
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (_doc, converted) => {
          delete converted._id;
        },
      });
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
