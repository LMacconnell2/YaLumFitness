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
  .card { background: white; border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 12px; }
  .is-default { border: 2px solid #6366f1; background: #f5f3ff; }
  .badge { background: #6366f1; color: white; font-size: 0.7rem; padding: 2px 8px; border-radius: 99px; }
  .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .card-actions { display: flex; gap: 0.5rem; margin-top: 1.5rem; }
  button { flex: 1; padding: 0.5rem; border-radius: 6px; cursor: pointer; border: 1px solid #111827; background: #111827; color: white; }
  button.secondary { background: white; color: #111827; }
</style>