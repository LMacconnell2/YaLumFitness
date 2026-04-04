<script lang="ts">
  let showModal = $state(false);
  let step = $state(1); // For multi-step survey logic

  // Survey Data State
  let formData = $state({
    weight: '',
    goal: 'Maintenance',
    activityLevel: 'Moderate'
  });

  async function submitSurvey() {
    // In the future: fetch('/api/v1/surveys', { method: 'POST', ... })
    console.log("Survey Submitted:", formData);
    showModal = false;
    // Refresh page to show new history
    window.location.reload();
  }
</script>

<button class="btn-primary" onclick={() => { showModal = true; step = 1; }}>
  Take New Assessment +
</button>

{#if showModal}
  <div class="modal-backdrop" onclick={() => showModal = false} aria-hidden="true">
    <div class="modal-content" onclick={(e) => e.stopPropagation()} aria-hidden="true">
      <header>
        <h2>Fitness Survey</h2>
        <button class="close-x" onclick={() => showModal = false}>&times;</button>
      </header>

      <div class="survey-steps">
        {#if step === 1}
          <div class="step">
            <label for="weight">What is your current weight (lbs)?</label>
            <input type="number" id="weight" bind:value={formData.weight} placeholder="e.g. 185" />
            <button class="btn-next" onclick={() => step = 2}>Next</button>
          </div>
        {:else if step === 2}
          <div class="step">
            <label for="goal">What is your primary goal?</label>
            <select id="goal" bind:value={formData.goal}>
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Maintenance</option>
            </select>
            <div class="actions">
              <button class="btn-back" onclick={() => step = 1}>Back</button>
              <button class="btn-primary" onclick={submitSurvey}>Finish</button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .btn-primary {
    background: #111827;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    width: 90%;
    max-width: 500px;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .close-x { background: none; border: none; font-size: 1.5rem; cursor: pointer; }

  .step { display: flex; flex-direction: column; gap: 1rem; }
  
  label { font-weight: 600; color: #374151; }
  
  input, select {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
  }

  .actions { display: flex; gap: 1rem; margin-top: 1rem; }
  .btn-next { background: #3b82f6; color: white; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  .btn-back { background: #f3f4f6; color: #374151; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>