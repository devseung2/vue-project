<template>
  <div class="index">
    <BaseHeader pageName='base'></BaseHeader>
    <div class="container pc-container m-container">
      <div class="aside only-pc">
        <button class="login-btn">
          <span class="login-btn-name">로그인</span>
        </button>
      </div>
      <div class="section pc-section m-section">
        <div class="pc-ord-group m-ord-group">
          <ul>
            <li
              v-bind:class="{ sortActvie: isActive }"
              v-on:click="selectedOrd"
            >
              <span>오름차순</span>
            </li>
            <li
              class="ord-desc"
              v-bind:class="{ sortActvie: !isActive }"
              v-on:click="selectedOrd"
            >
              <span>내림차순</span>
            </li>
            <li class="filter-button-group m-filter-button">
              <button
                class="filter-button"
                v-on:click="isShow = true"
              >
                <span>필터</span>
              </button>
            </li>
          </ul>
        </div>
        <BaseModal
          v-if="isShow"
          v-on:close="isShow = false"
          v-bind:category="category"
          v-bind:categoryId="categoryId"
          v-on:filter-event="filterChange"
        >
        </BaseModal>
        <div
          v-for="(data, index) in list.data"
          v-bind:key="index"
        >
          <div
            class="category-group pc-category-group m-category-group"
            v-on:click="categoryClick(data.id)"
          >
            <div class="category-title pc-category-title m-category-title">
              <div
                v-for="(data2, index2) in category"
                v-bind:key="index2"
              >
                <div v-if="data2.id === data.category_id">
                  <span class="category-name">{{data2.name}}</span>
                  <span class="category-id">{{data.category_id}}</span>
                </div>
              </div>
            </div>
            <div class="category-bottom-line pc-category-bottom-line m-category-bottom-line"></div>
            <div class="feed-user-info pc-feed-user-info m-feed-user-info">
              <div class="feed-user-id">{{data.user_id}}</div>
              <div class="feed-line only-pc"></div>
              <div class="feed-created only-pc">{{data.created_at}}</div>
            </div>
            <div class="feed-title pc-feed-title m-feed-title category-text-hide">{{data.title}}</div>
            <div class="feed-contents pc-feed-contents m-feed-contents category-text-hide">{{data.contents}}</div>
          </div>
          <div v-if="(index+1) > 1 && (index+1) % 4 === 0">
            <div
              class="sponser-group pc-sponser-group m-sponser-group"
              v-if="ads.data && parseInt((index+1)/4) <= ads.data.length && ads.data[parseInt((index+1)/4)]"
            >
              <div class="sponser pc-sponser">sponsered</div>
              <div class="sponser-body pc-sponser-body">
                <img
                  class="pc-sponser-img m-sponser-img"
                  :src="'https://cdn.comento.kr/assignment/' + ads.data[parseInt((index+1)/4)].img"
                  alt="광고 사진"
                >
                <div>
                  <div class="sponser-title pc-sponser-title sponser-titleHide">{{ads.data[parseInt((index+1)/4)].title}}</div>
                  <div class="sponser-contents pc-sponser-contents m-sponser-contents sponser-contentsHide pc-sponser-contentsHide m-sponser-contentsHide">{{ads.data[parseInt((index+1)/4)].contents}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="addBtnGroup"
          v-on:click="isLoading = true, isBtnHide = false"
        >
          <button v-if="isBtnHide">
            <span>더보기</span>
          </button>
          <infinite-loading
            v-if="isLoading && !isBtnHide"
            v-on:infinite="infiniteHandler"
            infinite-scroll-disabled="isLoading"
            spinner="bubbles"
          >
            <span slot="no-more"></span>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader'
import BaseModal from '../components/BaseModal'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'index',
  data () {
    return {
      isShow: false,
      isActive: true,
      list: {},
      category: [],
      page: 1,
      ord: 'asc',
      categoryId: [],
      limit: 10,
      ads: {},
      selectedFilter: [],
      isLoading: false,
      isBtnHide: false
    }
  },
  components: {
    BaseHeader: BaseHeader,
    BaseModal: BaseModal,
    InfiniteLoading
  },
  created () {
    this.getCategoryInfo()
    this.getAds()
  },
  methods: {
    modalToggle () {
      this.isShow = !this.isShow
    },
    categoryClick (id) {
      this.$router.push({name: 'Detail', params: { id: id }})
    },
    getCategoryInfo () {
      axios.get('https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production/api/category')
        .then(response => {
          this.category = response.data.list
          this.category.map((v) => this.categoryId.push(v.id))
          this.getFeedList()
        })
        .catch(e => {
          console.log('error : ', e)
        })
    },
    getFeedList () {
      if (this.categoryId.length !== 0) {
        axios.get('https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production/api/list', {
          params: { page: this.page,
            ord: this.ord,
            category: this.categoryId,
            limit: this.limit
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        })
          .then(response => {
            response.total <= 10 ? this.isBtnHide = false : this.isBtnHide = true
            this.list = response.data.list
            this.isLoading = false
          })
          .catch(e => {
            console.log('error : ', e)
          })
      } else {
        this.list = []
        this.isBtnHide = false
        this.isLoading = false
      }
    },
    getAds () {
      axios.get('https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production/api/ads', {
        params: { page: this.page,
          limit: this.limit
        }
      })
        .then(response => {
          this.ads = response.data.list
        })
        .catch(e => {
          console.log('error : ', e)
        })
    },
    filterChange (data) {
      this.categoryId = data
      this.limit = 10
      this.getFeedList()
    },
    selectedOrd (e) {
      if (e.target.innerText === '오름차순') {
        this.ord = 'asc'
        this.isActive = true
      } else {
        this.ord = 'desc'
        this.isActive = false
      }
      this.getFeedList()
    },
    infiniteHandler ($state) {
      axios.get('https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production/api/list', {
        params: { page: this.page,
          ord: this.ord,
          category: this.categoryId,
          limit: this.limit + 10
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
        .then(response => {
          setTimeout(() => {
            this.list = response.data.list
            this.limit += 10
            this.isBtnHide = true
            $state.loaded()
            if (this.limit >= this.list.total) {
              this.isBtnHide = false
              $state.complete()
            }
          }, 500)
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
  .aside {
    float: left;
    .login-btn {
      cursor: pointer;
      width: 235px;
      height: 60px;
      border-radius: 5px;
      border: none;
      background-color: #00c854;

      .login-btn-name {
        width: 61px;
        height: 33px;
        font-family: SpoqaHanSans;
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  .section {
    .ord-desc {
      margin-left: 30px;
    }
    li {
      float: left;
      color: #e1e4e7;
      span {
        cursor: pointer;
        width: 48px;
        font-family: SpoqaHanSans;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.92;
        letter-spacing: normal;
        text-align: left;
        color: #adb5bd;;
      }
    }
    .filter-button-group {
      float: right;
      list-style: none;
      .filter-button {
        cursor: pointer;
        padding: 0 0;
        width: 48px;
        border-radius: 3px;
        border: solid 1px #e1e4e7;
        background-color: #ffffff;

        span {
          width: 24px;
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
      }
    }
    .sortActvie {
      color: #00c854;

      span {
        color: #495057;
      }
    }
    .category-group {
      padding-top: 20px;
      padding-bottom: 20px;
      cursor: pointer;
      .category-title {
        .category-name {
          width: 95px;
          font-family: SpoqaHanSans;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.92;
          letter-spacing: normal;
          text-align: left;
          color: #7e848a;
        }
        .category-id {
          float: right;
          width: 12px;
          font-family: SpoqaHanSans;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.92;
          letter-spacing: normal;
          text-align: right;
          color: #adb5bd;
        }
      }
      .category-bottom-line {
        margin-top: 11px;
        height: 1px;
        background-color: #e1e4e7;
      }
      .feed-user-info {
        margin-top: 15px;
        .feed-user-id {
          font-family: SpoqaHanSans;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.92;
          letter-spacing: normal;
          text-align: left;
          color: #00c854;
        }
        .feed-line {
          margin: 2px 10px;
          width: 1px;
          background-color: #e1e4e7;
        }
        .feed-created {
          width: 148px;
          font-family: SpoqaHanSans;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.92;
          letter-spacing: normal;
          text-align: left;
          color: #495057;
        }
      }
      .feed-title {
        margin-top: 17px;
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
      .feed-contents {
        margin-top: 6px;
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
    }
    .sponser-group {
      margin-top: 20px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #ffffff;
      .sponser {
        width: 64px;
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
      .sponser-body {
        .sponser-title {
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
        .sponser-contents {
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
      }
    }
  }
}
.BtmLine {
  margin-top: 11px;
  height: 1px;
  background-color: #e1e4e7;
}
.addBtnGroup {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  button {
    cursor: pointer;
    width: 99px;
    height: 40px;
    border-radius: 3px;
    border: none;
    background-color: #00c854;
    text-align: center;

    span {
      width: 59px;
      height: 24px;
      font-family: SpoqaHan기ns;
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
.category-text-hide {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.sponser-titleHide {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sponser-contentsHide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
// PC
@media (min-width:481px) {
  .pc-container {
    margin-top: 40px;
    margin-left: 390px;
    padding : 0 0;
    .pc-section {
      display: grid;
      padding-left: 40px;
      .pc-ord-group {
        ul {
          padding-left: 20px;
        }
      }
      .pc-category-group {
        margin-top: 14px;
        border-radius: 5px;
        border: solid 1px #e1e4e7;
        .pc-category-title {
          padding-left: 30px;
          padding-right: 30px;
        }
        .pc-category-bottom-line {
          margin-left: 30px;
          margin-right: 30px;
        }
        .pc-feed-user-info {
          padding-left: 30px;
          padding-right: 30px;
          display: flex;
        }
        .pc-feed-title {
          width: 799px;
          padding-left: 30px;
          padding-right: 30px;
        }
        .pc-feed-contents {
          padding-left: 30px;
          padding-right: 30px;
          width: 802px;
        }
      }
      .pc-sponser-group {
        margin-top: 20px;
        width: 865px;
        height: 255px;
        border: solid 1px #e1e4e7;
        border-radius: 5px;
        .pc-sponser {
          margin-left: 30px;
          margin-right: 30px;
          margin-top: 20px;
        }
        .pc-sponser-body {
          display: flex;
          margin-top: 16.5px;
          .pc-sponser-img {
            margin-left: 30.5px;
            margin-right: 29.5px;
            width: 310px;
            height: 179px;
          }
          .pc-sponser-title {
            width: 463px;
            height: 55px;
          }
          .pc-sponser-contents {
            margin-top: 11px;
            width: 465px;
            height: 99px;
          }
          .pc-sponser-contentsHide {
            -webkit-line-clamp: 4;
          }
        }
      }
    }
  }
}
// Mobile
@media (max-width:480px) {
  .m-ord-group {
    height: 20px;
    ul {
      padding-left: 35px;
      .m-filter-button {
        margin-right: 15px;
      }
    }
  }
  .m-category-group {
    margin-bottom: 10px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
    .m-category-title {
      padding-left: 15px;
      padding-right: 15px;
    }
    .m-category-bottom-line {
      margin-left: 15px;
      margin-right: 15px;
    }
    .m-feed-user-info {
      padding-left: 15px;
      padding-right: 15px;
    }
    .m-feed-title {
      padding-left: 15px;
      padding-right: 15px;
    }
    .m-feed-contents {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .m-sponser-group {
    margin-top: 10px;
    padding: 20px 15px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
    .m-sponser-img {
      margin-top: 16.5px;
      margin-bottom: 16.5px;
      max-width: 100%;
      height: auto;
    }
    .m-sponser-contents {
      margin-top: 6px;
    }
    .m-sponser-contentsHide {
      -webkit-line-clamp: 2;
    }
  }
}
</style>
