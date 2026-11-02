import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("personal-portfolio");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            designation: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
            location: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
            description: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
            portfolio: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
            github: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
            linkedin: {
                type: "string",
                required: false,
                defaultValue: "N/A",
                input: true,
            },
        },
    },
});