<script lang="ts">
  import SurveyDetailModal from './SurveyDetailModal.svelte';

  // Receive the history from Astro as a prop
  let { history = [] } = $props();

  let selectedId = $state('');
  let showDetailModal = $state(false);

  function openDetails(id: string) {
    selectedId = id;
    showDetailModal = true;
  }
</script>

<div class="content-card">
  <h3>Assessment History</h3>
  {#if history.length > 0}
    <table class="survey-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Primary Goal</th>
          <th>Fitness Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each history as item}
          <tr>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td><span class="badge">{item.goal}</span></td>
            <td>{item.fitnessLevel}</td>
            <td>
              <button 
                class="text-btn" 
                onclick={() => openDetails(item._id)}
              >
                View Details
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="empty-state">
      <p>You haven't taken any surveys yet.</p>
    </div>
  {/if}
</div>

<SurveyDetailModal bind:show={showDetailModal} bind:surveyId={selectedId} />

<style>
  .content-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .survey-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .survey-table th {
    text-align: left;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #9ca3af;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .survey-table td {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.95rem;
  }

  .badge {
    background: #f3f4f6;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .text-btn {
    background: none;
    border: none;
    color: #3b82f6;
    font-weight: 600;
    cursor: pointer;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
  }
</style>