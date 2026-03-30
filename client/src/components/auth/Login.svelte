<script lang="ts">
  import { authClient } from "../../lib/auth-client.ts";

  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let errorMessage = $state("");

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard"
    });

    if (error) {
      errorMessage = error.message || "Invalid credentials";
    }
    loading = false;
  }
</script>

<form onsubmit={handleLogin} class="auth-form">
  <h2>Login</h2>

  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Login"}
  </button>
</form>