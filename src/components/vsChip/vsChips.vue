<template lang="html">
  <div class="">
    <div
      :class="{'no-items':value.length == 0}"
      class="con-chips">
      <slot />

      <input
        v-model="newChip"
        :placeholder="value.length > 0 ? null : placeholder"
        type="text"
        class="con-chips--input"
        @keypress.enter="addItem">
      <div
        class="x-global con-chips--remove-all"
        @click="removeTotalItems">
        <vs-icon
          :icon-pack="iconPack"
          :icon="removeIcon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'VsChips',
  props:{
    value:{
      type: Array
    },
    vsColor:{
      type:String,
      default:'primary',
    },
    placeholder:{
      type:String,
      default:'',
    },
    items:{
      type:Array,
    },
    iconPack:{
      type:String,
      default:'material-icons'
    },
    removeIcon:{
      type:String,
      default:'close',
    },
  },
  data: () => ({
    newChip:''
  }),
  methods:{
    addItem(){
      const valueOld = this.value

      valueOld.push(this.newChip)
      this.$emit('input', valueOld)
      this.newChip = ''
    },
    removeTotalItems(){
      const valueOld = this.value

      valueOld.splice(0, this.value.length);
      this.$emit('input', valueOld)
    }
  }
}
</script>
