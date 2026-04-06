<script lang="ts">
  let { surveys = [], show = $bindable(false) } = $props();
  let selectedSurveyId = $state('');
  let isGenerating = $state(false);

  async function handleGenerate() {
    if (!selectedSurveyId) return alert("Please select an assessment first.");
    
    isGenerating = true;
    try {
      const res = await fetch("http://localhost:3000/api/v1/workout/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ surveyId: selectedSurveyId })
      });

      if (res.ok) {
        window.location.reload(); // Refresh to see the new plan
      }
    } catch (err) {
      console.error(err);
    } finally {
      isGenerating = false;
    }
  }
</script>

{#if show}
<div class="modal-backdrop">
  <div class="modal-content">
    <header>
      <h2>Generate New Plan</h2>
      <button class="close" onclick={() => show = false}>&times;</button>
    </header>

    <div class="body">
      <p>Select which fitness assessment to use as the basis for your new AI plan:</p>
      
      <div class="survey-selector">
        {#each surveys as s}
          <label class="survey-option" class:selected={selectedSurveyId === s._id}>
            <input type="radio" name="survey" value={s._id} bind:group={selectedSurveyId} />
            <div class="info">
              <span class="goal">{s.goal}</span>
              <span class="date">{new Date(s.createdAt).toLocaleDateString()}</span>
            </div>
          </label>
        {/each}
      </div>
    </div>

    <footer>
      <button class="btn-secondary" onclick={() => show = false}>Cancel</button>
      <button class="btn-primary" onclick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'AI is thinking...' : 'Generate Plan'}
      </button>
    </footer>
  </div>
</div>
{/if}

<style>
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 3000; }
  .modal-content { background: white; padding: 2rem; border-radius: 16px; width: 400px; }
  .survey-selector { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; max-height: 300px; overflow-y: auto; }
  .survey-option { 
    display: flex; align-items: center; gap: 1rem; padding: 1rem; 
    border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;
  }
  .survey-option.selected { border-color: #3b82f6; background: #eff6ff; }
  .goal { display: block; font-weight: 700; }
  .date { font-size: 0.8rem; color: #6b7280; }
  footer { margin-top: 2rem; display: flex; gap: 1rem; }
  .btn-primary { flex: 2; background: #111827; color: white; padding: 0.8rem; border-radius: 8px; font-weight: 600; border: none; }
  .btn-secondary { flex: 1; background: #f3f4f6; padding: 0.8rem; border-radius: 8px; border: none; }
</style>