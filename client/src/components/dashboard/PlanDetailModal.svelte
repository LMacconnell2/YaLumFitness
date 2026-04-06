<script lang="ts">
  let { planId = $bindable(''), show = $bindable(false) } = $props();

  let plan = $state(null);
  let loading = $state(false);
  let isEditing = $state(false);
  let editData = $state({ name: '', details: '', isDefault: false });

  $effect(() => {
    if (show && planId) {
      fetchPlan();
    }
  });

  async function fetchPlan() {
    loading = true;
    try {
      const res = await fetch(`http://localhost:3000/api/v1/workout/${planId}`, {
        credentials: 'include'
      });
      if (res.ok) {
        plan = await res.json();
        editData = { 
            name: plan.name, 
            // Fallback to plan.notes if details is undefined
            details: plan.notes || plan.details || "", 
            isDefault: plan.isDefault || false 
        };
        }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      loading = false;
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/workout/${planId}`, {
        method: 'PATCH', // Or POST depending on your router
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editData)
      });

      if (res.ok) {
        isEditing = false;
        fetchPlan();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  }

  async function handleDelete() {
    if (!confirm("Permanently delete this workout plan?")) return;
    
    const res = await fetch(`http://localhost:3000/api/v1/workout/${planId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      show = false;
      window.location.reload();
    }
  }
</script>

{#if show}
<div class="modal-backdrop" onclick={() => show = false} role="presentation">
  <div class="modal-content" onclick={(e) => e.stopPropagation()} role="presentation">
    {#if loading}
      <div class="loader">Generating details...</div>
    {:else if plan}
      <header>
        <div class="title-area">
          {#if isEditing}
            <input bind:value={editData.name} class="edit-title" />
          {:else}
            <h2>{plan.name}</h2>
            {#if plan.isDefault}<span class="badge-active">Active Plan</span>{/if}
          {/if}
        </div>
        <button class="close-btn" onclick={() => show = false}>&times;</button>
      </header>

      <div class="scroll-body">
        {#if isEditing}
          <section class="edit-section">
            <label>
              <span>Description / Notes</span>
              <textarea bind:value={editData.details}></textarea>
            </label>
            <label class="checkbox">
              <input type="checkbox" bind:checked={editData.isDefault} />
              <span>Set as my primary active plan</span>
            </label>
          </section>
        {:else}
          <p class="plan-description">{plan.details}</p>
          
          <div class="routine-viewer">
            {#if plan.exercises}
              {#each plan.exercises as workoutDay}
                <div class="day-card">
                  <h4>{workoutDay.dayName}</h4>
                  <ul>
                    {#each workoutDay.movements as move}
                      <li>
                        <strong>{move.exercise}:</strong> {move.sets} sets x {move.reps}
                      </li>
                    {/each}
                  </ul>
                </div>
              {/each}
            {/if}
          </div>
        {/if}
      </div>

      <footer>
        <div class="left-actions">
          <button class="btn-danger" onclick={handleDelete}>Delete</button>
        </div>
        <div class="right-actions">
          {#if isEditing}
            <button class="btn-secondary" onclick={() => isEditing = false}>Cancel</button>
            <button class="btn-primary" onclick={handleUpdate}>Save Changes</button>
          {:else}
            <button class="btn-secondary" onclick={() => isEditing = true}>Edit Details</button>
          {/if}
        </div>
      </footer>
    {/if}
  </div>
</div>
{/if}

<style>
  .modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.9);
    display: flex; align-items: center; justify-content: center; z-index: 5000;
    backdrop-filter: blur(12px);
  }

  .modal-content {
    background: #0d0d0f; 
    border-radius: 20px; 
    width: 95%; max-width: 650px;
    max-height: 85vh; 
    display: flex; flex-direction: column; 
    border: 1px solid #333;
    box-shadow: 0 0 50px rgba(0,0,0,1);
  }

  header { 
    padding: 2rem; border-bottom: 1px solid #222; 
    display: flex; justify-content: space-between; align-items: center; 
  }

  .title-area h2 { color: #00f3ff; text-transform: uppercase; letter-spacing: 2px; }

  .scroll-body { padding: 2rem; overflow-y: auto; flex: 1; background: #0d0d0f; }

  .day-card { 
    background: #16161a; 
    padding: 1.5rem; 
    border-radius: 12px; 
    margin-bottom: 1.25rem; 
    border: 1px solid #222; 
  }

  .day-card h4 { 
    margin: 0 0 1rem 0; 
    color: #39ff14; 
    text-transform: uppercase;
    font-family: monospace;
    border-bottom: 1px solid #222;
    padding-bottom: 0.5rem;
  }

  .day-card li { 
    color: #aaa; 
    font-size: 0.95rem; 
    padding: 0.5rem 0; 
    border-bottom: 1px solid #1c1c21; 
  }

  .day-card li strong { color: #fff; }

  footer { padding: 1.5rem; border-top: 1px solid #222; background: #0d0d0f; }

  .btn-primary { background: #39ff14; color: #000; border: none; }
  .btn-secondary { background: transparent; color: #fff; border: 1px solid #444; }
  .btn-danger { background: transparent; color: #ff0055; border: 1px solid #ff0055; }
</style>