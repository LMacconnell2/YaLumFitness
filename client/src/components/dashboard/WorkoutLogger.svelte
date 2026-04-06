<script lang="ts">
  let showModal = $state(false);
  let loading = $state(false);
  const today = new Date().toISOString().split('T')[0];

  let logData = $state({
    date: today,
    workoutName: "Upper Body Power", 
    duration: 45,
    intensity: 3, 
    caloriesBurned: 300,
    protein: 0, carbs: 0, fat: 0,
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
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  }
</script>

<button class="btn-neon-outline" onclick={() => showModal = true}>
  Start Session
</button>

{#if showModal}
  <div class="modal-backdrop" onclick={() => showModal = false} role="presentation">
    <div class="modal-content" onclick={e => e.stopPropagation()} role="presentation">
      <header>
        <h2 class="neon-text-blue">Mission Log</h2>
        <button class="close-btn" onclick={() => showModal = false}>&times;</button>
      </header>

      <div class="scroll-body">
        <section>
          <div class="input-group">
            <label for="workout-date">Timestamp</label>
            <input id="workout-date" type="date" bind:value={logData.date} max={today}/>
          </div>
        </section>

        <section>
          <h4 class="section-title">Performance</h4>
          <div class="input-group">
            <label for="duration">Duration (min)</label>
            <input id="duration" type="number" bind:value={logData.duration} />
          </div>
          <div class="input-group">
            <label for="intensity">Exertion Level: {logData.intensity}</label>
            <input id="intensity" type="range" min="1" max="5" bind:value={logData.intensity} />
          </div>
        </section>

        <section class="nutrition-inputs">
          <h4 class="section-title">Bio-Fuel Intake</h4>
          <div class="grid-3">
            <label>P (g) <input type="number" bind:value={logData.protein} /></label>
            <label>C (g) <input type="number" bind:value={logData.carbs} /></label>
            <label>F (g) <input type="number" bind:value={logData.fat} /></label>
          </div>
        </section>

        <section>
          <label for="notes">Intelligence/Notes</label>
          <textarea id="notes" bind:value={logData.notes} placeholder="How was the resistance?"></textarea>
        </section>
      </div>

      <footer>
        <button class="btn-cancel" onclick={() => showModal = false}>Abort</button>
        <button class="btn-save" disabled={loading} onclick={handleSubmit}>
          {loading ? 'Transmitting...' : 'Upload Data'}
        </button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    backdrop-filter: blur(8px);
  }

  .modal-content {
    background: #0f0f12;
    border: 1px solid #333;
    border-radius: 12px;
    width: 95%;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.15);
    color: #fff;
  }

  header {
    padding: 1.5rem;
    border-bottom: 1px solid #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #555; }
  .close-btn:hover { color: #ff00e6; }

  .scroll-body { padding: 1.5rem; overflow-y: auto; }

  .section-title {
    margin: 1.5rem 0 0.75rem;
    color: #39ff14;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #222;
    padding-bottom: 5px;
  }

  .input-group { margin-bottom: 1.25rem; }
  label { display: block; font-size: 0.8rem; color: #888; margin-bottom: 0.5rem; }

  input, textarea {
    width: 100%;
    padding: 0.7rem;
    background: #16161a;
    border: 1px solid #333;
    border-radius: 6px;
    color: #fff;
    font-family: inherit;
  }

  input:focus { outline: none; border-color: #00f3ff; box-shadow: 0 0 8px rgba(0, 243, 255, 0.3); }

  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  textarea { height: 80px; resize: none; }

  footer { padding: 1.25rem; border-top: 1px solid #222; display: flex; justify-content: flex-end; gap: 0.75rem; }

  .btn-save {
    background: #39ff14;
    color: #000;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 800;
    text-transform: uppercase;
  }

  .btn-cancel {
    background: transparent;
    color: #ff00e6;
    border: 1px solid #ff00e6;
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
  }

  .btn-neon-outline {
    background: transparent;
    border: 1px solid #39ff14;
    color: #39ff14;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    transition: 0.2s;
  }

  .btn-neon-outline:hover {
    background: rgba(57, 255, 20, 0.1);
    box-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
  }
</style>