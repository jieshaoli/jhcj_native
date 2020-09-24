<template>
  <div class="text_group">
    <div class="input_group"
         :class="{'is-invalid': error}">
      <!-- 输入框 -->
      <input class="input_lab"
             :type="type"
             :placeholder="placeholder"
             :value="value"
             :name="name"
             @input="$emit('input',$event.target.value)">
      <!-- 输入框后面的内容 -->
      <button class="input_btn"
              v-if="btnTitle"
              @click.stop="$emit('btn-click')"
              :disabled="disabled">{{btnTitle}}</button>
    </div>
    <!-- 验证提示 -->
    <div v-if="error"
         class="invalid-feedback">{{error}}</div>
  </div>
</template>
<script>
export default {
  name: 'inputGroup',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    value: String,
    name: String,
    disabled: Boolean,
    btnTitle: String, //input框中的文字
    error: String, //验证不正确提示
  },
}
</script>

<style lang="css" scoped>
.text_group {
  background: white;
  border-radius: 6px;
  border: 1.0px solid #ddd;
  height: 50px;
}
.text_group .input_lab {
  outline-style: none;
  border: 0px;
  width: 55%;
  height: 50px;
  font-size: 16px;
  padding-left: 16px;
  background: transparent;
}
.text_group .input_btn {
  float: right;
  margin-right: 10px;
  border: 0px;
  background: transparent;
  height: 50px;
}
.text_group .invalid-feedback{
  color: red;
}
</style>
