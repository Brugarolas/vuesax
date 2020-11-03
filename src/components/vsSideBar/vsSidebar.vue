<template>
  <transition name="vs-sidebar-animate">
    <div
      v-show="staticPosition || value"
      ref="sidebarbackground"
      class="vs-content-sidebar">
      <div
        v-if="!hiddenBackground"
        class="vs-sidebar--background" />
      <div
        ref="sidebarContainer"
        :class="[
          `vs-sidebar-${color}`,
          {
            'vs-sidebar-parent': parent != 'body',
            'vs-sidebar-staticPosition': staticPosition,
            'vs-sidebar-position-right': positionRight,
            'vs-sidebar-reduce': reduce,
            'vs-sidebar-reduceNotRebound': reduceNotRebound,
            'vs-sidebar-reduceNotHoverExpand': reduceNotHoverExpand
          }
        ]"
        class="vs-sidebar">
        <header
          v-if="$slots.header"
          class="vs-sidebar--header"
        >
          <slot name="header" />
        </header>

        <div class="vs-sidebar--items">
          <slot />
        </div>

        <vs-spacer v-if="spacer" />

        <footer
          v-if="$slots.footer"
          class="vs-sidebar--footer"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name:'VsSidebar',
  props:{
    value:{
      default: false
    },
    defaultIndex:{
      default: null,
      type: [String, Number]
    },
    color: {
      default:'primary',
      type: String
    },
    parent:{
      default: null,
      type: [String, Object]
    },
    spacer: {
      default: false,
      type: Boolean
    },
    staticPosition: {
      default: false,
      type: Boolean
    },
    positionRight: {
      default: false,
      type:Boolean
    },
    clickNotClose: {
      default: false,
      type: Boolean
    },
    reduce: {
      default: false,
      type: Boolean
    },
    reduceNotRebound:{
      default: false,
      type: Boolean
    },
    reduceNotHoverExpand: {
      default: false,
      type: Boolean
    },
    hiddenBackground: {
      default:false,
      type: Boolean
    }
  },
  data: () => ({
    currentIndex: 0
  }),
  watch:{
    value() {
      if(!this.clickNotClose) this.addEventClick()
    }
  },
  created () {
    this.currentIndex = this.defaultIndex
  },
  mounted () {
    this.insertBody()
  },
  methods:{
    getActive () {
      return this.currentIndex
    },
    setIndexActive (index) {
      this.currentIndex = index
    },
    addEventClick () {
      this.$nextTick(() => {
        const parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent
        const element = parentx || window
        if(this.value) {
          setTimeout(() => {
            element.addEventListener('click', this.closeSidebar)
          }, 300)

        }
      })
    },
    closeSidebar (evt) {
      const parent = evt.target.closest('.vs-sidebar')
      if (!parent) {
        this.$emit('input', false)
        const parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent
        const element = parentx || window
        element.removeEventListener('click', this.closeSidebar)
      }
    },
    insertBody () {
      if(this.parent) {
        const elx = this.$refs.sidebarbackground
        const parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent
        parentx.insertBefore(elx, parentx.firstChild)
      }

    },
  }
}
</script>
