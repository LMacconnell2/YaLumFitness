<script lang="ts">
  let { surveyCompleted = true } = $props();
  let isCollapsed = $state(false); // State to track collapse

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { name: 'Surveys', href: '/dashboard/surveys', icon: '📝' },
    { name: 'Workout Planning', href: '/dashboard/workouts', icon: '🏋️‍♂️' },
    { name: 'Meal Planning', href: '/dashboard/meals', icon: '🍎' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  function toggleSidebar() {
    isCollapsed = !isCollapsed;
  }
</script>

<aside id="sidebar" class:collapsed={isCollapsed}>
  <div class="sidebar-header">
    {#if !isCollapsed}
      <h3>Fitness <span class="neon-green">Tracker</span></h3>
    {/if}
    <button class="toggle-btn" onclick={toggleSidebar} aria-label="Toggle Sidebar">
      {isCollapsed ? '→' : '←'}
    </button>
  </div>

  <nav>
    {#if !surveyCompleted && !isCollapsed}
      <div class="alert-box">
        <p>Complete assessment to unlock features.</p>
        <a href="/dashboard/surveys/initial" class="btn-primary">Start</a>
      </div>
    {:else}
      <ul class="menu-list">
        {#each menuItems as item}
          <li>
            <a href={item.href} class="menu-link" title={isCollapsed ? item.name : ''}>
              <span class="icon">{item.icon}</span>
              {#if !isCollapsed}
                <span class="text">{item.name}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>

      {#if !isCollapsed}
        <div class="sidebar-footer">
          <a href="/dashboard/surveys/initial" class="retake-link">
            Retake Assessment
          </a>
        </div>
      {/if}
    {/if}
  </nav>
</aside>

<style>
  #sidebar {
    background: #0d0d0f;
    border-right: 1px solid #222;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 280px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  #sidebar.collapsed {
    width: 80px;
  }

  .sidebar-header {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1a1a1a;
    min-height: 80px;
  }

  h3 {
    color: #fff;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  .neon-green {
    color: #39ff14;
    text-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
  }

  .toggle-btn {
    background: #1a1a1a;
    border: 1px solid #333;
    color: #00f3ff;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 8px;
    font-family: monospace;
    transition: 0.2s;
  }

  .toggle-btn:hover {
    background: #00f3ff;
    color: #000;
    box-shadow: 0 0 10px #00f3ff;
  }

  .menu-list {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
  }

  .menu-link {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    color: #888;
    text-decoration: none;
    transition: 0.2s;
    gap: 1rem;
  }

  .menu-link:hover {
    background: rgba(0, 243, 255, 0.05);
    color: #fff;
    border-left: 3px solid #00f3ff;
  }

  .icon { font-size: 1.2rem; }
  .text { font-weight: 600; font-size: 0.9rem; }

  .sidebar.collapsed .menu-link {
    justify-content: center;
    padding: 1.2rem 0;
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 1.5rem;
    border-top: 1px solid #1a1a1a;
  }

  .retake-link {
    color: #444;
    font-size: 0.75rem;
    text-decoration: none;
    font-family: monospace;
    text-transform: uppercase;
  }

  .retake-link:hover { color: #ff00e6; }

  .alert-box {
    margin: 1rem;
    padding: 1rem;
    background: rgba(255, 0, 230, 0.05);
    border: 1px solid rgba(255, 0, 230, 0.2);
    border-radius: 8px;
  }

  .alert-box p { color: #ccc; font-size: 0.8rem; margin-bottom: 0.5rem; }

  .btn-primary {
    display: inline-block;
    background: #ff00e6;
    color: #fff;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }
</style>