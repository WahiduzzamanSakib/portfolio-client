import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [
        inferAdditionalFields({
            user: {
                designation: { type: "string" },
                location: { type: "string" },
                description: { type: "string" },
                portfolio: { type: "string" },
                github: { type: "string" },
                linkedin: { type: "string" },
            },
        }),
    ],
})