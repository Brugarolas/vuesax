<template lang="html">
  <li
    :class="{'divider':divider}"
    :style="{
      'color':hoverx?giveColor()+' !important':null,
      'background':hoverx?giveColor(.01)+' !important':null
    }"
    class="vs-component vs-dropdown--item"
    @click="closeParent"
    @mouseover="hoverx=true"
    @mouseout="hoverx=false">
    <router-link
      v-if="to"
      :to="to"
      v-bind="$attrs"
      :class="{'disabled':disabled}"
      class="vs-dropdown--item-link"
      v-on="$listeners">
      {{ $attrs.disabled }}
      <slot />
    </router-link>

    <a
      v-else
      v-bind="$attrs"
      :class="{'disabled':disabled}"
      class="vs-dropdown--item-link"
      v-on="$listeners">
      <slot />
    </a>
  </li>
</template>

<script>
import _color from '../../utils/color.js'
export default {
  name: 'VsDropdownItem',
  inheritAttrs:false,
  props:{
    to:{
      type: [String, Object]
    },
    disabled:{
      default:false,
      type:Boolean
    },
    divider:{
      default:false,
      type:Boolean
    },
  },
  data: () => ({
    hoverx: false,
    vsDropDownItem: true,
    color: null
  }),
  mounted () {
    this.changeColor()
  },
  updated() {
    this.changeColor()
  },
  methods:{
    closeParent() {
      if(this.disabled) return

      function searchParent(_this) {
        const parent = _this.$parent

        if(!parent.$el.className) return
        if(parent.$el.className.includes('parent-dropdown')) {
          searchParent(parent)
        } else {
          const dropdownMenu = parent.$children.find(item => {
            return item.hasOwnProperty('dropdownVisible')
          })

          if (dropdownMenu) {
            dropdownMenu.dropdownVisible = parent.vsDropdownVisible = false
          }
        }
      }

      searchParent(this)
    },
    changeColor() {
      function searchParent(_this){
        const parent = _this.$parent

        if(!parent.$el.className){
          return
        }
        if(parent.$el.className.indexOf('parent-dropdown') == -1) {
          searchParent(parent)
        } else {
          _this.color = parent.color
        }
      }

      searchParent(this)
    },
    giveColor(opacity = 1) {
      return _color.rColor(this.color,opacity)
    }
  }
}
</script>
