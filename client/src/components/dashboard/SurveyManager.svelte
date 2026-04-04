<script lang="ts">
  import SurveyModal from '../forms/SurveyForm.svelte';
  
  // This state only controls if the modal is visible
  let showModal = $state(false);
</script>

<button class="btn-primary" onclick={() => showModal = true}>
  Take New Assessment +
</button>

<SurveyModal bind:show={showModal} isInitial={false} />

<style>
  .btn-primary {
    background: #111827;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-primary:hover {
    background: #374151;
  }
</style>