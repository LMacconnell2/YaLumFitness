<script lang="ts">
  let { plan } = $props();
  let showDetails = $state(false);

  async function makeDefault() {
    // API call to set this plan as the active one
    console.log("Setting default meal plan:", plan.id);
  }
</script>

<div class="meal-card" class:active={plan.isDefault}>
  <div class="card-header">
    <div>
      <h3>{plan.name}</h3>
      <span class="cal-count">{plan.calories} kcal/day</span>
    </div>
    {#if plan.isDefault}
      <span class="default-badge">Active</span>
    {/if}
  </div>
  
  <p class="desc">{plan.description}</p>
  
  <div class="card-footer">
    <button class="view-btn" onclick={() => showDetails = true}>View Details</button>
    {#if !plan.isDefault}
      <button class="set-btn" onclick={makeDefault}>Use This Plan</button>
    {/if}
  </div>
</div>

{#if showDetails}
<div class="modal-backdrop" onclick={() => showDetails = false} aria-hidden="true">
  <div class="modal-content" onclick={e => e.stopPropagation()} aria-hidden="true">
    <header>
      <h2>{plan.name}</h2>
      <span class="tag">{plan.calories} Calories</span>
    </header>
    
    <div class="plan-details">
      <div class="meal-item">
        <strong>Breakfast:</strong> Overnight Oats with Blueberries
      </div>
      <div class="meal-item">
        <strong>Lunch:</strong> Grilled Chicken & Quinoa Salad
      </div>
      <div class="meal-item">
        <strong>Dinner:</strong> Baked Salmon with Asparagus
      </div>
    </div>
    
    <button class="close-btn" onclick={() => showDetails = false}>Close</button>
  </div>
</div>
{/if}

<style>
  .meal-card {
    background: white; border: 1px solid #e5e7eb; padding: 1.5rem;
    border-radius: 16px; transition: transform 0.2s;
  }
  .meal-card:hover { transform: translateY(-4px); }
  .active { border: 2px solid #10b981; background: #f0fdf4; }
  
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
  .cal-count { font-size: 0.85rem; color: #6b7280; font-weight: 500; }
  .default-badge { background: #10b981; color: white; padding: 2px 8px; border-radius: 99px; font-size: 0.7rem; font-weight: 700; }
  
  .desc { font-size: 0.9rem; color: #4b5563; line-height: 1.5; margin-bottom: 1.5rem; }
  
  .card-footer { display: flex; gap: 0.75rem; }
  button { flex: 1; padding: 0.6rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem; }
  .view-btn { background: #111827; color: white; border: none; }
  .set-btn { background: white; border: 1px solid #d1d5db; color: #374151; }

  /* Modal Styles */
  .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; }
  .modal-content { background: white; padding: 2rem; border-radius: 20px; width: 450px; }
  .meal-item { padding: 1rem 0; border-bottom: 1px solid #f3f4f6; }
  .close-btn { width: 100%; margin-top: 2rem; background: #f3f4f6; border: none; padding: 0.8rem; border-radius: 8px; }
</style>