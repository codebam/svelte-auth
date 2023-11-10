<script lang="ts">
  export let data: {auth: boolean};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

{#if data.auth}
  <p>You successfully logged in!</p>
  <p><a href="/logout">Log out</a></p>
{/if}
