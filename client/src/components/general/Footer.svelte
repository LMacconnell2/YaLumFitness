<footer class="site-footer">
  <div class="footer-grid">
    <div class="brand">
      <h4>Fitness Tracker</h4>
      <p>Your journey, tracked.</p>
    </div>
    
    <div class="links">
      <h5>Product</h5>
      <a href="/#features">Features</a>
      <a href="/workout-log">Workout Log</a>
      <a href="/nutrition-log">Nutrition</a>
    </div>

    <div class="support">
      <h5>Support</h5>
      <a href="/settings">Account</a>
      <a href="/privacy">Privacy Policy</a>
    </div>
  </div>
  <p class="copyright">© 2026 Fitness Tracker Inc.</p>
</footer>

<style>
  .site-footer {
    padding: 3rem 2rem 1rem;
    background: #f4f4f4;
    margin-top: auto; /* Pushes footer to bottom if using flex-col layout */
  }
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }
  h5 { margin-bottom: 0.5rem; }
  a { display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem; }
  .copyright { text-align: center; font-size: 0.8rem; color: #999; }
</style>