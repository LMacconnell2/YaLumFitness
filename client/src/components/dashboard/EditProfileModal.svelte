<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let user;
  export let profile;

  const dispatch = createEventDispatcher();

  let form = {
    name: user?.name || "",
    email: user?.email || "",
    height: profile?.height || "",
    currentWeight: profile?.currentWeight || "",
    fitnessGoal: profile?.fitnessGoal || ""
  };

  async function save() {
    const res = await fetch("http://localhost:3000/api/v1/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const updated = await res.json();
      dispatch("save", updated);
    } else {
      alert("System Error: Failed to update profile protocol");
    }
  }

  function close() {
    dispatch("close");
  }
</script>

<div class="backdrop" on:click|self={close} role="presentation">
  <div class="modal">
    <h2 class="neon-text">Modify User Protocol</h2>

    <div class="input-group">
      <label>Full Identity</label>
      <input bind:value={form.name} placeholder="Enter name..." />
    </div>

    <div class="input-group">
      <label>Comm-Link (Email)</label>
      <input bind:value={form.email} placeholder="Enter email..." />
    </div>

    <div class="grid-2">
      <div class="input-group">
        <label>Height</label>
        <input bind:value={form.height} placeholder="e.g. 180cm" />
      </div>
      <div class="input-group">
        <label>Mass (Weight)</label>
        <input bind:value={form.currentWeight} placeholder="e.g. 85kg" />
      </div>
    </div>

    <div class="input-group">
      <label>Primary Fitness Objective</label>
      <input bind:value={form.fitnessGoal} placeholder="e.g. Hypertrophy" />
    </div>

    <div class="actions">
      <button class="btn-secondary" on:click={close}>Abort</button>
      <button class="btn-primary" on:click={save}>Commit Changes</button>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    z-index: 10000;
  }

  .modal {
    background: #111114;
    padding: 2.5rem;
    border-radius: 16px;
    width: 95%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border: 1px solid #333;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input {
    padding: 0.8rem;
    background: #000;
    border: 1px solid #222;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #00f3ff;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8rem;
    transition: 0.2s;
  }

  .btn-primary {
    background: #00f3ff;
    color: #000;
    border: none;
  }

  .btn-primary:hover {
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
    background: #00e0eb;
  }

  .btn-secondary {
    background: transparent;
    color: #ff00e6;
    border: 1px solid #ff00e6;
  }

  .btn-secondary:hover {
    background: rgba(255, 0, 230, 0.1);
    box-shadow: 0 0 10px rgba(255, 0, 230, 0.3);
  }
</style>