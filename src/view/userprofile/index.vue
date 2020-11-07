<template>
  <div class="setuser-container">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="boxone"
    />

    <input
      type="file"
      accept="image/*"
      hidden
      ref="file"
      @change="onchangeimage"
    />
    <van-cell title="头像" center @click="$refs.file.click()">
      <div class="flexone">
        <van-image round fit="cover" width="30" height="30" :src="user.photo" />
        <van-icon name="arrow" />
      </div>
    </van-cell>

    <van-cell title="昵称" @click="isshowGet = true">
      <div class="flexone">
        <span v-html="user.name"></span>
        <van-icon name="arrow" />
      </div>
    </van-cell>

    <van-cell title="性别" @click="isshowsex = true">
      <div class="flexone">
        <span v-html="user.gender === 1 ? '女' : '男'"></span>
        <van-icon name="arrow" />
      </div>
    </van-cell>

    <van-cell title="生日" @click="isshowbirthday = true">
      <div class="flexone">
        <span v-html="user.birthday"></span>
        <van-icon name="arrow" />
      </div>
    </van-cell>
    <!-- 用户昵称编辑处 -->
    <van-popup
      v-model="isshowGet"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <namenav
        v-if="isshowGet"
        @close-popup="isshowGet = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 用户昵称编辑处 -->

    <!-- 用户性别处 -->
    <van-popup
      v-model="isshowsex"
      round
      :style="{ height: '50%' }"
      position="bottom"
    >
      <sexcontain
        v-if="isshowsex"
        @close="isshowsex = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 用户性别处 -->

    <!-- 用户生日处 -->
    <van-popup
      round
      v-model="isshowbirthday"
      :style="{ height: '50%' }"
      position="bottom"
    >
      <birthday
        @closedata="isshowbirthday = false"
        v-model="user.birthday"
        v-if="isshowbirthday"
      />
    </van-popup>
    <!-- 用户生日处 -->

    <!-- 用户头像处 -->
    <van-popup
      class="find"
      v-model="isshowheard"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <imagecontain
        v-if="isshowheard"
        :file="fileimage"
        @close="isshowheard = false"
        @updata-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 用户头像处 -->
  </div>
</template>

<script>
import imagecontain from './compentend/image'
import birthday from './compentend/birthday'
import sexcontain from './compentend/sex'
import namenav from './compentend/name'
import { getUserProfile } from '@/api/user'
export default {
  name: 'setuser',
  components: {
    namenav,
    sexcontain,
    birthday,
    imagecontain
  },
  props: {},
  data () {
    return {
      user: {}, // 用来存储用户对项
      isshowGet: false, // 用户昵称显示处
      isshowsex: false, // 用户性别显示处
      isshowbirthday: false, // 用户生日
      isshowheard: false, // 用户头像
      fileimage: null // 存放用户头像地址
    }
  },
  computed: {},
  watch: {},
  created () {
    this.ongetUserProfile()
  },
  mounted () {},
  methods: {
    async ongetUserProfile () {
      const { data } = await getUserProfile()
      console.log(data)
      this.user = data.data
    },
    onchangeimage () {
      const file = this.$refs.file.files[0]
      // console.log(file);
      // 打开弹出窗 预览图片 传递当前图片过去
      this.fileimage = file
      this.isshowheard = true
      // 解决相同文件不触发change
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.boxone {
  background: #4b8fd8;
}
/deep/ .van-nav-bar .van-icon {
  color: #f7f8fa;
}
/deep/ .van-nav-bar__title {
  color: #f7f8fa;
}
.flexone {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
/deep/ .van-icon {
  padding-left: 3px;
}
/deep/.van-popup {
  background-color: #f7f8fa;
}
.find {
  background: #000;
  display: flex;
  align-items: center;
}
</style>
