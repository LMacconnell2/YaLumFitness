<script>
  // Initialize form state based on your schema
  let workout = {
    date: new Date().toISOString().slice(0, 10),
    duration: 30,
    workoutType: "",
    notes: "",
    exercises: [{ name: "", weight: null, sets: 1, reps: 1, intensity: 5 }],
  };

  function addExercise() {
    workout.exercises = [
      ...workout.exercises,
      { name: "", weight: null, sets: 1, reps: 1, intensity: 5 },
    ];
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
    <section class="workout-data">

      <label for="date"> Date </label>
      <input type="date" id="date" bind:value={workout.date} required />

      <label for="duration"> Duration (mins) </label>
      <input
        type="number"
        id="duration"
        bind:value={workout.duration}
        min="1"
      />

      <label for="workoutType"> Workout Type </label>
      <input
        type="text"
        id="workoutType"
        bind:value={workout.workoutType}
        placeholder="e.g. Upper Body, Cardio"
      />
      
    </section>

    <hr />

    <h3>Exercises</h3>
    {#each workout.exercises as exercise, index}
      <div class="exercise-card">
        <div class="exercise-header">
        <input
        type="text"
        id="exerciseName"
        name="exerciseName"
        bind:value={exercise.name}
        placeholder="Exercise Name"
        required
        />
        <button
            type="button"
            class="btn-delete"
            on:click={() => removeExercise(index)}>✕</button
          >
          </div>

        <div class="exercise-data">
          <label for="number"> Weight </label>
          <input
            type="number"
            bind:value={exercise.weight}
            placeholder="lb/kg"
          />
          <label for="sets"> Sets </label>
          <input type="number" id="sets" bind:value={exercise.sets} min="1" />
          <label for="reps"> Reps </label>
          <input type="number" id="reps" bind:value={exercise.reps} min="1" />
          <label for="intensity"> Intensity (1-10) </label>
          <input
            type="range"
            id="intensity"
            bind:value={exercise.intensity}
            min="1"
            max="10"
          />
          <span>{exercise.intensity}</span>
        </div>
      </div>
    {/each}

    <button type="button" class="btn-secondary" on:click={addExercise}
      >+ Add Exercise</button
    >

    <hr />

    <label for="notes"> Notes </label>
    <textarea id="notes" bind:value={workout.notes} placeholder="How did it feel?"
    ></textarea>

    <button type="submit" class="btn-primary">Save Workout</button>
  </form>
</div>

<style>
  @import "../css/workout.css";
</style>
