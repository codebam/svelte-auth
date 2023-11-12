<script lang="ts">
  import { enhance } from '$app/forms';
  import YouTube from '$lib/svelte-youtube.svelte';
  export let data: {auth: boolean, song: {id: string, url: string}};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

<YouTube on:end={() => document.getElementById('remove_song')?.click()} videoId={data.song.url} options={{playerVars: { autoplay: 1 }}} />

<form style="display: none;" method="POST" action="/playlist?/remove" use:enhance>
  <input name="id" value="{data.song.id}">
  <button id="remove_song">remove</button>
</form>

{#if data.auth}
  <form method="POST" action="/playlist?/add" use:enhance>
    <label>Submit a song
      <input name="url" type="url" placeholder="paste a youtube link" pattern=".*v=.*">
    </label>
    <button>Submit</button>
  </form>
  <p><a href="/logout">Log out</a></p>
{/if}
