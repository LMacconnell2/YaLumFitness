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
  /* Screen reader only helper */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    position: relative;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
  }

  .close-btn {
    position: absolute;
    top: 10px; right: 15px;
    background: none; border: none;
    font-size: 1.5rem; cursor: pointer;
    color: #666;
  }

  .close-btn:hover { color: #000; }

  .auth-form { display: flex; flex-direction: column; gap: 1rem; }
  
  h2 { margin: 0; font-size: 1.5rem; }
  p { color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; }

  input { 
    padding: 0.8rem; 
    border: 1px solid #ddd; 
    border-radius: 6px; 
    font-size: 1rem;
  }

  button[type="submit"] {
    background: #000; 
    color: #fff;
    padding: 0.8rem; 
    border: none;
    border-radius: 6px;
    cursor: pointer; 
    font-weight: bold;
    margin-top: 0.5rem;
  }

  button:disabled { opacity: 0.5; cursor: not-allowed; }

  .error { 
    color: #e11d48; 
    font-size: 0.85rem; 
    font-weight: 500;
  }

  .form-footer {
    margin-top: 1rem;
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }

  .form-footer a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
  }

  .form-footer a:hover {
    text-decoration: underline;
  }
</style>