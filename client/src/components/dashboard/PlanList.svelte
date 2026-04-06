<script lang="ts">
  import PlanCard from './PlanCard.svelte';
  import PlanDetailModal from './PlanDetailModal.svelte';

  let { initialPlans = [] } = $props();
  let plans = $state(initialPlans);
  let selectedPlanId = $state('');
  let showDetailModal = $state(false);

  function openDetails(id: string) {
    selectedPlanId = id;
    showDetailModal = true;
  }
</script>

<div class="plans-grid">
  {#each plans as plan}
    <div onclick={() => openDetails(plan._id)} role="button" tabindex="0">
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