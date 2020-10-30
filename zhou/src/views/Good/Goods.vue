<template>
  <div class="goods">
    <el-button type="primary" @click="addGoods">+ 新增</el-button>
    <!-- 弹框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="dialogVisible"
      >
      <!-- 表单 -->
      <el-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        label-width="100px">
        <el-form-item
          v-for="item in  operateFormLabel"
          :key="item.model"
          :label="item.label"
        >
          <el-input
            v-model="operateForm[item.model]"
            :placeholder="'请输入' + item.label"
            v-if="!item.type"
          >
          </el-input>
          <!-- 日期选择器 -->
          <el-date-picker
            v-model="operateForm[item.model]"
            type="date"
            placeholder="选择日期"
            v-if="item.type === 'date'"

          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 弹框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="tableData" stripe class="table">
      <!-- 第一列放图片 -->
      <el-table-column label="商品图片" :width="120">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" style="width:100px;height:100px;border-radius:10px">
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 200"
      >
        <!-- template代表一个插槽  scope插槽的作用域 通过其能使用里面的变量-->
        <template slot-scope="scope"> 
          <span>
            <!-- 每一行的数据 -->
            {{ scope.row[item.prop] }}
          </span>
        </template>
      </el-table-column>
      <!-- 另起一列放操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="5"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        operateType: "add",
        dialogVisible: false,
        tableData:[],
        tableLabel:[
          {
            prop:'name',
            label:'商品名称',
          }, 
          {
            prop:'price',
            label:'商品价格',
            width:150
          },
          {
            prop:'online',
            label:'上架时间',
          },
          {
            prop:'selled',
            label:'商品已售',
          },
        ],
        operateForm:{
          name:'',
          price:'',
          online:'',
          selled:'',
        },
        operateFormLabel:[
          {
            model:'name',
            label:'商品名称'
          },
          {
            model:'price',
            label:'商品价格'
          },
          {
            model:'online',
            label:'上架时间',
            type:'date'
          },
          {
            model:'selled',
            label:'商品已售'
          },
        ],
        config: {
          page: 1,
          total: 30,
        }
      }
    },
    methods: {
      // 获取数据
      getList(name = "") {
        console.log(this.config.page)
        name ? (this.config.page = 1) : "";
        this.$http.get("/api/goods/getGoods", {
            params: {
              page: this.config.page,
              name
            }
        })
        .then(res => {
          this.tableData = res.data.List;
          this.config.total = res.data.count;
        });
      },

      // 增加商品
      addGoods(){
        this.dialogVisible= true,
        this.operateType = "add",
        this.operateForm = {}
      },
      // 换页
      changePage(page) {
        console.log("page",page)
        this.getList();
      },
      // 编辑商品
      handleEdit(row) {
        this.$emit("edit", row),
        this.dialogVisible= true,
        this.operateType = "edit";
        this.operateForm = row
      },
      // 删除商品
      handleDelete(row) {
        console.log(row)
        this.$emit("del", row);
        this.$confirm("此操作将永久删除该数据，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let name = row.name;
          this.$http
            .get("/api/goods/del", {
              params: {
                name
              }
            })
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getList();
            });
        })
        .catch(() => {
          this.$message({
            type: "into",
            message: "已取消删除"
          });
        });
    },


      // 判断是编辑商品还是增加商品
      confirm(){
        if(this.operateType === "edit"){
          this.$http.post("/api/goods/edit", this.operateForm).then(res => {
            console.log(res.data);
            this.dialogVisible = false, 
            this.getList()
          })
        }else{
          this.$http.post("/api/goods/addGoods", this.operateForm).then(res => {
          console.log(res.data);
          this.dialogVisible = false, 
          this.getList();
        });
        }
      }
    },
    created() {
      this.getList();
    },

  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/goods.scss";

</style>