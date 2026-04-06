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
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const updated = await res.json();
      dispatch("save", updated);
    } else {
      alert("Failed to update profile");
    }
  }

  function close() {
    dispatch("close");
  }
</script>

<div class="backdrop">
  <div class="modal">
    <h2>Edit Profile</h2>

    <label>Full Name</label>
    <input bind:value={form.name} />

    <label>Email</label>
    <input bind:value={form.email} />

    <label>Height</label>
    <input bind:value={form.height} />

    <label>Weight</label>
    <input bind:value={form.currentWeight} />

    <label>Fitness Goal</label>
    <input bind:value={form.fitnessGoal} />

    <div class="actions">
      <button on:click={close}>Cancel</button>
      <button on:click={save}>Save</button>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>