<template>
  <li class="vs-nav-item">
    <div class="vs-nav-item-slot">
      <slot />
    </div>
    <ul class="vs-nav-submenu">
      <slot name="submenu" />
    </ul>
  </li>
</template>
<script>
export default {
  name:'VsNavbarGroup',
}
</script>
