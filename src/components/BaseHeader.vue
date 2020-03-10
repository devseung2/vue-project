<template>
  <div class="base-header">
    <div class="header pc-header only-pc">
      <div class="msg pc-msg">{{this.msg}}</div>
    </div>
    <div class="header m-header only-mobile">
      <div
        v-if="pageName==='base'"
        class="msg m-msg"
      >
        {{this.msg}}
      </div>
      <button
        class="m-pre-button"
        v-if="pageName==='detail'"
        v-on:click="preBtnClick"
      >
        <span>&lt;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-header',
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      msg: '[2020.03.10] 석현승'
    }
  },
  methods: {
    preBtnClick () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #ffffff;
  .msg {
    font-family: NotoSansCJKkr;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: left;
    color: #212529;
  }
  .pc-msg {
    padding-top: 23px;
    margin-left: 390px;
    width: 217px;
  }
  .m-msg {
    padding-left: 15px;
    padding-top: 11px;
  }
  .m-pre-button {
    padding-left: 15px;
    padding-top: 10px;
    -webkit-appearance:none;
    border: none;
    background-color: #ffffff;
    span {
      font-family: SpoqaHanSans;
      font-size: 22px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.14;
      letter-spacing: normal;
      text-align: left;
      color: #282c30;
    }
  }
}
.pc-header {
  width: 1920px;
  height: 70px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.07);
}
.m-header {
  height: 45px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.07);
}
</style>
