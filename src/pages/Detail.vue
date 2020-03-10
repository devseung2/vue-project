<template>
  <div class="detail">
    <BaseHeader pageName='detail'></BaseHeader>
    <div class="container pc-container m-container">
      <div class="feed-group pc-feed-group m-feed-group">
        <div class="detail-title">{{list.title}}</div>
        <div class="detail-contents">{{list.contents}}</div>
        <div class="detail-created">{{list.created_at}}</div>
      </div>
      <div class="reply-tag-group m-reply-tag-group">
        <span class="reply-tag">답변</span>
        <span
          class="reply-num"
          v-if="list.reply!=undefined"
        >
          {{list.reply.length > 0 ? list.reply.length : 0}}
        </span>
      </div>
      <div
        class="reply-group pc-reply-group m-reply-group"
        v-for="(data, index) in list.reply"
        v-bind:key="index"
      >
        <div>
            <div class="reply-user-id">{{data.user.name}}</div>
        </div>
        <div class="bottom-line"></div>
        <div class="detail-title">{{data.title}}</div>
        <div class="detail-contents">{{data.contents}}</div>
        <div class="detail-created">{{list.created_at}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BaseHeader from '../components/BaseHeader'

export default {
  name: 'detail',
  data () {
    return {
      list: {},
      id: this.$route.params.id
    }
  },
  components: {
    BaseHeader: BaseHeader
  },
  created () {
    this.getDetailInfo()
  },
  watch: {
    '$route': 'getDetailInfo'
  },
  methods: {
    getDetailInfo () {
      axios.get('https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production/api/view', {
        params: { id: this.id }
      })
        .then(response => {
          this.list = response.data.info
        })
        .catch(e => {
          console.log('error : ', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .feed-group {
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    border: solid 1px #00c854;
    background-color: #ffffff;
  }
  .reply-tag-group {
    margin-bottom: 10px;
    .reply-tag {
      width: 29px;
      height: 24px;
      font-family: SpoqaHanSans;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.56;
      letter-spacing: normal;
      text-align: left;
      color: #495057;
    }
    .reply-num {
      width: 10px;
      height: 24px;
      font-family: SpoqaHanSans;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.56;
      letter-spacing: normal;
      text-align: left;
      color: #00c854;
    }
  }
  .reply-group {
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    border: solid 1px #e1e4e7;
    background-color: #ffffff;
    .reply-user-id {
      font-family: SpoqaHanSans;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.56;
      letter-spacing: normal;
      text-align: left;
      color: #7e848a;
    }
  }
}

.detail-title {
  font-family: SpoqaHanSans;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #282c30;
}
.detail-contents {
  margin-top: 7px;
  font-family: SpoqaHanSans;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #495057;
}
.detail-created {
  margin-top: 15px;
  width: 148px;
  height: 19px;
  font-family: SpoqaHanSans;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: normal;
  text-align: left;
  color: #adb5bd;
}
.bottom-line {
  margin-top: 10px;
  margin-bottom: 16px;
  height: 1px;
  background-color: #e1e4e7;
}

// PC
@media (min-width:481px) {
  .pc-container {
    margin-top: 50px;
    margin-left: 390px;
    padding : 0 0;
    .pc-feed-group {
      margin-bottom: 30px;
      padding-top: 21px;
      padding-bottom: 21px;
      padding-left: 30px;
      padding-right: 31px;
      width: 1140px;
      border-radius: 5px;
    }
    .pc-reply-group {
      margin-bottom: 30px;
      padding-top: 21px;
      padding-bottom: 21px;
      padding-left: 30px;
      padding-right: 31px;
      width: 1140px;
      border-radius: 5px;
    }
  }
}
// Mobile
@media (max-width:480px) {
  .m-container {
    margin-top: 10px;
    .m-feed-group {
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 15px;
      margin-right: 15px;
      padding-top: 20px;
      padding-bottom: 21px;
      border-right: none !important;
      border-left: none !important;
    }
    .m-reply-tag-group {
      padding-left: 15px;
    }
    .m-reply-group {
      margin-bottom: 30px;
      margin-left: 15px;
      margin-right: 15px;
      padding-top: 21px;
      padding-bottom: 20px;
      border-left: none !important;
      border-right: none !important;
    }
  }
}
</style>
