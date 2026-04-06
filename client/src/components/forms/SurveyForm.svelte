<script lang="ts">
  let { show = $bindable(false), isInitial = false } = $props();

  let formData = $state({
    goal: '',
    age: '',
    availableTimePerWeek: '',
    fitnessLevel: 'beginner',
    experienceLevel: 'beginner',
    equipmentAccess: 'home',
    dietaryRestrictions: '',
    healthConditions: ''
  });

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error:", error);
        return;
      }

      const data = await res.json();
      console.log("Created survey:", data);

      show = false;

      if (isInitial) {
        window.location.href = "/dashboard";
      } else {
        window.location.reload();
      }

    } catch (err) {
      console.error("Request failed:", err);
    }
  }
</script>

{#if show}
<div class="modal-backdrop" class:initial={isInitial}>
  <div class="modal-content">
    <div class="survey-form">
      <h2>{isInitial ? 'Initial Assessment' : 'New Survey'}</h2>
      <p>{isInitial ? 'Let\'s get some basics to build your plan.' : 'Update your fitness profile.'}</p>
      
      <form onsubmit={handleSubmit}>
        <div class="form-grid">
          <label>
            <span>Goal</span>
            <input type="text" bind:value={formData.goal} placeholder="e.g. Muscle Gain" required />
          </label>

          <label>
            <span>Age</span>
            <input type="number" bind:value={formData.age} required />
          </label>

          <label>
            <span>Available Time (hrs/week)</span>
            <input type="number" bind:value={formData.availableTimePerWeek} required />
          </label>

          <label>
            <span>Fitness Level</span>
            <select bind:value={formData.fitnessLevel}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <label>
            <span>Equipment Access</span>
            <select bind:value={formData.equipmentAccess}>
              <option value="home">Home</option>
              <option value="gym">Gym</option>
              <option value="minimal">Minimal</option>
            </select>
          </label>

          <label>
            <span>Dietary Restrictions</span>
            <input type="text" bind:value={formData.dietaryRestrictions} placeholder="None" />
          </label>
        </div>

        <div class="actions">
          {#if !isInitial}
            <button type="button" class="btn-secondary" onclick={() => show = false}>Cancel</button>
          {/if}
          <button type="submit" class="btn-primary">Submit Assessment</button>
        </div>
      </form>
    </div>
  </div>
</div>
{/if}

<style>
  .modal-backdrop {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7); display: flex; align-items: center;
    justify-content: center; z-index: 1000; backdrop-filter: blur(8px);
  }
  /* If it's the initial page, maybe remove the blur/opacity for a cleaner "page" feel */
  .modal-backdrop.initial { background: #f9fafb; backdrop-filter: none; }

  .modal-content {
    background: white; padding: 2.5rem; border-radius: 20px;
    width: 90%; max-width: 600px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  }

  h2 { margin: 0; font-weight: 800; }
  p { color: #6b7280; margin-bottom: 2rem; }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  label { display: flex; flex-direction: column; gap: 0.5rem; font-weight: 600; font-size: 0.9rem; }
  
  input, select {
    padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;
  }

  .actions { margin-top: 2rem; display: flex; gap: 1rem; }
  .btn-primary { flex: 2; background: #111827; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
  .btn-secondary { flex: 1; background: #f3f4f6; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
  
  @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
</style>
