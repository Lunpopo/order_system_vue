<template>
  <div class="app-container">
    <!-- 过滤组件 -->
    <div class="filter-container">
      <el-input v-model.trim="listQuery.title" placeholder="请输入产品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出表格数据
      </el-button>
      <el-checkbox v-model.trim="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        显示隐藏列
      </el-checkbox>
    </div>

    <!-- 添加 和 多行删除 按钮 -->
    <el-button class="filter-item" type="danger" icon="el-icon-delete" :disabled="!(selectionList&&selectionList.length)" @click="batchDelete()">删除</el-button>
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
      添加
    </el-button>

    <!-- 表格数据 -->
    <!-- :default-sort="{prop: 'product_name', order: 'descending'}" -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" width="55" />

      <!-- 按下详情按钮 -->
      <el-table-column label="详情" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.product_name }}</span>
            </el-form-item>
            <el-form-item label="规格（ML）">
              <span>{{ props.row.specifications }}</span>
            </el-form-item>
            <el-form-item label="香型">
              <span>{{ props.row.scent_type }}</span>
            </el-form-item>
            <el-form-item label="每件规格（瓶）">
              <span>{{ props.row.specification_of_piece }}</span>
            </el-form-item>
            <el-form-item label="单价（瓶/元）">
              <span>{{ props.row.unit_price }}</span>
            </el-form-item>
            <el-form-item label="每件价格（元）">
              <span>{{ props.row.price_of_piece }}</span>
            </el-form-item>
            <el-form-item label="扫码价（元）">
              <span>{{ props.row.scanning_price }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remarks }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>
            <el-form-item label="业务id">
              <span>{{ props.row.business_id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="产品名称" sortable="custom" prop="product_name" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type" @click="viewDetails(row)">{{ row.product_name }} </span>
          <el-tag>{{ row.scent_type }}</el-tag>
          <el-tag type="success">{{ row.specifications }} ML</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="每件规格（瓶）" sortable="custom" prop="specification_of_piece" align="center">
        <template slot-scope="{row}">
          <span>{{ row.specification_of_piece }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单价（瓶/元）" sortable="custom" prop="unit_price" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.unit_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="每件价格（元）" sortable="custom" prop="price_of_piece" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price_of_piece }}</span>
        </template>
      </el-table-column>

      <el-table-column label="扫码价（元）" sortable="custom" prop="scanning_price" align="center">
        <template slot-scope="{row}">
          <span>{{ row.scanning_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="remarks" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column label="缩略图" prop="thumb_img" align="center">
        <template slot-scope="{row}">
          <el-popover
            placement="right"
            title=""
            trigger="click"
          >
            <img :src="row.img_url" style="max-height: 600px; max-width: 600px">
            <img slot="reference" :src="row.thumb_img_url" :alt="row.thumb_img_url" style="max-height: 35px; max-width: 110px">
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="showReviewer" label="创建时间" sortable="custom" prop="create_time" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="showReviewer" label="更新时间" sortable="custom" prop="update_time" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页面控制 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleFilter" />

    <!-- 编辑按钮弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model.trim="temp.product_name" />
        </el-form-item>

        <el-form-item label="规格（ML）" prop="specifications">
          <el-input-number v-model.trim="temp.specifications" :controls="true" />
        </el-form-item>

        <el-form-item label="香型" prop="scent_type">
          <el-select v-model.trim="temp.scent_type" class="filter-item" placeholder="请选择香型">
            <el-option v-for="item in scentTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="每件规格（瓶）" prop="specification_of_piece">
          <el-input-number v-model.trim="temp.specification_of_piece" :controls="true" @input="calPiecePrice" />
        </el-form-item>

        <el-form-item label="单价（元/瓶）" prop="unit_price">
          <el-input-number v-model.trim="temp.unit_price" :controls="true" :precision="2" @input="calPiecePrice" />
        </el-form-item>

        <el-form-item label="每件价格（元）" prop="price_of_piece">
          <el-input-number v-model.trim="temp.price_of_piece" disabled :controls="true" :precision="2" />
        </el-form-item>

        <el-form-item label="扫码价（元）" prop="scanning_price">
          <el-input-number v-model.trim="temp.scanning_price" :controls="true" :precision="2" />
        </el-form-item>

        <el-form-item label="上传图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="testUpload"
            :show-file-list="true"
            :file-list="fileList"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :on-change="(file,fileList)=>changeHandler(file,fileList)"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="temp.img_url" :src="temp.img_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model.trim="temp.remarks" :autosize="{ minRows: 2, maxRows: 2}" type="textarea" placeholder="输入产品的备注信息" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  /* 产看详情的 style */
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /* 上传框的 style */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import { getProductList, getAllProduct, updateProduct, deleteProduct, product_multi_delete, addProduct, searchProduct } from '@/api/product'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MysqlPriceList',
  components: { Pagination },
  directives: { waves },
  data() {
    const limitNumber = (rule, value, callback) => {
      value = parseInt(value)
      if (!value && value !== 0) {
        // 如果没有值
        return callback(new Error(rule.msg))
      } else {
        if (!Number.isInteger(+value)) {
          callback(new Error('只允许输入整数'))
        } else if (value < 0) {
          callback(new Error('数字应大于等于0'))
        } else {
          callback()
        }
      }
    }
    return {
      // 下载 excel 保存数据
      downloadDataList: [],
      // 放置上传的图片列表
      fileList: [],
      tableKey: 0,
      // 数据列表
      list: null,
      // 数据总数
      total: 0,
      // 是否显示加载圆圈
      listLoading: true,
      // 数据请求参数
      listQuery: {
        page: 1,
        limit: 10
      },
      // 多选框保存的选择项
      selectionList: [],
      scentTypeOptions: ['老白干香型', '浓香型', '清香型', '酱香型', '其他香型'],
      // 是否显示隐藏列
      showReviewer: false,
      // 临时保存数据
      temp: {
        timestamp: new Date()
      },
      dialogFormVisible: false,
      // 弹窗狂状态，create / update
      dialogStatus: '',
      textMap: {
        detail: '查看产品详情',
        update: '编辑产品',
        create: '添加产品'
      },
      // 表单验证规则
      rules: {
        product_name: [{ required: true, message: '请输入产品名', trigger: 'change' }],
        specifications: [{ required: true, msg: '请输入产品规格（ML）', validator: limitNumber, trigger: 'blur' }],
        // trigger 还一个属性是 blur，失去焦点再验证
        scent_type: [{ required: true, msg: '请选择产品的香型', trigger: 'change' }],
        specification_of_piece: [{ required: true, msg: '请输入产品的每件规格（瓶）', validator: limitNumber, trigger: 'blur' }],
        unit_price: [{ required: true, msg: '请输入单价（瓶/元）', validator: limitNumber, trigger: 'blur' }],
        price_of_piece: [{ required: true, msg: '请输入每件价格（元）', validator: limitNumber, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },

  // 初始化函数
  created() {
    this.handleFilter()
  },

  methods: {
    // 自定义排序
    sortChange(data) {
      const { prop, order } = data
      if (order === 'ascending') {
        this.listQuery.order_by = '+' + prop
      } else {
        this.listQuery.order_by = '-' + prop
      }
      // 获取 search 数据
      this.handleFilter()
    },

    // 处理下载 Excel 表格数据
    // TODO 增加 一些赠品的剔除
    handleDownload() {
      this.downloadLoading = true
      this.$confirm('是否确认将【自己的货单表】导出为Excel表格？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 从后台获取所要下载的所有数据
        getAllProduct(this.listQuery).then((response) => {
          const res = response.data.data

          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['产品名称', '规格（ML）', '香型', '每件规格（瓶）', '单价（元/瓶）', '每件价格（元）', '扫码价（元）', '备注']
            const filterVal = ['product_name', 'specifications', 'scent_type', 'specification_of_piece', 'unit_price', 'price_of_piece', 'scanning_price', 'remarks']
            const data = this.formatJson(filterVal, res)

            // 导出 excel
            excel.export_json_to_excel({
              header: tHeader,
              autoWidth: true,
              data,
              bookType: 'xlsx',
              filename: '自己的货单表'
            })
          })
          this.downloadLoading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消！'
        })
        this.downloadLoading = false
      })
    },
    // 格式转换
    formatJson(filterVal, jsonData) {
      const returnData = []
      jsonData.map(v => {
        v = filterVal.map(j => {
          // 如果是外表字段  即存在 "."
          if (j.indexOf('.') !== -1) {
            // 截取到"."之前的字符
            const subStar = j.substring(0, j.indexOf('.'))
            // 截取到"."之后的字符
            const subEnd = j.substring(j.indexOf('.') + 1, j.length)
            // 如果联表数据不为空
            if (v[subStar] != null) {
              return v[subStar][subEnd]
            }
          } else {
            if (j === 'update_time') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          }
        })
        returnData.push(v)
      })
      return returnData
    },

    // 自上传，必须要加这个
    testUpload(content) {
      // 必须要加这个，source：https://blog.csdn.net/qq_45613931/article/details/125258861
      content.onSuccess()
    },

    // 处理自上传成功之后的自提交方法
    handleAvatarSuccess(res, file) {
      this.temp.img_url = URL.createObjectURL(file.raw)
    },

    // 文件上传前的文件校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isJPG2 && !isPNG) {
        this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传的图片大小不能超过 10MB！')
        return false
      }

      return true
    },

    // el-upload输入框的 on-change 事件
    changeHandler(file, fileList) {
      // 最主要使用这个list
      this.fileList = fileList
    },

    // 计算每件的价格
    calPiecePrice(event) {
      this.temp.price_of_piece = this.temp.specification_of_piece * this.temp.unit_price
    },

    // 批量删除
    batchDelete() {
      try {
        this.$confirm('是否确认删除这些数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 放需要删除的业务id，每一次都进行清除变量
          const business_ids = []
          this.list = this.list.filter(
            (a) => !this.selectionList.some((b, index) => {
              if (a.business_id === b.element.business_id) {
                business_ids.push(b.element.business_id)
                return true
              }
            })
          )

          // 多行删除api
          product_multi_delete(business_ids).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '批量删除产品',
              message: '删除成功！',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消！'
          })
        })
      } catch (error) {
        this.loading = false
        console.log('批量删除出错了：')
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    // 处理多选框，将选中的行的对象丢入 selectionList 里面
    handleSelectionChange(selection) {
      const dataList = []
      const allList = this.list
      selection.forEach(element => {
        const element_dict = {
          element: element,
          index: allList.indexOf(element)
        }
        dataList.push(element_dict)
      })
      this.selectionList = dataList
    },

    // 获取表格数据
    getList() {
      this.listLoading = true

      getProductList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.count

        this.listLoading = false
      })
    },

    // 搜索功能
    handleFilter() {
      this.listLoading = true
      searchProduct(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.count
        this.listLoading = false
      })
    },

    // 生成时间戳，用来更新创建框的缓存
    resetTemp() {
      this.temp = {
        timestamp: new Date()
      }
    },

    // 创建按钮弹出框逻辑
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 新增产品
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          if (this.fileList.length !== 0) {
            formData.append('pictureFile', this.fileList[0].raw)
            this.temp.image = formData
          }

          addProduct(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '新增产品：' + this.temp.product_name,
              message: '新增成功！',
              type: 'success',
              duration: 2000
            })

            // 重新清空一下 upload 图片的变量
            this.temp.image = ''
            this.fileList = []
            // 刷新表格数据
            this.handleFilter()
          })
        }
      })
    },

    // 更新产品数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.fileList.length !== 0) {
            const formData = new FormData()
            formData.append('pictureFile', this.fileList[0].raw)
            this.temp.image = formData
          }

          // 更新表格
          updateProduct(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '更新产品：' + this.temp.product_name,
              message: '更新成功！',
              type: 'success',
              duration: 2000
            })

            // 重新清空一下 upload 图片的变量
            this.temp.image = ''
            this.fileList = []

            // 刷新表格数据
            this.handleFilter()
          })
        }
      })
    },

    // 编辑产品数据（更新产品数据）
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 查看详情页面
    viewDetails(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 删除单条数据按钮
    handleDelete(row, index) {
      this.$confirm('是否确认删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProduct(row).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: '删除产品：' + row.product_name,
            message: '删除成功！',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消！'
        })
      })
    }
  }
}
</script>