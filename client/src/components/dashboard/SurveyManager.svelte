<script lang="ts">
  import SurveyModal from '../forms/SurveyForm.svelte';
  
  // This state only controls if the modal is visible
  let showModal = $state(false);
</script>

<button class="btn-primary, btn-initiate" onclick={() => showModal = true}>
  Take New Assessment +
</button>

<SurveyModal bind:show={showModal} isInitial={false} />

<style>
  .btn-initiate {
    background: #39ff14;
    color: #000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
    letter-spacing: 1px;
    box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
  }

  .btn-initiate:hover {
    box-shadow: 0 0 25px rgba(57, 255, 20, 0.5);
    transform: translateY(-2px);
  }
</style>