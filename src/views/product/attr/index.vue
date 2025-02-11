<template>
  <div>
    <el-card>
      <el-form ref="formRef" :inline="true">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择">
            <el-option label="Options1" value="1" />
            <el-option label="Options2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select placeholder="请选择">
            <el-option label="Options1" value="1" />
            <el-option label="Options2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select placeholder="请选择">
            <el-option label="Options1" value="1" />
            <el-option label="Options2" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" icon="Plus">添加品牌属性</el-button>
      <el-table
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        border
        style="margin: 10px 0"
      >
        <el-table-column prop="date" label="序号" width="80px" />
        <el-table-column prop="name" label="属性名称" width="120px" />
        <el-table-column prop="address" label="属性值名称" />
        <el-table-column prop="name" label="操作" width="120px" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
}
.el-select {
  width: 240px;
}
</style>
