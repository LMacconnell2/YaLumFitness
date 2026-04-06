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
  .modal-backdrop { 
    position: fixed; 
    inset: 0; 
    background: rgba(0, 0, 0, 0.85); /* Darker backdrop for focus */
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 3000; 
    backdrop-filter: blur(8px); /* Adds that modern glass feel */
  }

  .modal-content { 
    background: #111114; /* Deep noir background */
    padding: 2rem; 
    border-radius: 16px; 
    width: 400px; 
    border: 1px solid #333; /* Dark border */
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }

  .survey-selector { 
    margin-top: 1rem; 
    display: flex; 
    flex-direction: column; 
    gap: 0.75rem; 
    max-height: 300px; 
    overflow-y: auto; 
    padding-right: 5px;
  }

  /* Custom scrollbar for the "Terminal" look */
  .survey-selector::-webkit-scrollbar { width: 4px; }
  .survey-selector::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }

  .survey-option { 
    display: flex; 
    align-items: center; 
    gap: 1rem; 
    padding: 1rem; 
    background: #000; /* Blacked out inputs */
    border: 1px solid #222; 
    border-radius: 8px; 
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .survey-option.selected { 
    border-color: #00f3ff; /* Cyan glow on selection */
    background: rgba(0, 243, 255, 0.05); 
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
  }

  .goal { 
    display: block; 
    font-weight: 700; 
    color: #fff; 
  }

  .date { 
    font-size: 0.8rem; 
    color: #666; 
    font-family: monospace; /* Monospace for that data-entry look */
  }

  footer { 
    margin-top: 2rem; 
    display: flex; 
    gap: 1rem; 
  }

  .btn-primary { 
    flex: 2; 
    background: #39ff14; /* Toxic green primary action */
    color: #000; 
    padding: 0.8rem; 
    border-radius: 8px; 
    font-weight: 800; 
    border: none; 
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
  }

  .btn-primary:hover {
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
    transform: translateY(-1px);
  }

  .btn-primary:disabled {
    background: #222;
    color: #444;
    cursor: not-allowed;
    box-shadow: none;
  }

  .btn-secondary { 
    flex: 1; 
    background: transparent; 
    color: #888;
    padding: 0.8rem; 
    border-radius: 8px; 
    border: 1px solid #333; 
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.2s;
  }

  .btn-secondary:hover {
    color: #fff;
    border-color: #666;
  }
</style>