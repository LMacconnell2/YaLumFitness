<script>
  import MealForm from '../forms/MealForm.svelte';
  let showModal = $state(false);
</script>

<button class="btn-log" onclick={() => showModal = true}>Log a Meal 🍽️</button>
<MealForm bind:show={showModal} />

<style>
  .btn-log {
    background: #10b981; color: white; border: none;
    padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700;
    cursor: pointer; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.39);
  }
</style>