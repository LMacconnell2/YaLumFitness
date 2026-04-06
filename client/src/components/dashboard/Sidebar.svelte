<script lang="ts">
  let { surveyCompleted = true } = $props();

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { name: 'Surveys', href: '/dashboard/surveys', icon: '📝' },
    { name: 'Workout Planning', href: '/dashboard/workouts', icon: '🏋️‍♂️' },
    { name: 'Meal Planning', href: '/dashboard/meals', icon: '🍎' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];
</script>

<aside id="sidebar">
  <div class="sidebar-header">
    <h3>Fitness Tracker</h3>
  </div>

  <nav>
    {#if !surveyCompleted}
      <div class="alert-box">
        <p>Please complete your initial assessment to unlock all features.</p>
        <a href="/dashboard/surveys/initial" class="btn-primary">Start Survey</a>
      </div>
    {:else}
      <ul class="menu-list">
        {#each menuItems as item}
          <li>
            <a href={item.href} class="menu-link">
              <span class="icon">{item.icon}</span>
              <span class="text">{item.name}</span>
            </a>
          </li>
        {/each}
      </ul>

      <div class="sidebar-footer">
        <a href="/dashboard/surveys/initial" class="retake-link">
          Retake Initial Survey
        </a>
      </div>
    {/if}
  </nav>
</aside>