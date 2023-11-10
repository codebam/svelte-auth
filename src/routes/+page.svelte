<script lang="ts">
  export let data: {auth: boolean, userdata: string[] | undefined};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

{#if data.auth}
  <p>You successfully logged in!</p>
  <form method="POST" action="/playlist?/add">
    <label>Submit a song
      <input name="url" type="url">
    </label>
    <button>Submit</button>
  </form>
  <iframe width="560" height="315" src="{data.song}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <p><a href="/logout">Log out</a></p>
{/if}
