<script lang="ts">
  import EditProfileModal from "./EditProfileModal.svelte";

  export let user;
  export let profile;

  let showModal = false;
  let localProfile = profile;
  let localUser = user;

  function handleSave(e) {
    // The API response from the modal should contain the updated user/profile
    localProfile = e.detail.profile || e.detail; 
    localUser = e.detail.user || localUser;
    showModal = false;
    
    // Optional: Refresh the page to sync everything if the API response is partial
    window.location.reload(); 
  }
</script>

<div class="profile-header">
  <div class="avatar-large">
    {localUser?.name?.charAt(0) || 'U'}
  </div>
  <div class="header-text">
    <h1>{localUser?.name || 'User'}</h1>
    <p>Member since {localProfile?.createdAt ? new Date(localProfile.createdAt).toLocaleDateString() : 'N/A'}</p>
  </div>
  <button class="btn-primary" on:click={() => (showModal = true)}>
    Edit Profile
  </button>
</div>

{#if showModal}
  <EditProfileModal
    user={localUser}
    profile={localProfile}
    on:close={() => (showModal = false)}
    on:save={handleSave}
  />
{/if}