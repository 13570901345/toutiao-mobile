<template>
  <div class="imagecontain">
    <img :src="imagefile" alt="" srcset="" ref="image" class="img" />
    <div class="textnavbar">
      <van-nav-bar
        left-text="取消"
        right-text="确定"
        @click-left="$emit('close')"
        @click-right="onClickRight"
        class="ooo"
      />
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updataUserphoto } from '@/api/user'
export default {
  name: 'imagecontain',
  components: {},
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      imagefile: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onClickRight () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // console.log(fd);
      await updataUserphoto(fd)

      this.$emit('close')
      this.$emit('updata-photo', this.imagefile)
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
.textnavbar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
/* Ensure the size of the image fit the container perfectly */
.img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.ooo {
  background: #000;
}
</style>
