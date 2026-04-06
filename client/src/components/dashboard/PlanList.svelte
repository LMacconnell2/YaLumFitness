<script lang="ts">
  import PlanCard from './PlanCard.svelte';
  import PlanDetailModal from './PlanDetailModal.svelte';

  let { initialPlans = [] } = $props();
  
  // State variables
  let plans = $state(initialPlans);
  let selectedPlanId = $state('');
  let showDetailModal = $state(false);
  let hasAttemptedFetch = $state(false); // Track to prevent infinite loops

  // If initialPlans is empty, try fetching on the client once
  $effect(() => {
    if (plans.length === 0 && !hasAttemptedFetch) {
      fetchPlansOnClient();
    }
  });

  async function fetchPlansOnClient() {
    hasAttemptedFetch = true;
    try {
      const res = await fetch("http://localhost:3000/api/v1/workout", {
        credentials: 'include' 
      });
      if (res.ok) {
        plans = await res.json();
        console.log("Client-side plans fetch successful:", plans);
      }
    } catch (err) {
      console.error("Client-side fetch failed:", err);
    }
  }

  function openDetails(id: string) {
    selectedPlanId = id;
    showDetailModal = true;
  }
</script>

<div class="plans-grid">
  {#each plans as plan}
    <div onclick={() => openDetails(plan._id)} onkeydown={(e) => e.key === 'Enter' && openDetails(plan._id)} role="button" tabindex="0">
       <PlanCard {plan} />
    </div>
  {/each}

  {#if plans.length === 0}
    <div class="empty-state">
      <p>No workout plans found. Generate one to get started!</p>
    </div>
  {/if}
</div>

<PlanDetailModal bind:show={showDetailModal} bind:planId={selectedPlanId} />

<style>
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  /* Make the card wrapper look clickable */
  .plans-grid > div {
    cursor: pointer;
    outline: none;
  }

  .empty-state {
    grid-column: 1 / -1;
    padding: 3rem;
    text-align: center;
    background: #f9fafb;
    border: 2px dashed #e5e7eb;
    border-radius: 12px;
    color: #6b7280;
  }
</style>