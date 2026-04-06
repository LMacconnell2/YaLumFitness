<script lang="ts">
  import PlanGeneratorModal from './PlanGeneratorModal.svelte';

  let { surveys = [] } = $props();
  let showModal = $state(false);
</script>

<button class="btn-generate" onclick={() => showModal = true}>
  Generate New Plan
</button>

<PlanGeneratorModal {surveys} bind:show={showModal} />

<style>
  .btn-generate {
    background: #111827;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-generate:hover { background: #374151; }
</style>