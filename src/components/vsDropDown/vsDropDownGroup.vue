<template lang="html">
  <li
    ref="group"
    :class="{
      'marginIcon': vsCollapse,
      'no-cascading': !vsCollapse,
      'group-rightx': rightx
    }"
    class="vs-component vs-dropdown--group"
    @click="clickGroup">

    <span
      v-if="vsCollapse"
      class="span vs-dropdown--group-label"
      v-text="vsLabel" />
    <h3
      v-else
      v-text="vsLabel" />
    <vs-icon
      v-if="vsCollapse"
      :icon-pack="iconPack"
      :icon="vsIcon"
      class="icon-group notranslate vs-dropdown--group-icon" />

    <div
      ref="ulx"
      :style="styleItems"
      :class="{'con-dropdown-group-no-cascading':!vsCollapse}"
      class="con-dropdown--group-con-ul">
      <ul class="con-dropdown--group-ul">
        <slot />
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name:'VsDropdownGroup',
  props:{
    vsLabel:{
      default:'Options',
      type:String
    },
    vsCollapse:{
      default:false,
      type:Boolean
    },
    vsIcon: {
      default: 'keyboard_arrow_right',
      type:String
    },
    iconPack:{
      default:'material-icons',
      type:String
    }
  },
  data: () => ({
    activeGroup: false,
    rightx: false,
    widthx: 0,
    maxHeight: '0',
  }),
  computed:{
    styleItems() {
      return {
        maxHeight: this.vsCollapse ? this.maxHeight : 'auto'
      }
    }
  },
  methods:{
    clickGroup(evt) {
      if(evt.target != this.$refs.group) return

      if(!this.openHover) {
        const scrollHeight = this.$refs.ulx.scrollHeight

        if(this.maxHeight == '0') {
          this.maxHeight = `${scrollHeight}px`
          setTimeout(() => {
            this.maxHeight = 'none'
          }, 300)
        } else {
          this.maxHeight = `${scrollHeight}px`
          setTimeout(() => {
            this.maxHeight = '0'
          }, 50)
        }
      }
    }
  }
}
</script>
