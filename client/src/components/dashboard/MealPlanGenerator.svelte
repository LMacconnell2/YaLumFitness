<script>
  let { surveys } = $props();
  let selectedSurveyId = $state("");
  let isGenerating = $state(false);
  let showModal = $state(false);

  async function generateMealPlan() {
    if (!selectedSurveyId) return;
    isGenerating = true;
    try {
      const response = await fetch("http://localhost:3000/api/v1/meals", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId: selectedSurveyId,
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString(),
          foodItems: []
        })
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const err = await response.json();
        console.error("Server error:", err);
      }
    } catch (e) {
      console.error("Meal generation failed", e);
    } finally {
      isGenerating = false;
      showModal = false;
    }
  }
</script>

<button class="btn-generate" onclick={() => showModal = true}>
  Generate Meal Plan 🥗
</button>

{#if showModal}
<div class="modal-backdrop" onclick={() => showModal = false} aria-hidden="true">
  <div class="modal-content" onclick={e => e.stopPropagation()} aria-hidden="true">
    <h2>AI Nutritionist</h2>
    <p>Which assessment should we use to calculate your macros?</p>

    <select bind:value={selectedSurveyId}>
      <option value="" disabled selected>Select an assessment...</option>
      {#each surveys as survey}
        <option value={survey.id}>
          {new Date(survey.date).toLocaleDateString()} - {survey.goal}
        </option>
      {/each}
    </select>

    <div class="actions">
      <button class="btn-cancel" onclick={() => showModal = false}>Cancel</button>
      <button class="btn-confirm" onclick={generateMealPlan} disabled={isGenerating || !selectedSurveyId}>
        {isGenerating ? "Analyzing data..." : "Create Plan"}
      </button>
    </div>
  </div>
</div>
{/if}

<style>
  .btn-generate {
    background: #39ff14;
    color: #000; 
    border: none; 
    padding: 0.9rem 1.8rem;
    border-radius: 8px; 
    font-weight: 900; 
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 0 15px rgba(57, 255, 20, 0.3);
    transition: 0.3s;
  }

  .btn-generate:hover {
    box-shadow: 0 0 25px rgba(57, 255, 20, 0.5);
    transform: scale(1.02);
  }

  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.85); 
    display: flex; align-items: center; justify-content: center; 
    z-index: 1000;
    backdrop-filter: blur(12px);
  }

  .modal-content {
    background: #111114; 
    padding: 2.5rem; 
    border-radius: 16px; 
    width: 400px;
    border: 1px solid #333;
    color: #fff;
  }

  h2 { color: #00f3ff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
  
  p { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }

  select { 
    width: 100%; 
    padding: 0.8rem; 
    margin: 1.5rem 0; 
    border-radius: 8px; 
    background: #000;
    border: 1px solid #333; 
    color: #39ff14;
    font-family: monospace;
    outline: none;
  }

  select:focus { border-color: #39ff14; box-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }

  .actions { display: flex; gap: 1rem; }

  .btn-confirm { 
    flex: 2; 
    background: #39ff14; 
    color: #000; 
    border: none; 
    padding: 0.8rem; 
    border-radius: 8px; 
    cursor: pointer; 
    font-weight: 900;
    text-transform: uppercase;
  }

  .btn-confirm:disabled { opacity: 0.3; cursor: not-allowed; filter: grayscale(1); }

  .btn-cancel { 
    flex: 1;
    background: transparent; 
    border: 1px solid #444; 
    color: #888;
    padding: 0.8rem; 
    border-radius: 8px; 
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
  }

  .btn-cancel:hover { color: #fff; border-color: #666; }
</style>