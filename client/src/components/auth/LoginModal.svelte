<script lang="ts">
  import { authClient } from "../../lib/auth-client.ts";

  let { isOpen = $bindable(), onClose } = $props();

  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let errorMessage = $state("");

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    errorMessage = "";

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard"
    });

    if (error) {
      errorMessage = error.message || "Invalid credentials";
    } else {
      isOpen = false; 
    }
    loading = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
</script>

{#if isOpen}
  <div 
    class="modal-backdrop" 
    onclick={onClose} 
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
  >
    <div 
      class="modal-content" 
      onclick={(e) => e.stopPropagation()} 
      role="document"
    >
      <button 
        class="close-btn" 
        onclick={onClose} 
        aria-label="Close modal"
      >
        &times;
      </button>
      
      <form onsubmit={handleLogin} class="auth-form">
        <h2 id="modal-title">Login</h2>
        <p>Enter your details to access your dashboard.</p>

        <label for="email" class="sr-only">Email</label>
        <input 
          id="email"
          type="email" 
          bind:value={email} 
          placeholder="Email" 
          required 
          aria-required="true"
        />

        <label for="password" class="sr-only">Password</label>
        <input 
          id="password"
          type="password" 
          bind:value={password} 
          placeholder="Password" 
          required 
          aria-required="true"
        />

        {#if errorMessage}
          <p class="error" role="alert">{errorMessage}</p>
        {/if}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div class="form-footer">
          <p>
            Don't have an account? 
            <a href="/register" onclick={() => isOpen = false}>Register</a>
          </p>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  /* Keep the sr-only for accessibility */
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
  }

  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.85); /* Darker for more drama */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(12px); /* Heavier blur for the "Neon Noir" look */
  }

  .modal-content {
    background: #0d0d0f; /* Deep obsidian */
    padding: 3rem;
    border-radius: 20px;
    position: relative;
    width: 90%;
    max-width: 420px;
    border: 1px solid #222; /* Subtle structural border */
    box-shadow: 0 0 40px rgba(0, 0, 0, 1), 0 0 20px rgba(57, 255, 20, 0.05);
    color: #fff;
  }

  .close-btn {
    position: absolute;
    top: 20px; right: 20px;
    background: none; border: none;
    font-size: 2rem; cursor: pointer;
    color: #444;
    line-height: 1;
    transition: 0.2s;
  }

  .close-btn:hover { color: #ff00e6; text-shadow: 0 0 10px #ff00e6; }

  .auth-form { display: flex; flex-direction: column; gap: 1.2rem; }
  
  h2 { 
    margin: 0; 
    font-size: 1.8rem; 
    font-weight: 800; 
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #39ff14; /* Neon Green */
    text-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
  }

  p { color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; font-family: monospace; }

  input { 
    background: #000;
    padding: 1rem; 
    border: 1px solid #222; 
    border-radius: 8px; 
    font-size: 1rem;
    color: #fff;
    transition: 0.3s;
    outline: none;
  }

  input:focus {
    border-color: #00f3ff; /* Cyan focus */
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
  }

  input::placeholder { color: #444; }

  button[type="submit"] {
    background: #39ff14; /* Neon Green */
    color: #000;
    padding: 1rem; 
    border: none;
    border-radius: 8px;
    cursor: pointer; 
    font-weight: 900;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 1rem;
    transition: 0.3s;
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.2);
  }

  button[type="submit"]:hover:not(:disabled) {
    background: #46ff26;
    box-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
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
    font-size: 0.85rem; 
    font-weight: 600;
    font-family: monospace;
    text-align: center;
    background: rgba(255, 0, 230, 0.1);
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 0, 230, 0.2);
  }

  .form-footer {
    margin-top: 1.5rem;
    text-align: center;
    border-top: 1px solid #1a1a1a;
    padding-top: 1.5rem;
  }

  .form-footer p { color: #444; }

  .form-footer a {
    color: #00f3ff; /* Cyan link */
    font-weight: 700;
    text-decoration: none;
    transition: 0.2s;
  }

  .form-footer a:hover {
    text-shadow: 0 0 10px #00f3ff;
    text-decoration: underline;
  }
</style>