<script lang="ts">
  import LoginModal from "../auth/LoginModal.svelte";
  import { authClient } from "../../lib/auth-client"; // Ensure path is correct

  // 1. Receive the server-side boolean from Astro
  let { isLoggedIn = false } = $props();

  // 2. Local state for the Login Modal
  let showLogin = $state(false);

  // 3. Listen to client-side session changes (syncs with the modal success)
  const session = authClient.useSession();

  // 4. Create a reactive derived value: 
  // It's true if the server said so OR if the client-side session exists
  let authenticated = $derived(isLoggedIn || !!$session.data);

  // Helper for logging out
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/"; // Redirect home on logout
        }
      }
    });
  }
</script>

<header class="site-header">
  <div class="logo">
    <a href="/">FITNESS TRACKER</a>
  </div>
  
  <nav>
    <a href="/#features">Features</a>
    <a href="/#benefits">Benefits</a>
    
    {#if !authenticated}
      <button class="login-trigger" onclick={() => (showLogin = true)}>
        Log In
      </button>
    {:else}
      <a href="/dashboard">Dashboard</a>
      <button class="logout-link" onclick={handleLogout}>Log Out</button>
    {/if}
  </nav>
</header>

<LoginModal bind:isOpen={showLogin} onClose={() => (showLogin = false)} />

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #eee;
  }
  nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  .login-trigger {
    background: #000;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }
  .login-trigger:hover {
    background: #333;
  }
  .logout-link {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
  }
  .logout-link:hover {
    color: #e11d48;
    text-decoration: underline;
  }
</style>

