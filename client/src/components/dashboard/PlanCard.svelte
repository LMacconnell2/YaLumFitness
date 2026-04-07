<script lang="ts">
  let { plan } = $props();
  let showDetails = $state(false);

  async function setAsDefault(e: MouseEvent) {
    // Prevent the click from bubbling up if the card itself is clickable
    e.stopPropagation();

    try {
      const res = await fetch(`http://localhost:3000/api/v1/workout/${plan._id}/default`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (res.ok) {
        // Refresh the page to show the new default status across all cards
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to set default:", err);
    }
  }
</script>

<div class="card" class:is-default={plan.isDefault}>
  <div class="card-header">
    <h3>{plan.name || "Untitled Plan"}</h3>
    {#if plan.isDefault}
      <span class="badge">Default</span>
    {/if}
  </div>
  
  <p>{(plan.notes || plan.details || "No description provided.").substring(0, 100)}...</p>
  
  <div class="card-actions">
    <button onclick={() => showDetails = true}>View Details</button>
    {#if !plan.isDefault}
      <button class="secondary" onclick={(e) => setAsDefault(e)}>Set Default</button>
    {/if}
  </div>
</div>

{#if showDetails}
  <div class="modal-backdrop" onclick={() => showDetails = false} aria-hidden="true">
    <div class="modal-content" onclick={e => e.stopPropagation()} aria-hidden="true">
      <h2>{plan.name}</h2>
      <p>{plan.notes || plan.details || "No details available."}</p>
      
      {#if plan.exercises}
        <div class="mini-preview">
          <p><strong>Total Days:</strong> {plan.exercises.length}</p>
        </div>
      {/if}
      
      <button class="close-modal" onclick={() => showDetails = false}>Close</button>
    </div>
  </div>
{/if}

<style>
  .card { 
    background: #16161a; 
    border: 1px solid #222; 
    padding: 1.5rem; 
    border-radius: 16px; 
    transition: 0.3s;
    position: relative;
    overflow: hidden;
  }

  .is-default { 
    border-color: #bc13fe; 
    box-shadow: 0 0 20px rgba(188, 19, 254, 0.15);
    background: linear-gradient(145deg, #16161a 0%, #1a1221 100%);
  }

  .badge { 
    background: #bc13fe; 
    color: #fff; 
    font-size: 0.65rem; 
    padding: 3px 10px; 
    border-radius: 4px; 
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    box-shadow: 0 0 10px #bc13fe;
  }

  h3 { color: #fff; margin: 0; font-size: 1.2rem; letter-spacing: 1px; }

  p { color: #888; font-size: 0.9rem; line-height: 1.5; margin: 1rem 0; }

  .card-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

  button { 
    flex: 1; 
    padding: 0.7rem; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.75rem;
    transition: 0.3s;
  }

  .primary-btn { 
    background: #fff; 
    color: #000; 
    border: none; 
  }

  .primary-btn:hover { background: #00f3ff; box-shadow: 0 0 15px #00f3ff; }

  .secondary { 
    background: transparent; 
    color: #bc13fe; 
    border: 1px solid #bc13fe; 
  }

  .secondary:hover { background: rgba(188, 19, 254, 0.1); box-shadow: 0 0 10px #bc13fe; }
</style>