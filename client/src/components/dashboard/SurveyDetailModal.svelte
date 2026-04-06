<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  let { surveyId = $bindable(''), show = $bindable(false) } = $props();
  const dispatch = createEventDispatcher();

  let survey = $state(null);
  let loading = $state(false);
  let isEditing = $state(false);
  
  // Expanded editData to include all fields from the New Survey form
  let editData = $state({
    goal: '',
    age: 0,
    availableTimePerWeek: 0,
    fitnessLevel: 'beginner',
    experienceLevel: 'beginner',
    equipmentAccess: 'home',
    dietaryRestrictions: '',
    healthConditions: ''
  });

  $effect(() => {
    if (show && surveyId) {
      fetchSurvey();
    }
  });

  async function fetchSurvey() {
    loading = true;
    try {
      const res = await fetch(`http://localhost:3000/api/v1/survey/results/${surveyId}`, {
        credentials: 'include'
      });
      if (res.ok) {
        survey = await res.json();
        // Sync the edit state with fetched data
        editData = { ...survey };
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      loading = false;
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this assessment?")) return;
    
    const res = await fetch(`http://localhost:3000/api/v1/survey/results/${surveyId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      show = false;
      window.location.reload(); 
    }
  }

  async function handleUpdate() {
    // Normalize data types before sending to prevent Mongo validation errors
    const payload = {
      ...editData,
      age: Number(editData.age),
      availableTimePerWeek: Number(editData.availableTimePerWeek)
    };

    const res = await fetch(`http://localhost:3000/api/v1/survey/results/${surveyId}`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      isEditing = false;
      fetchSurvey(); 
      // Optional: reload page to update the History Table if goal/level changed
      window.location.reload(); 
    }
  }
</script>

{#if show}
<div class="modal-backdrop">
  <div class="modal-content">
    {#if loading}
      <p>Loading assessment...</p>
    {:else if survey}
      <header>
        <h2>{isEditing ? 'Edit Assessment' : 'Assessment Details'}</h2>
        <button class="close-btn" onclick={() => show = false}>&times;</button>
      </header>

      <div class="details-body">
        {#if !isEditing}
          <div class="info-grid">
            <div class="item"><strong>Goal:</strong> {survey.goal}</div>
            <div class="item"><strong>Level:</strong> {survey.fitnessLevel}</div>
            <div class="item"><strong>Age:</strong> {survey.age}</div>
            <div class="item"><strong>Time/Week:</strong> {survey.availableTimePerWeek} hrs</div>
            <div class="item"><strong>Equipment:</strong> {survey.equipmentAccess}</div>
            <div class="item"><strong>Dietary:</strong> {survey.dietaryRestrictions || 'None'}</div>
          </div>
        {:else}
          <div class="edit-form">
            <label>
              <span>Goal</span>
              <input type="text" bind:value={editData.goal} />
            </label>

            <div class="row">
              <label>
                <span>Age</span>
                <input type="number" bind:value={editData.age} />
              </label>
              <label>
                <span>Hrs/Week</span>
                <input type="number" bind:value={editData.availableTimePerWeek} />
              </label>
            </div>

            <label>
              <span>Fitness Level</span>
              <select bind:value={editData.fitnessLevel}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <label>
              <span>Equipment</span>
              <select bind:value={editData.equipmentAccess}>
                <option value="home">Home</option>
                <option value="gym">Gym</option>
                <option value="minimal">Minimal</option>
              </select>
            </label>

            <label>
              <span>Dietary Restrictions</span>
              <input type="text" bind:value={editData.dietaryRestrictions} />
            </label>
          </div>
        {/if}
      </div>

      <footer class="actions">
        {#if !isEditing}
          <button class="btn-danger" onclick={handleDelete}>Delete</button>
          <button class="btn-secondary" onclick={() => isEditing = true}>Edit</button>
        {:else}
          <button class="btn-secondary" onclick={() => isEditing = false}>Cancel</button>
          <button class="btn-primary" onclick={handleUpdate}>Save Changes</button>
        {/if}
      </footer>
    {/if}
  </div>
</div>
{/if}

<style>
  .modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center; z-index: 5000;
    backdrop-filter: blur(10px);
  }

  .modal-content {
    background: #0f0f12;
    padding: 2.5rem;
    border-radius: 12px; 
    width: 95%; max-width: 550px;
    border: 1px solid #333;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  header { 
    display: flex; justify-content: space-between; align-items: center; 
    margin-bottom: 2rem; border-bottom: 1px solid #222; padding-bottom: 1rem;
  }

  h2 { margin: 0; font-size: 1.25rem; font-weight: 800; color: #00f3ff; text-transform: uppercase; letter-spacing: 2px; }

  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  
  .item { font-size: 0.9rem; color: #ccc; }
  .item strong { color: #555; text-transform: uppercase; font-size: 0.7rem; display: block; margin-bottom: 0.2rem; }
  
  .edit-form { display: flex; flex-direction: column; gap: 1.2rem; }
  
  label span { font-size: 0.7rem; font-weight: 700; color: #666; text-transform: uppercase; display: block; margin-bottom: 0.4rem; }
  
  input, select { 
    background: #000; border: 1px solid #222; border-radius: 6px; 
    padding: 0.8rem; font-size: 1rem; color: #39ff14; width: 100%;
  }

  input:focus, select:focus { outline: none; border-color: #39ff14; box-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }

  .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #444; }
  .close-btn:hover { color: #ff00e6; }

  .actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2.5rem; }
  
  button { padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.2s; font-size: 0.8rem; }

  .btn-danger { background: transparent; color: #ff3e3e; border: 1px solid #ff3e3e; }
  .btn-danger:hover { background: rgba(255, 62, 62, 0.1); box-shadow: 0 0 10px rgba(255, 62, 62, 0.3); }

  .btn-primary { background: #00f3ff; color: #000; border: none; }
  .btn-primary:hover { box-shadow: 0 0 20px rgba(0, 243, 255, 0.5); }

  .btn-secondary { background: transparent; color: #ccc; border: 1px solid #444; }
  .btn-secondary:hover { border-color: #888; color: #fff; }
</style>