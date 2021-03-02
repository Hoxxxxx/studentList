<template>
  <div class="staffManage">
    <el-card class="listCard">
      <!-- 卡片title -->
      <div slot="header" class="clearfix tableTitleBox">
        <div class="filterOut">
          <span class="tableTitle">学生列表</span>
          <div class="btns">
            <el-button type="primary" class="p40" @click="addStaff()"
              >新增学生</el-button
            >
          </div>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          :data="viewsList"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          :height="tableHeight"
        >
          <!-- 表头 -->
          <el-table-column
            align="center"
            v-for="(head, index) in headList"
            :key="index"
            :label="head.label"
            :prop="head.prop"
            min-width="120px"
          ></el-table-column>
          <!-- 编辑区域 -->
          <el-table-column
            label="操作"
            width="230px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  class="w56"
                  @click="editStaff(scope.row.id)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  @click="deleteStaff(scope.row.id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增/编辑学生 弹窗 -->
      <el-dialog
        :visible.sync="showDialog"
        width="600px"
        :close-on-click-modal="false"
        center
      >
        <div class="openUse">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="ID" prop="id">
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="extraBtnClick(0)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="extraBtnClick(1, 'ruleForm')"
              type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin: 10px 0; float: right"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格最低高度
      tableHeight: 500,
      // 表格数据
      viewsList: [],
      // 表头数据
      headList: [],
      // 修改/新增学生弹窗数据
      showDialog: false,
      dialogType: "",
      // 修改项id
      editId: "",
      // 新增学生表单提交数据
      ruleForm: {
        id: "",
        name: "",
        age: "",
        address: "",
        gender: "",
      },
      // 表单验证规则
      rules: {
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        address: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      // 分页器数据
      total: 0,
      listParams: { name: "", page: 1, pageSize: 20 },
    };
  },
  mounted() {
    // 控制表格自适应
    this.$nextTick(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
    // 获取表格数据
    this.getStaffList();
    // 获取表头数据
    this.getHead();
  },
  methods: {
    // 获取员工列表
    getStaffList() {
      // 此处访问获取列表接口
      this.viewsList = [
        {
          id: 0,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 1,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 4,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 5,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 6,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 7,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 8,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 9,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 10,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 11,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 12,
          name: "王小虎",
          age: 25,
          gender: "男",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ];
      // 分页相关数据从接口获取
      this.total = this.viewsList.length;
    },
    // 获取表头数据
    getHead() {
      // 表头数据根据接口数据做对应处理
      this.headList = [
        {
          label: "ID",
          prop: "id",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "姓别",
          prop: "gender",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "住址",
          prop: "address",
        },
      ];
    },
    // 新增学生按钮触发
    addStaff() {
      this.showDialog = true;
      this.dialogType = "add";
      this.ruleForm = {
        id: "",
        name: "",
        age: "",
        address: "",
        gender: "",
      };
    },
    // 编辑学生按钮触发
    editStaff(val) {
      this.showDialog = true;
      this.dialogType = "edit";
      this.editId = val;
      this.viewsList.forEach((item) => {
        if (item.id == val) {
          // 深拷贝防止出现修改表单数据列表跟着改变
          this.ruleForm = JSON.parse(JSON.stringify(item));
        }
      });
    },
    // 编辑/新增弹窗确认按钮事件
    extraBtnClick(type, formName) {
      if (type == 1) {
        switch (this.dialogType) {
          case "add":
            this.$refs[formName].validate((valid) => {
              if (valid) {
                // 此处访问新增数据接口   新增成功再次调用获取列表数据接口刷新数据
                this.viewsList.push(this.ruleForm);
                // 新增成功后关闭弹窗并清空表单
                this.showDialog = false;
                this.$message.success('新增成功')
              } else {
                console.log("error submit!!");
                return false;
              }
            });
            break;
          case "edit":
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.viewsList.forEach((item, index) => {
                  if (item.id == this.editId) {
                    this.viewsList[index] = this.ruleForm;
                    this.$message.success('修改成功')
                    // 此处访问修改数据接口 修改成功再次调用获取列表数据接口刷新数据
                  }
                });
                // 修改成功后关闭弹窗
                this.showDialog = false;
              } else {
                console.log("error submit!!");
                return false;
              }
            });
            break;
          default:
            break;
        }
      } else {
        this.showDialog = false;
      }
    },
    // 删除
    deleteStaff(val) {
      this.$confirm("确认删除该学生？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          this.viewsList.forEach((item, index) => {
            if (item.id == val) {
              this.viewsList.splice(index, 1);
            }
          });
          // 此处访问删除接口
        })
        .catch(() => {});
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      // size变化  重新访问列表接口
      this.getStaffList();
    },
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      // 页数发生变化 重新访问列表接口
      this.getStaffList();
    },
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
}
// 表格区域样式
.listCard {
  margin: 0 20px;
  .tableTitleBox {
    .filterOut {
      width: 100%;
      position: relative;
      .btns {
        position: absolute;
        right: 0;
        top: -10px;
        .btn {
          color: #409efd;
          border-color: #409efd;
        }
        .p40 {
          padding: 12px 40px;
        }
      }
    }
    .tableTitle {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .extraBtns {
    width: 100%;
    margin-top: 30px;
    div {
      width: 240px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
