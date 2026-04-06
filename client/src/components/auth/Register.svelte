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

<style>
  .auth-form {
    background: #0d0d0f;
    padding: 3rem;
    border-radius: 20px;
    width: 100%;
    max-width: 420px;
    border: 1px solid #222;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h2 {
    color: #fff;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 0.5rem 0;
    font-weight: 800;
  }

  input {
    background: #000;
    border: 1px solid #222;
    padding: 1rem;
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
  }

  input:focus {
    border-color: #39ff14; /* Matrix green focus */
    box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
  }

  input::placeholder {
    color: #444;
  }

  button {
    background: #00f3ff; /* Cyan for the primary register action */
    color: #000;
    padding: 1rem;
    border-radius: 8px;
    border: none;
    font-weight: 900;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 1rem;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  }

  button:hover:not(:disabled) {
    background: #00d8e3;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.5);
    transform: translateY(-2px);
  }

  button:disabled {
    background: #1a1a1a;
    color: #444;
    cursor: wait;
    box-shadow: none;
  }

  .error {
    color: #ff00e6; /* Neon Pink for errors */
    background: rgba(255, 0, 230, 0.1);
    border: 1px solid rgba(255, 0, 230, 0.2);
    padding: 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-family: monospace;
    text-align: center;
    font-weight: 600;
  }
</style>