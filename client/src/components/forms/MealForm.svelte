<script>
  let showModal = $state(false);
  let isSubmitting = $state(false);
  let error = $state("");

  let meal = $state({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    foodItems: []
  });

  let searchQuery = $state("");
  let searchResults = $state([]);
  let isSearching = $state(false);
  let searchTimeout;

  async function searchFoods() {
    if (!searchQuery.trim()) { searchResults = []; return; }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      isSearching = true;
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/food?search=${encodeURIComponent(searchQuery)}`,
          { credentials: "include" }
        );
        searchResults = res.ok ? await res.json() : [];
      } catch {
        searchResults = [];
      } finally {
        isSearching = false;
      }
    }, 300);
  }

  function addFoodItem(food) {
    if (meal.foodItems.find(f => f.foodId === food._id)) return;
    meal.foodItems = [...meal.foodItems, {
      foodId: food._id,
      name: food.name,
      servingNum: food.servingSize ?? 1,
      servingUnit: food.servingUnit,
      calories: food.calories
    }];
    searchQuery = "";
    searchResults = [];
  }

  function removeFood(foodId) {
    meal.foodItems = meal.foodItems.filter(f => f.foodId !== foodId);
  }

  async function handleSubmit() {
    if (!meal.date || !meal.time) { error = "Date and time are required."; return; }
    if (meal.foodItems.length === 0) { error = "Add at least one food item."; return; }
    error = "";
    isSubmitting = true;

    try {
      const res = await fetch("http://localhost:3000/api/v1/meals", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: meal.date,
          time: meal.time,
          foodItems: meal.foodItems.map(f => ({ foodId: f.foodId, servingNum: Number(f.servingNum) }))
        })
      });

      if (res.ok) {
        showModal = false;
        window.location.reload();
      } else {
        const err = await res.json();
        error = err.error ?? "Failed to save meal.";
      }
    } catch (e) {
      error = "Network error. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<button type="button" class="btn-log" onclick={() => showModal = true}>
  Log a Meal 🍽️
</button>

{#if showModal}
<div class="meal-form">
  <h2>Log a Meal</h2>

  <form onsubmit={e => { e.preventDefault(); handleSubmit(); }}>

    <section class="meal-meta">
      <label for="date">Date</label>
      <input type="date" id="date" bind:value={meal.date} required />

      <label for="time">Time</label>
      <input type="time" id="time" bind:value={meal.time} required />
    </section>

    <hr />

    <h3>Food Items</h3>

    <div class="search-wrap">
      <input
        type="text"
        placeholder="Search foods (e.g. Avocado, Oatmeal...)"
        bind:value={searchQuery}
        oninput={searchFoods}
      />
      {#if isSearching}
        <p class="search-status">Searching...</p>
      {/if}
      {#if searchResults.length > 0}
        <ul class="results-list">
          {#each searchResults as food}
            <li onclick={() => addFoodItem(food)}>
              <span class="food-name">{food.name}</span>
              <span class="food-meta">{food.calories} kcal · {food.servingSize} {food.servingUnit}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    {#each meal.foodItems as item}
      <div class="food-card">
        <div class="food-header">
          <strong>{item.name}</strong>
          <button type="button" class="btn-delete" onclick={() => removeFood(item.foodId)}>✕</button>
        </div>
        <div class="food-data">
          <label>Servings ({item.servingUnit})</label>
          <input type="number" min="0.25" step="0.25" bind:value={item.servingNum} />
          <span class="kcal">{Math.round(item.calories * item.servingNum)} kcal</span>
        </div>
      </div>
    {/each}

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <hr />

    <button type="submit" class="btn-primary" disabled={isSubmitting}>
      {isSubmitting ? "Saving..." : "Save Meal"}
    </button>

    <button type="button" class="btn-secondary" onclick={() => showModal = false}>Cancel</button>

  </form>
</div>
{/if}

<style>
  .btn-log {
    background: #10b981; color: white; border: none;
    padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700;
    cursor: pointer; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.39);
  }

  .meal-form {
    background: white; border-radius: 16px; padding: 2rem;
    display: flex; flex-direction: column; gap: 1rem;
    max-width: 500px; margin: 2rem auto;
  }
  .meal-form h2 { font-size: 1.3rem; font-weight: 800; margin: 0; }
  .meal-form h3 { font-size: 1rem; font-weight: 700; margin: 0; }

  .meal-meta { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem; align-items: center; }
  label { font-size: 0.85rem; font-weight: 600; color: #374151; }
  input[type="date"], input[type="time"] {
    padding: 0.6rem; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 0.9rem;
  }

  .search-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
  .search-wrap input[type="text"] {
    width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb;
    border-radius: 10px; font-size: 0.9rem; box-sizing: border-box;
  }
  .search-status { font-size: 0.8rem; color: #9ca3af; margin: 0; }
  .results-list {
    list-style: none; margin: 0; padding: 0;
    border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;
  }
  .results-list li {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.75rem 1rem; cursor: pointer; transition: background 0.15s;
  }
  .results-list li:hover { background: #f0fdf4; }
  .results-list li + li { border-top: 1px solid #f3f4f6; }
  .food-name { font-weight: 600; font-size: 0.9rem; }
  .food-meta { font-size: 0.8rem; color: #9ca3af; }

  .food-card {
    background: #f9fafb; border-radius: 10px; padding: 0.75rem 1rem;
    display: flex; flex-direction: column; gap: 0.5rem;
  }
  .food-header { display: flex; justify-content: space-between; align-items: center; }
  .food-data { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; }
  .food-data input[type="number"] {
    width: 72px; padding: 0.4rem; border: 1px solid #e5e7eb;
    border-radius: 6px; text-align: center; font-size: 0.9rem;
  }
  .kcal { color: #6b7280; font-size: 0.82rem; }

  .btn-delete { background: #fee2e2; border: none; color: #dc2626; border-radius: 6px; padding: 0.3rem 0.6rem; cursor: pointer; }
  .error { color: #dc2626; font-size: 0.85rem; margin: 0; }
  hr { border: none; border-top: 1px solid #f3f4f6; }

  .btn-primary { width: 100%; background: #10b981; color: white; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 700; cursor: pointer; margin-bottom: 0.5rem; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-secondary { width: 100%; background: #f3f4f6; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>