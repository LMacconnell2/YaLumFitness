<script lang="ts">
  let showModal = $state(false);
  let loading = $state(false);

  // Helper to get today's date in YYYY-MM-DD format for the input
  const today = new Date().toISOString().split('T')[0];

  // Form State
  let logData = $state({
    date: today, // New Date field
    workoutName: "Upper Body Power", 
    duration: 45,
    intensity: 3, 
    caloriesBurned: 300,
    protein: 0,
    carbs: 0,
    fat: 0,
    notes: ""
  });

  async function handleSubmit() {
    loading = true;
    try {
      const res = await fetch("http://127.0.0.1:3000/api/v1/logs", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(logData)
      });

      if (res.ok) {
        showModal = false;
        window.location.reload(); // Refresh dashboard stats to show new data
      }
    } catch (err) {
      console.error("Failed to log workout:", err);
    } finally {
      loading = false;
    }
  }
</script>

<button class="btn-outline" onclick={() => showModal = true}>
  Start Workout
</button>

{#if showModal}
  <div class="modal-backdrop" onclick={() => showModal = false} role="presentation">
    <div class="modal-content" onclick={e => e.stopPropagation()} role="presentation">
      <header>
        <h2>Log Workout & Nutrition</h2>
        <button class="close-btn" onclick={() => showModal = false}>&times;</button>
      </header>

      <div class="scroll-body">
        <section>
          <div class="input-group">
            <label for="workout-date">Workout Date</label>
            <input 
              id="workout-date" 
              type="date" 
              bind:value={logData.date} 
              max={today}
            />
          </div>
        </section>

        <section>
          <h4>Workout Summary</h4>
          <div class="input-group">
            <label for="duration">Duration (minutes)</label>
            <input id="duration" type="number" bind:value={logData.duration} />
          </div>
          <div class="input-group">
            <label for="intensity">Intensity (1-5)</label>
            <input id="intensity" type="range" min="1" max="5" bind:value={logData.intensity} />
            <div class="intensity-labels">
              <span class="hint">Level: {logData.intensity}</span>
              <span class="hint-text">
                {#if logData.intensity <= 2} Light 
                {:else if logData.intensity <= 4} Moderate 
                {:else} Intense {/if}
              </span>
            </div>
          </div>
        </section>

        <section class="nutrition-inputs">
          <h4>Post-Workout Nutrition</h4>
          <div class="grid-3">
            <label>Protein (g) <input type="number" bind:value={logData.protein} /></label>
            <label>Carbs (g) <input type="number" bind:value={logData.carbs} /></label>
            <label>Fat (g) <input type="number" bind:value={logData.fat} /></label>
          </div>
        </section>

        <section>
          <label for="notes">Notes</label>
          <textarea id="notes" bind:value={logData.notes} placeholder="How did it go? Feeling strong?"></textarea>
        </section>
      </div>

      <footer>
        <button class="btn-secondary" onclick={() => showModal = false}>Cancel</button>
        <button class="btn-primary" disabled={loading} onclick={handleSubmit}>
          {loading ? 'Saving...' : 'Finish & Save'}
        </button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    border-radius: 16px;
    width: 95%;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
  }

  .scroll-body {
    padding: 1.5rem;
    overflow-y: auto;
  }

  h4 {
    margin: 1.5rem 0 0.75rem;
    color: #374151;
    font-size: 1rem;
    border-bottom: 1px solid #f3f4f6;
    padding-bottom: 5px;
  }

  section:first-of-type h4 {
    margin-top: 0;
  }

  .input-group {
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    color: #4b5563;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-family: inherit;
  }

  input[type="date"] {
    color: #111827;
  }

  .intensity-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.75rem;
  }

  .hint {
    font-size: 0.8rem;
    font-weight: 700;
    color: #111827;
  }

  .hint-text {
    font-size: 0.8rem;
    color: #6b7280;
  }

  textarea {
    height: 80px;
    resize: none;
  }

  footer {
    padding: 1.25rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .btn-primary {
    background: #111827;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
  }

  .btn-primary:hover {
    background: #1f2937;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: #f3f4f6;
    color: #4b5563;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .btn-outline {
    background: none;
    border: 1px solid #111827;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-outline:hover {
    background: #f9fafb;
  }
</style>