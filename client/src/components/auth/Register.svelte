<script lang="ts">
  import { authClient } from "../../lib/auth-client.ts";

  let email = $state("");
  let password = $state("");
  let name = $state("");
  let loading = $state(false);
  let errorMessage = $state("");

  async function handleSignUp(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    errorMessage = "";

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard" // Where to go after success
    });

    if (error) {
      errorMessage = error.message || "Registration failed";
    }
    loading = false;
  }
</script>

<form onsubmit={handleSignUp} class="auth-form">
  <h2>Create Account</h2>
  
  <input type="text" bind:value={name} placeholder="Name" required />
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <button type="submit" disabled={loading}>
    {loading ? "Creating..." : "Register"}
  </button>
</form>