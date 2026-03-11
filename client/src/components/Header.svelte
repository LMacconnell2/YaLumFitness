<script>
  export let title = "";
</script>

<header>
  <h1>{title}</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/login">login</a></li>
      <li><a href="/register">register</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    background-color: #333;
    color: white;
    padding: 1em 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1em;

      li {
        a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
