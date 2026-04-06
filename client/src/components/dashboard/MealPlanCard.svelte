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
    background: #16161a; 
    border: 1px solid #222; 
    padding: 1.5rem;
    border-radius: 16px; 
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .meal-card:hover { 
    transform: translateY(-5px); 
    border-color: #39ff14;
    box-shadow: 0 10px 30px rgba(57, 255, 20, 0.1);
  }

  .active { 
    border: 1px solid #39ff14; 
    background: linear-gradient(145deg, #16161a 0%, #0d1a0d 100%);
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.1);
  }
  
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
  
  h3 { color: #fff; margin: 0; font-size: 1.1rem; letter-spacing: 0.5px; }
  
  .cal-count { 
    font-size: 0.8rem; 
    color: #39ff14; 
    font-family: monospace; 
    font-weight: 700;
    text-transform: uppercase;
  }

  .default-badge { 
    background: #39ff14; 
    color: #000; 
    padding: 2px 10px; 
    border-radius: 4px; 
    font-size: 0.65rem; 
    font-weight: 900; 
    text-transform: uppercase;
    box-shadow: 0 0 10px #39ff14;
  }
  
  .desc { 
    font-size: 0.85rem; 
    color: #888; 
    line-height: 1.6; 
    margin-bottom: 2rem; 
    font-family: monospace;
  }
  
  .card-footer { display: flex; gap: 0.75rem; }
  
  button { 
    flex: 1; 
    padding: 0.7rem; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: 800; 
    font-size: 0.75rem; 
    text-transform: uppercase;
    transition: 0.2s;
  }

  .view-btn { 
    background: #fff; 
    color: #000; 
    border: none; 
  }

  .view-btn:hover { background: #00f3ff; box-shadow: 0 0 15px #00f3ff; }

  .set-btn { 
    background: transparent; 
    border: 1px solid #444; 
    color: #fff; 
  }

  .set-btn:hover { border-color: #39ff14; color: #39ff14; }

  /* Modal Tweaks */
  .modal-backdrop { 
    position: fixed; inset: 0; 
    background: rgba(0,0,0,0.9); 
    display: flex; align-items: center; justify-content: center; 
    z-index: 5000; 
    backdrop-filter: blur(10px);
  }

  .modal-content { 
    background: #0d0d0f; 
    padding: 2.5rem; 
    border-radius: 20px; 
    width: 450px; 
    border: 1px solid #333;
    box-shadow: 0 0 50px #000;
  }

  h2 { color: #39ff14; text-transform: uppercase; letter-spacing: 2px; }

  .meal-item { 
    padding: 1.25rem 0; 
    border-bottom: 1px solid #222; 
    color: #ccc; 
    font-size: 0.95rem;
  }

  .meal-item strong { color: #00f3ff; text-transform: uppercase; font-size: 0.8rem; margin-right: 0.5rem; }

  .close-btn { 
    width: 100%; 
    margin-top: 2rem; 
    background: transparent; 
    border: 1px solid #444; 
    color: #888;
    padding: 0.8rem; 
    border-radius: 8px; 
    text-transform: uppercase;
    font-weight: 800;
  }

  .close-btn:hover { border-color: #fff; color: #fff; }
</style>