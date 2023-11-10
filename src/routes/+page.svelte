<script lang="ts">
  export let data: {auth: boolean, userdata: string[] | undefined};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

{#if data.auth}
  <p>You successfully logged in!</p>
  <ul>
  {#each data.userdata as item}
    <li>
      {item.content}
      <form style="display: inline;" method="POST" action="/userdata?/delete">
        <input style="display: none;" name="id" value="{item.id}">
        <button>delete</button>
      </form>
    </li>
  {/each}
  </ul>
  <form method="POST" action="/userdata?/set">
    <label>Set Userdata
      <textarea name="userdata"></textarea>
    </label>
    <button>Submit</button>
  </form>
  <p><a href="/logout">Log out</a></p>
{/if}
