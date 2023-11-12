<script lang="ts">
  import YouTube from 'svelte-youtube';
  export let data: {auth: boolean, song: {id: string, url: string}};
  const removeSong = () => {
    document.getElementById('remove_song').click();
  };
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

<YouTube on:end={() => removeSong()} videoId={data.song.url} options={{playerVars: { autoplay: 1 }}} />

<form style="display: none;" method="POST" action="/playlist?/remove">
  <input name="id" value="{data.song.id}">
  <button id="remove_song">remove</button>
</form>

{#if data.auth}
  <form method="POST" action="/playlist?/add">
    <label>Submit a song
      <input name="url" type="url" placeholder="https://.*youtube.com/.*" pattern="https://.*youtube.com/.*">
    </label>
    <button>Submit</button>
  </form>
  <p><a href="/logout">Log out</a></p>
{/if}
