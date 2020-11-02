<template lang="html">
  <div
    :class="[
      `vs-input-number-size-${size}`,
      `vs-input-number-${color}`,
      {'isChangeValue':isChangeValue}
    ]"
    class="vs-input-number">
    <button
      v-repeat-click="less"
      :disabled="$attrs.disabled"
      :class="{
        limit:value <= min
      }"
      :style="{
        background:getColor
      }"
      class="btn-less vs-input-number--button-less"
      type="button">
      <vs-icon
        :icon-pack="iconPack"
        :icon="iconDec" />
    </button>
    <span v-if="label">{{ label }}</span>
    <input
      ref="input"
      :style="styleInput"
      :value="value"
      v-bind="$attrs"
      :disabled="isDisabled"
      :min="min"
      :max="max"
      :step="step"
      type="number"
      class="vs-input-number--input"
      v-on="listeners">
    <button
      v-repeat-click="plus"
      :disabled="$attrs.disabled"
      :class="{
        limit:value >= max && max !== null
      }"
      :style="{
        background:getColor
      }"
      class="btn-plus vs-input-number--button-plus"
      type="button">
      <vs-icon
        :icon-pack="iconPack"
        :icon="iconInc" />
    </button>
  </div>
</template>

<script>
import _color from '../../utils/color.js'
export default {
  name:'VsInputNumber',
  directives: {
    repeatClick: {
      bind(el, binding, vnode) {
        let intervalx = null;
        let startT;

        const functionx = () => vnode.context[binding.expression].apply();
        const bucle = () => {
          if (Date.now() - startT < 100) {
            functionx();
          }
          clearInterval(intervalx);
          intervalx = null;
        };

        const eventx = (e) => {
          if (e.button !== 0) return;
          startT = Date.now();

          const escuchando = function() {
            if (bucle) {
              bucle.apply(this, arguments);
            }
            el.removeEventListener('mouseup', escuchando, false);
          };

          el.addEventListener('mouseleave', escuchando ,false);
          el.addEventListener('mouseup', escuchando, false);
          clearInterval(intervalx);
          intervalx = setInterval(functionx, 100);
        }

        el.addEventListener('mousedown', eventx ,false);

      }
    }
  },
  inheritAttrs:false,
  props:{
    value:{
      default:null,
      type:[Number,String]
    },
    color:{
      default:'primary',
      type:String
    },
    label: {
      default: null,
      type: String
    },
    max:{
      default:null,
      type:[Number,String]
    },
    min:{
      default:0,
      type:[Number,String]
    },
    size:{
      default:null,
      type:String
    },
    iconPack:{
      default:'material-icons',
      type:String
    },
    iconDec:{
      default:'remove',
      type:String
    },
    iconInc:{
      default:'add',
      type:String
    },
    step:{
      default:1,
      type:[Number,String]
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data:()=>({
    isChangeValue:false
  }),
  computed:{
    styleInput() {
      return {
        width:`${this.getLength}px`
      }
    },
    getLength(){
      if(this.value){
        return this.value.toString().length * 9.1
      } else {
        return 0
      }
    },
    getColor(){
      return _color.getColor(this.color,1)
    },
    listeners(){
      return {
        ...this.$listeners,
        blur:(evt)=>{
          if(parseFloat(this.value) > parseFloat(this.max)) {
            this.$emit('input',this.max)
          } else if (parseFloat(this.value) < parseFloat(this.min)) {
            this.$emit('input',this.min)
            this.$emit('blur',evt)
          }
        },
        input:(evt)=>{
          this.$emit('input',evt.target.value)
        }
      }
    },
    maxFloat () {
      return parseFloat(this.max)
    },
    minFloat () {
      return parseFloat(this.min)
    },
    stepChange () {
      return this.step === 'any' ? 1 : parseFloat(this.step)
    }
  },
  watch:{
    value(){
      this.isChangeValue = true
      setTimeout(()=>{
        this.isChangeValue = false
      },200)
    }
  },
  methods:{
    plus(){
      if(this.value === ''){
        this.$emit('input', this.fixPrecision(0))
        return
      }

      const valueFloat = parseFloat(this.value)

      if(this.max ? valueFloat < this.maxFloat : true){
        const newValue = valueFloat + this.stepChange

        this.$emit('input', this.fixPrecision(newValue))
      }
    },
    less(){
      if(this.value === ''){
        this.$emit('input', this.fixPrecision(0))
        return
      }

      const valueFloat = parseFloat(this.value)

      if(this.min ? valueFloat > this.minFloat : true){
        const newValue = valueFloat - this.stepChange

        this.$emit('input', this.fixPrecision(newValue))
      }
    },
    fixPrecision(n) {
      if (this.step === 'any') {
        return n;
      }

      const precision = `${this.step}`.split('.')[1];
      return n.toFixed(precision ? precision.length : 0);
    }
  }
}
</script>
