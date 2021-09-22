/**
 * 图片上传 公共组件
 */
<template>
  <div class="uploadWrapper">
   <vuedraggable
      class="vue-draggable"
      :class="{ single: isSingle, maxHidden: isMaxHidden }"
      v-model="imgList"
      tag="ul"
      draggable=".draggable-item"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <!-- 拖拽元素 -->
      <li
        v-for="(item, index) in imgList"
        :key="item.url + index"
        class="draggable-item"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <el-image :fit='imgfit' :src="item.url" :preview-src-list="[item.url]"></el-image>




        <div class="shadow"  style="display: flex;flex-direction: row;align-items: center;justify-content: center;font-size: 14px;">
          <i class="el-icon-view" @click.stop="onPreviewHandler(index)"></i>
          <i class="el-icon-delete" @click.stop="onRemoveHandler(index)" style="margin-left: 10px;"></i>
        </div>

      </li>
      <!-- 上传按钮 -->
      <el-upload
        slot="footer"
        ref="uploadRef"
        class="uploadBox"
        v-if="isShow"
        :disabled="isDisabled"
        :style="{ width: width + 'px', height: height + 'px' }"
        accept=".jpg,.jpeg,.png"
        :action="uploadUrl"
        :show-file-list="false"
        :multiple="!isSingle"
        :limit="limit"

        :before-upload="beforeUpload"
        :on-success="onSuccessUpload"
        :on-change="changeUpload"
        :on-exceed="onExceed"
      >
        <i class="uploadIcon" :class="uploadIcon" style=" width: 100%;height: 100%;position: relative;display: flex;align-items: center;justify-content: center;border: 1px dashed #c0ccda;background-color: #fbfdff;border-radius: 6px;font-size: 20px;color: #999;">
          <span class="uploading" v-show="isUploading">正在上传...</span>
          <span
            v-if="!isUploading && limit && limit!==99 && !isSingle"
            class="limitTxt"
          >{{uploadText}}</span>
        </i>
      </el-upload>
    </vuedraggable>


   <!-- <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center;width: 100%;height: 500px">
          <vueCropper ref="cropper" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType"
            :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedBox="option.fixedBox" :fixedNumber="option.fixedNumber"></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog> -->


  </div>
</template>

<script>
// import { VueCropper } from 'vue-cropper'
import vuedraggable from 'vuedraggable'
import { validImgUpload } from '@/utils/validate'
import lrz from 'lrz' // 前端图片压缩插件
import tools from '@/utils/tools'

export default {
  name: 'ImgUpload',
  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 99
    },
    // 限制上传图片的文件大小(kb)
    size: {
      type: Number,
      default: 5000
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false
    },

    isShow: {
      type: Boolean,
      default: true
    },

    isDisabled: {
      type: Boolean,
      default: false
    },

    // 是否使用图片压缩
    useCompress: {
      type: Boolean,
      default: false
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 100
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100
    },

    uploadIcon:{
      type:String,
      default:"el-icon-plus"
    },

    uploadText: {
      type: String,
      default: "上传图片"
    }
  },

  data () {
    return {
	  uploadUrl:this.UPLOADURL.uploadUrlAddress,	
      isUploading: false, // 正在上传状态
      isFirstMount: true ,// 控制防止重复回显
      loading: false,
      dialogVisible: false,
      imgfit:"cover",
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    }
  },

  computed: {
    // 图片数组数据
    imgList: {
      get () {
        return this.value
      },
      set (val) {
        if (val.length < this.imgList.length) {
          // 判断是删除图片时同步el-upload数据
          this.syncElUpload(val)
        }
        // 同步v-model
        this.$emit('input', val)
      }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden () {
      return this.imgList.length >= this.limit
    }
  },

  watch: {
    value: {
      handler (val) {
        if (this.isFirstMount && this.value.length > 0) {
          this.syncElUpload()
        }
      },
      deep: true
    }
  },

  mounted () {
    console.log(this.value)
    if (this.value.length > 0) {
      this.syncElUpload()
    }

  },

  methods: {
    // 同步el-upload数据
    syncElUpload (val) {
      const imgList = val || this.imgList
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        return {
          name: "file",
          url: v,
          status: 'success',
          uid: tools.createUniqueString()
        }
      })
      this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload (file) {
      console.log(file)
      this.isFirstMount = false
      if (this.useCompress) {
        // 图片压缩
        return new Promise((resolve, reject) => {
          lrz(file, { width: 1920 }).then((rst) => {
            file = rst.file
          }).always(() => {
            if (validImgUpload(file, this.size)) {
              this.isUploading = true
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      } else {
        if (validImgUpload(file, this.size)) {
          this.isUploading = true
          return true
        } else {
          return false
        }
      }
    },


    changeUpload(file, fileList){
       // this.imgList.push(file)
       // console.log(fileList)
       // //上传成功后将图片地址赋值给裁剪框显示图片
       // this.$nextTick(() => {
       //   this.option.img = URL.createObjectURL(file.raw);
       //   this.dialogVisible = true
       //   this.syncElUpload()
       // })
    },

    // 上传完单张图片
    onSuccessUpload (res, file, fileList) {
       console.log("sfasfs")
       console.log(res)
      // 这里需要根据你自己的接口返回数据格式和层级来自行修改
      if (res.url) {
      	// 判断接口上传成功
        if (this.imgList.length < this.limit) {
          // 未超限时，把接口返回的图片url地址添加到imgList
          let data={
            relative_url:res.relative_url,
            url:res.url
          }
          this.imgList.push(data)

        }
      } else {
      	// 判断接口上传失败
        this.syncElUpload()
        this.$message({ type: 'error', message: "图片上传失败" })
      }
      this.isUploading = false
    },



    // finish() {
    //   this.$refs.cropper.getCropBlob((data) => {
    //     this.loading = true
    //     console.log(data)
    //     //上传阿里云服务器
    //     //请求
    //   })
    // },



    // 移除单张图片
    onRemoveHandler (index) {
      this.$confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.imgList = this.imgList.filter((v, i) => {
            return i !== index
          })
          
          let data = {
                    index: index
                  };
          this.$emit('delIndex',data);
          
        })
        .catch(() => {})
    },

    onPreviewHandler(index){
      let data = {
                image: this.imgList[index]
              };
      this.$emit('preViewImage',data);
    },



    // 超限
    onExceed () {
      this.$refs.uploadRef.abort() // 取消剩余接口请求
      this.syncElUpload()
      this.$message({
        type: 'warning',
        message: `图片超限，最多可上传${this.limit}张图片`
      })
    },
    onDragStart (e) {
      e.target.classList.add('hideShadow')
    },
    onDragEnd (e) {
      e.target.classList.remove('hideShadow')
    }

  },

  components: { vuedraggable}
}
</script>

<style scoped>

  .uploadIcon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    border-radius: 6px;
    font-size: 20px;
    color: #999;
  }
  .uploadIcon .limitTxt,
  .uploadIcon .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }

  .uploadBox/deep/.el-upload {
    width: 100%;
    height: 100%;
  }


  .vue-draggable {
    display: flex;
    flex-wrap: wrap;
    margin-left: -40px;
  }
  .vue-draggable .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  .vue-draggable .draggable-item .el-image {
    width: 100%;
    height: 100%;
  }
  .vue-draggable .draggable-item .shadow {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity .3s;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    padding: 2px;
    cursor: pointer;
  }


  .vue-draggable .draggable-item:hover .shadow {
    opacity: 1;
  }
  .vue-draggable.hideShadow .shadow {
    display: none;
  }





  .vue-draggable.single {
    overflow: hidden;
    position: relative;
  }
  .vue-draggable.single .draggable-item {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .vue-draggable.maxHidden .uploadBox {
    display: none;
  }
  .el-image-viewer__wrapper .el-image-viewer__mask {
    opacity: .8;
  }
  .el-image-viewer__wrapper .el-icon-circle-close {
    color: #fff;
  }
</style>
