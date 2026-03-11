import { createAuthClient } from "better-auth/svelte";
export const authClient = createAuthClient({
    baseURL: process.env.CLIENT_URL || "http://localhost:4321" // Your Astro URL
});