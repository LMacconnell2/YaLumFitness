<script lang="ts">
  let { user } = $props();

  // Simple local state for toggles
  let emailNotifications = $state(true);
  let darkMode = $state(false);
  let units = $state('imperial'); // lbs vs kg

  async function handleLogout() {
    // Replace with your better-auth logout logic
    console.log("Logging out...");
    window.location.href = "/login";
  }
</script>

<div class="settings-stack">
  <section class="settings-card">
    <h3>Preferences</h3>
    <div class="setting-row">
      <div class="text">
        <strong>Unit System</strong>
        <p>Choose between Imperial (lbs) or Metric (kg).</p>
      </div>
      <select bind:value={units}>
        <option value="imperial">Imperial</option>
        <option value="metric">Metric</option>
      </select>
    </div>

    <div class="setting-row">
      <div class="text">
        <strong>Email Updates</strong>
        <p>Receive weekly progress reports.</p>
      </div>
      <input type="checkbox" bind:checked={emailNotifications} />
    </div>
  </section>

  <section class="settings-card">
    <h3>Account</h3>
    <div class="setting-row">
      <div class="text">
        <strong>Email Address</strong>
        <p>{user?.email || 'N/A'}</p>
      </div>
      <button class="btn-small">Update</button>
    </div>
  </section>

  <section class="settings-card danger">
    <h3>Danger Zone</h3>
    <p class="warning-text">Once you delete your account, there is no going back. Please be certain.</p>
    <div class="danger-actions">
      <button class="btn-logout" onclick={handleLogout}>Log Out</button>
      <button class="btn-delete">Delete Account</button>
    </div>
  </section>
</div>

<style>
  .settings-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .settings-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .settings-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #111827;
  }

  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-top: 1px solid #f3f4f6;
  }

  .setting-row:first-of-type { border-top: none; padding-top: 0; }

  .text strong { display: block; font-size: 0.95rem; color: #374151; }
  .text p { font-size: 0.85rem; color: #6b7280; margin: 0; }

  select {
    padding: 0.4rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }

  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  .btn-small {
    background: #f3f4f6;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  /* Danger Zone Styles */
  .danger { border-color: #fee2e2; }
  .danger h3 { color: #991b1b; }
  .warning-text { font-size: 0.85rem; color: #6b7280; margin-bottom: 1.5rem; }

  .danger-actions { display: flex; gap: 1rem; }
  
  .btn-logout {
    background: #111827;
    color: white;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-delete {
    background: white;
    color: #dc2626;
    border: 1px solid #dc2626;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-delete:hover { background: #fef2f2; }
</style>