<template>
  <transition name="modal" appear>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container pc-modal-container m-modal-container">
          <div class="modal-close">
            <span
              class="modal-close-button"
              v-on:click="$emit('close')"
            >
              ×
            </span>
          </div>
          <div class="modal-header">
            <span>필터</span>
          </div>
          <div class="modal-body">
            <label
              class="check"
              v-for="(data, index) in category"
              v-bind:key="index"
            >
              {{data.name}}
              <input
                type="checkbox"
                v-bind:value="data.id"
                v-model="checkedNames"
              />
              <span class="check-mark"></span>
            </label>
          </div>
          <div class="modal-footer m-modal-footer">
            <button
              class="modal-default-button"
              v-on:click="filterSave"
            >
              <span class="modal-button-name">저장하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    category: {
      type: Array,
      required: true
    },
    categoryId: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkedNames: []
    }
  },
  created () {
    this.filterChecked()
  },
  methods: {
    filterChecked () {
      this.categoryId.map((v) => this.checkedNames.push(v))
    },
    filterSave () {
      this.$emit('filter-event', this.checkedNames)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      background-color: #ffffff;
      margin: 0px auto;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      .modal-close {
        height: 30px;
        text-align: right;
        padding-right: 15px;
        .modal-close-button {
          cursor: pointer;
          font-size: 30px;
          color: #adb5bd;
        }
      }
      .modal-header {
        padding-left: 30px;
        display: flex;
        span {
          width: 40px;
          height: 33px;
          font-family: SpoqaHanSans;
          font-size: 22px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.45;
          letter-spacing: normal;
          text-align: left;
          color: #212529;
        }
      }
      .modal-body {
        padding-left: 30px;
        margin-top: 10px;
        label {
          width: 117px;
          height: 24px;
          font-family: SpoqaHanSans;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 2;
          letter-spacing: normal;
          text-align: left;
          color: #495057;
        }

        .check {
          display:block;
          position:relative;
          margin-bottom:15px;
          padding-left:25px;
          cursor:pointer;
          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          input {
            position:absolute;
            opacity:0;
            cursor:pointer;
          }
          input:checked ~ .check-mark {
            background-color:#2196F3;
          }
          input:checked ~ .check-mark:after {
            display:block;
          }
          .check-mark {
            position:absolute;
            margin-top: 3px;
            top:0;
            left:0px;
            width:20px;
            height:20px;
            border: solid 1px #e1e4e7;
            background-color: #ffffff;
          }
          .check-mark:after {
            display:none;
            position:absolute;
            content:"";
            top:2px;
            left:7px;
            width:5px;
            height:10px;
            border:solid white;
            border-width:0 2px 2px 0;
            transform:rotate(45deg);
          }
        }
      }
      .modal-footer {
        margin-top: 30px;
        margin-right: 30px;
        .modal-default-button {
          cursor: pointer;
          border-radius: 3px;
          border: none;
          background-color: #00c854;
        }
      }
      .modal-button-name {
        width: 59px;
        height: 24px;
        font-family: SpoqaHanSans;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
      }
    }
  }
}
// PC
@media (min-width:481px) {
  .pc-modal-container {
    width: 460px;
    height: 268px;
    .modal-default-button {
      float: right;
      width: 99px;
      height: 40px;
    }
  }
}
// Mobile
@media (max-width:480px) {
  .m-modal-container {
    width: 337px;
    height: 268px;
    .m-modal-footer {
      margin-left: 30px;
      .modal-default-button {
        width: 277px;
        height: 40px;
      }
    }
  }
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
