<script lang="ts">
  import InlineField from "../components/InlineField.svelte";
  import { useInlineEdit } from "../components/useInlineEdit.svelte.js";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "I like building things and seeing the results quickly."
  };

  async function saveProfile(updated: typeof user) {
    // add a short delay to simulate server latency
    await new Promise((r) => setTimeout(r, 500));
    Object.assign(user, updated);
    console.log("Profile saved:", user);
  }

  const edit = useInlineEdit(user, saveProfile);
</script>

<section>
  <h2>User Profile</h2>

  <InlineField label="Name" type="text" bind:value={edit.draft.name} />
  <InlineField label="Email" type="email" bind:value={edit.draft.email} />
  <InlineField label="Bio" type="textarea" bind:value={edit.draft.bio} />

  {#if edit.isDirty()}
    <button type="button" onclick={edit.save}>Save</button>
    <button type="button" onclick={edit.cancel}>Cancel</button>
  {/if}
</section>