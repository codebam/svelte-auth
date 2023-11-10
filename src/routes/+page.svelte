<script lang="ts">
  export let data: {auth: boolean};
  console.log(data.auth);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="/login">login</a></p>

{#if data.auth}
  <p>You successfully logged in!</p>
{/if}
