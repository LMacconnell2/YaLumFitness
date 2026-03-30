import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
    // Point this to your Express server's auth path
    baseURL: "http://localhost:3000/api/auth" 
});