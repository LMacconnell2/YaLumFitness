<script lang="ts">
  let { surveys } = $props();
  let selectedSurveyId = $state("");
  let isGenerating = $state(false);
  let showModal = $state(false);

  async function generatePlan() {
    if (!selectedSurveyId) return alert("Please select a survey first!");
    
    isGenerating = true;
    try {
      const response = await fetch("http://localhost:3000/api/v1/ai/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId: selectedSurveyId })
      });

      if (response.ok) {
        const newPlan = await response.json();
        alert("Plan Generated Successfully!");
        window.location.reload(); // Refresh to show the new plan
      }
    } catch (e) {
      console.error("AI Generation failed", e);
    } finally {
      isGenerating = false;
      showModal = false;
    }
  }
</script>

<button class="btn-generate" onclick={() => showModal = true}>
  Generate New AI Plan ✨
</button>

{#if showModal}
<div class="modal-backdrop">
  <div class="modal-content">
    <h2>Generate AI Workout</h2>
    <p>Select a past assessment to guide Gemini in creating your plan.</p>

    <select bind:value={selectedSurveyId}>
      <option value="" disabled selected>Select a survey...</option>
      {#each surveys as survey}
        <option value={survey.id}>
          {new Date(survey.date).toLocaleDateString()} - {survey.goal}
        </option>
      {/each}
    </select>

    <div class="actions">
      <button class="btn-cancel" onclick={() => showModal = false}>Cancel</button>
      <button class="btn-confirm" onclick={generatePlan} disabled={isGenerating}>
        {isGenerating ? "Gemini is thinking..." : "Generate Plan"}
      </button>
    </div>
  </div>
</div>
{/if}

<style>
  .btn-generate {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: white; border: none; padding: 0.8rem 1.5rem;
    border-radius: 12px; font-weight: 700; cursor: pointer;
  }
  .modal-backdrop {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 100;
  }
  .modal-content {
    background: white; padding: 2rem; border-radius: 16px; width: 400px;
  }
  select { width: 100%; padding: 0.8rem; margin: 1.5rem 0; border-radius: 8px; border: 1px solid #ddd; }
  .actions { display: flex; gap: 1rem; }
  .btn-confirm { flex: 1; background: #111827; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; }
  .btn-confirm:disabled { opacity: 0.5; }
  .btn-cancel { background: #f3f4f6; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; }
</style>