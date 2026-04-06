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
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center; z-index: 2000;
    backdrop-filter: blur(4px);
  }
  .modal-content {
    background: white; padding: 2rem; border-radius: 12px; 
    width: 90%; max-width: 500px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  h2 { margin: 0; font-size: 1.25rem; font-weight: 700; }
  
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .item { font-size: 0.95rem; color: #374151; }
  
  .edit-form { display: flex; flex-direction: column; gap: 1rem; }
  .edit-form label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; font-weight: 600; color: #6b7280; }
  .edit-form input, .edit-form select { 
    padding: 0.6rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; color: #111827;
  }
  
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #9ca3af; }
  .actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 2rem; }
  
  .btn-danger { background: #fee2e2; color: #dc2626; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  .btn-primary { background: #111827; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
  .btn-secondary { background: #f3f4f6; color: #374151; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>