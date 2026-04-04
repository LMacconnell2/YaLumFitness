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

<style>
  #sidebar {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    z-index: 10;
  }

  .sidebar-header h3 {
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2.5rem;
    color: #111827;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .menu-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #4b5563;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-link:hover {
    background: #f9fafb;
    color: #000;
  }

  .icon {
    font-size: 1.1rem;
    filter: grayscale(100%); /* Optional: makes emojis look more like UI icons */
  }

  .menu-link:hover .icon {
    filter: grayscale(0%);
  }

  .alert-box {
    background: #fef2f2;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid #fee2e2;
  }

  .alert-box p {
    font-size: 0.85rem;
    color: #991b1b;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .btn-primary {
    display: block;
    text-align: center;
    background: #111827;
    color: #fff;
    padding: 0.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .sidebar-footer {
    margin-top: auto;
    padding-top: 1.5rem;
  }

  .retake-link {
    font-size: 0.8rem;
    color: #9ca3af;
    text-decoration: none;
  }

  .retake-link:hover {
    color: #4b5563;
    text-decoration: underline;
  }

  /* Mobile Adjustments: Instead of hiding or hamburger, 
     we just let it scroll if the screen is too short */
  @media (max-width: 768px) {
    #sidebar {
      position: relative;
      height: auto;
      min-height: 100vh;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }
  }
</style>