<template>
    <div id="treeRoot">
        <div>
            <span class="filterStyle" style="font-weight:bold">产品目标</span>
        </div>
        <div style="margin-top:20px;">
            <div style="margin-bottom:10px;" v-for="(item,key,index) in treeData">
                <el-progress
                    :percentage="item.percentage"
                    :color="progressStatus[key]"
                ></el-progress>
                <el-tree
                    :style="{background:'#f7f8f9'}"
                    :data="item.data"
                    node-key="id"
                    default-expand-all
                    highlight-current
                    expand-on-click-node
                    :render-content="renderContent"
                >
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // tree结构
            treeData: [
                // 每一个对象为一颗tree
                {
                    percentage: 40,// 当前tree完成百分比
                    data: [// tree数据
                        {
                            id: 1,
                            label: "一级 12222222222222222222222222222222222",
                            status: "关闭",//右侧tag名
                            type: "closed",//tag状态
                            children: [
                                {
                                    id: 4,
                                    label: "二级 1-111212121222222222221",
                                    status: "完成待测试",
                                    type: "waitForTest",
                                    children: [
                                        {
                                            id: 9,
                                            label: "三级 1-1-1",
                                            status: "程序导入",
                                            type: "insertProgram"
                                        },
                                        {
                                            id: 10,
                                            label: "三级 1-1-2",
                                            status: "新建",
                                            type: "new"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    percentage: 73,
                    data: [
                        {
                            id: 2,
                            label: "一级 2",
                            status: "开发完成",
                            type: "finish",
                            children: [
                                {
                                    id: 5,
                                    label: "二级 2-1",
                                    status: "待策划验收",
                                    type: "waitForPlanner"
                                },
                                {
                                    id: 6,
                                    label: "二级 2-2",
                                    status: "待组长验收",
                                    type: "waitForLeader"
                                }
                            ]
                        }
                    ]
                },
                {
                    percentage: 13,
                    data: [
                        {
                            id: 3,
                            label: "一级 3",
                            status: "待策划配置",
                            type: "waitForSetting",
                            children: [
                                {
                                    id: 7,
                                    label: "二级 3-1",
                                    status: "关闭",
                                    type: "closed"
                                },
                                {
                                    id: 8,
                                    label: "二级 3-2",
                                    status: "开发完成",
                                    type: "finish"
                                }
                            ]
                        }
                    ]
                },
                {
                    percentage: 89,
                    data: [
                        {
                            id: 1,
                            label: "一级 1",
                            status: "关闭",
                            type: "closed",
                            children: [
                                {
                                    id: 4,
                                    label: "二级 1-1",
                                    status: "完成待测试",
                                    type: "waitForTest",
                                    children: [
                                        {
                                            id: 9,
                                            label: "三级 1-1-12222222222222222222222222222222",
                                            status: "程序导入",
                                            type: "insertProgram"
                                        },
                                        {
                                            id: 10,
                                            label: "三级 1-1-2",
                                            status: "新建",
                                            type: "new"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            // tag样式
            treeStatus: {
                closed: "#e8ecef",
                waitForTest: "#d3ece5",
                insertProgram: "#fae9d0",
                new: "#d7e5fa",
                finish: "#fae9d0",
                waitForPlanner: "#fae9d0",
                waitForLeader: "#fae9d0",
                waitForSetting: "#fae9d0"
            },
            // tag样式
            treeColor: {
                closed: "#999999",
                waitForTest: "#3db898",
                insertProgram: "#f99400",
                new: "#285ff2",
                finish: "#f99400",
                waitForPlanner: "#f99400",
                waitForLeader: "#f99400",
                waitForSetting: "#f99400"
            }
        };
    },
    computed: {
        progressStatus: function() {
            // 进度条状态， 0-25 红色， 25-50 黄色 ， 50-75 蓝色 ， 75-100 绿色
            let statusArr = [];
            this.treeData.map((value, key) => {
                if (value.percentage >= 0 && value.percentage < 25) {
                    statusArr.push("#f56c6c");
                } else if (value.percentage >= 25 && value.percentage < 50) {
                    statusArr.push("#e6a23c");
                } else if (value.percentage >= 50 && value.percentage < 75) {
                    statusArr.push("#409eff");
                } else if (value.percentage >= 75 && value.percentage < 100) {
                    statusArr.push("#67c23a");
                }
            });
            return statusArr;
        }
    },
    methods: {
        renderContent(h, { node, data, store }) {//自定义tree渲染内容
        let currentWidth = 360 - (node.level - 1) * 16 + 'px'
        let currentWidthDiv = 320 - (node.level - 1) * 16 - 110 + 'px'
            return (
                <div class="custom-tree-node" style={{width:currentWidth}}>
                    <span class='show-ellipsis' style={{width:currentWidthDiv,float:'left'}} title={node.label}>{node.label}</span>
                    <span style={{width:'100px',paddingRight:'8px',float:'right',textAlign:'end'}}>
                        <el-tag
                            size="mini"
                            style={{
                                backgroundColor: this.treeStatus[
                                    node.data.type
                                ],
                                color: this.treeColor[node.data.type],
                                borderColor: this.treeColor[node.data.type],
                            }}
                        >
                            {node.data.status}
                        </el-tag>
                    </span>
                </div>
            );
        }
    }
};
</script>

<style scoped>
#treeRoot {
    padding: 20px 0 20px 20px;
    max-height: 800px;
    overflow: auto;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.filterStyle {
    font-family: MicrosoftYaHeiUI-Bold;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
}

</style>

<style>
.el-tree > div > div > div > span {
    font-weight: bold;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #d0d0f5 !important;
}
.el-tree-node__content:hover {
    background-color: #f7e7fb !important;
}

.el-tree>.el-tree-node {
  display: inline-block !important;
  width:100%;
}
.show-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>