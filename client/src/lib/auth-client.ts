import { createAuthClient } from "better-auth/svelte";
export const authClient = createAuthClient({
    baseURL: import.meta.env.CLIENT_URL || "http://localhost:3000" // Your Astro URL
});