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
          details: plan.details, 
          isDefault: plan.isDefault 
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
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center; z-index: 4000;
    backdrop-filter: blur(4px);
  }
  .modal-content {
    background: white; border-radius: 16px; width: 90%; max-width: 600px;
    max-height: 85vh; display: flex; flex-direction: column; overflow: hidden;
  }
  header { padding: 1.5rem; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; }
  .scroll-body { padding: 1.5rem; overflow-y: auto; flex: 1; }
  
  .title-area h2 { margin: 0; font-size: 1.4rem; font-weight: 800; }
  .edit-title { font-size: 1.4rem; font-weight: 800; border: 1px solid #d1d5db; border-radius: 4px; padding: 0.2rem 0.5rem; width: 100%; }
  
  .badge-active { background: #dcfce7; color: #166534; font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 700; margin-top: 0.4rem; display: inline-block; }
  
  .day-card { background: #f9fafb; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #e5e7eb; }
  .day-card h4 { margin: 0 0 0.5rem 0; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; }
  .day-card ul { list-style: none; padding: 0; margin: 0; }
  .day-card li { font-size: 0.9rem; padding: 0.3rem 0; border-bottom: 1px dashed #e5e7eb; }

  footer { padding: 1.25rem; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; }
  .right-actions { display: flex; gap: 0.5rem; }
  
  .btn-primary { background: #111827; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  .btn-secondary { background: #f3f4f6; color: #374151; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  .btn-danger { background: #fff1f2; color: #e11d48; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  
  textarea { width: 100%; height: 100px; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px; margin-top: 0.5rem; }
</style>