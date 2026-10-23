<script>
  function loginHandler(event) {
    event.preventDefault();
    // Add your login logic here
  }
</script>
<form onsubmit={loginHandler}>
  <input type="text" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <button type="submit">Login</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input {
        padding: 10px;
    }
    button {
        padding: 10px;
        cursor: pointer;
    }
</style>