<script>
  
  let survey = true; // Placeholder for survey completion status
  let sidebarOpen = false;
</script>

<button
  class="menu-button"
  class:open={sidebarOpen}
  aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
  on:click={() => sidebarOpen = !sidebarOpen}
>
  <span class="bar top"></span>
  <span class="bar middle"></span>
  <span class="bar bottom"></span>
</button>

<aside id="sidebar" class:open={sidebarOpen}>
  <nav>
    {#if !survey}
      <p>Please take our survey to use our fitness planner</p>
      <ul>
        <li><a href="/survey">Survey</a></li>
      </ul>
    {:else}
      <ul>
        <li><a href="/survey">Retake Survey</a></li>
        <li><a href="/plan">View Plan</a></li>
      </ul>
    {/if}
  </nav>
</aside>