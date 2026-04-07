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
    background: #16161a;
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid #222;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  .card-title {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #39ff14;
    margin-bottom: 1.5rem;
  }

  .table-container { overflow-x: auto; }

  .survey-table { width: 100%; border-collapse: collapse; }

  .survey-table th {
    text-align: left;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #555;
    padding: 1rem;
    border-bottom: 2px solid #222;
    letter-spacing: 1px;
  }

  .survey-table td {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid #222;
    color: #ccc;
    font-size: 0.9rem;
  }

  .date-cell { font-family: monospace; color: #888; }
  .level-text { text-transform: capitalize; color: #fff; font-weight: 600; }

  .neon-badge-blue {
    background: rgba(0, 243, 255, 0.1);
    color: #00f3ff;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    border: 1px solid rgba(0, 243, 255, 0.3);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .view-btn {
    background: transparent;
    border: 1px solid #ff00e6;
    color: #ff00e6;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
  }

  .view-btn:hover {
    background: rgba(255, 0, 230, 0.1);
    box-shadow: 0 0 10px rgba(255, 0, 230, 0.4);
  }

  .empty-state { padding: 3rem; text-align: center; color: #555; font-style: italic; }
</style>