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
    background: #10b981;
    color: white; border: none; padding: 0.8rem 1.5rem;
    border-radius: 12px; font-weight: 700; cursor: pointer;
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.39);
  }
  .modal-backdrop {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); display: flex; align-items: center;
    justify-content: center; z-index: 100;
    backdrop-filter: blur(4px);
  }
  .modal-content {
    background: white; padding: 2rem; border-radius: 16px; width: 400px;
  }
  select { width: 100%; padding: 0.8rem; margin: 1.5rem 0; border-radius: 8px; border: 1px solid #ddd; }
  .actions { display: flex; gap: 1rem; }
  .btn-confirm { flex: 1; background: #10b981; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; }
  .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-cancel { background: #f3f4f6; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; }
</style>