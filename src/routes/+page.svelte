<script lang="ts">
  export let data: {auth: boolean, song: string};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

<iframe width="560" height="315" src="{data.song}" title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{#if data.auth}
  <p>You successfully logged in!</p>
  <form method="POST" action="/playlist?/add">
    <label>Submit a song
      <input name="url" type="url" pattern="https://.*youtube.com/.*">
    </label>
    <button>Submit</button>
  </form>
  <p><a href="/logout">Log out</a></p>
{/if}
