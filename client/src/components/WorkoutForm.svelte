
<script>
  // Initialize form state based on your schema
  let workout = {
    date: new Date().toISOString().slice(0, 10),
    duration: 30,
    workoutType: '',
    notes: '',
    exercises: [
      { name: '', weight: null, sets: 1, reps: 1, intensity: 5 }
    ]
  };

  function addExercise() {
    workout.exercises = [...workout.exercises, { name: '', weight: null, sets: 1, reps: 1, intensity: 5 }];
  }

  function removeExercise(index) {
    workout.exercises = workout.exercises.filter((_, i) => i !== index);
  }

  function handleSubmit() {
    console.log("Submitting Workout Data:", workout);
    // Add your API call/logic here
  }
</script>

<div class="workout-form">
  <h2>Log Workout</h2>
  
  <form on:submit|preventDefault={handleSubmit}>
    <section class="meta-data">
      <label>
        Date
        <input type="date" bind:value={workout.date} required />
      </label>

      <label>
        Duration (mins)
        <input type="number" bind:value={workout.duration} min="1" />
      </label>

      <label>
        Workout Type
        <input type="text" bind:value={workout.workoutType} placeholder="e.g. Upper Body, Cardio" />
      </label>
    </section>

    <hr />

    <h3>Exercises</h3>
    {#each workout.exercises as exercise, index}
      <div class="exercise-card">
        <div class="row">
          <input type="text" bind:value={exercise.name} placeholder="Exercise Name" required />
          <button type="button" class="btn-delete" on:click={() => removeExercise(index)}>✕</button>
        </div>

        <div class="grid">
          <label>
            Weight
            <input type="number" bind:value={exercise.weight} placeholder="lb/kg" />
          </label>
          <label>
            Sets
            <input type="number" bind:value={exercise.sets} min="1" />
          </label>
          <label>
            Reps
            <input type="number" bind:value={exercise.reps} min="1" />
          </label>
          <label>
            Intensity (1-10)
            <input type="range" bind:value={exercise.intensity} min="1" max="10" />
            <span>{exercise.intensity}</span>
          </label>
        </div>
      </div>
    {/each}

    <button type="button" class="btn-secondary" on:click={addExercise}>+ Add Exercise</button>

    <hr />

    <label>
      Notes
      <textarea bind:value={workout.notes} placeholder="How did it feel?"></textarea>
    </label>

    <button type="submit" class="btn-primary">Save Workout</button>
  </form>
</div>


<style>
  @import "../css/survey.css";
</style>
