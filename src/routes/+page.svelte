<script lang="ts">
  export let data: {auth: boolean, userdata: string | boolean};
</script>

{#if !data.auth}
<p>Visit <a href="/login">login</a></p>
{/if}

{#if data.auth}
  <p>You successfully logged in!</p>
  {data.userdata}
  <form method="POST" action="/userdata?/set">
    <label>Set Userdata
      <textarea name="userdata"></textarea>
    </label>
    <button>Submit</button>
  </form>
  <p><a href="/logout">Log out</a></p>
{/if}
