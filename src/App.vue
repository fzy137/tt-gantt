<template>
    <div id="app">
        <div id="nav">
        </div>
        <div id="ganttChart">
            <el-row style='padding:20px;background-color: #ffffff;border-radius: 5px;'>
                <el-col
                    :span='5'
                    style="border:1px solid #e5e5e5;"
                >
                    <div
                        ref='leftCol'
                        :style="{height:leftColHeight}"
                    >
                        <!-- 左侧tree -->
                        <Tree style="margin-right:20px;" />
                    </div>
                </el-col>
                <el-col
                    :span='19'
                    style="border:1px solid #e5e5e5;border-left:none;"
                >
                    <div ref="rightCol">
                        <!-- 右侧tt-gantt -->
                        <Gantt @setleftColHeight='setleftColHeight' />
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import Gantt from "@/components/Gantt";
import Tree from "@/components/Tree";

export default {
    components: {
        Gantt,
        Tree
    },
    data() {
        return {
            leftColHeight: null
        };
    },
    methods: {
        setleftColHeight(val) {
            this.leftColHeight = val;
        }
    },
    computed: {},
    mounted() {},
    created() {}
};
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    font-size: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
html,
body {
    background-color: #f3f3f4;
    color: #333;
    width: 100%;
    height: 100%;
}
html,
body,
#app,
.el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
    background-color: #c3c7cc;
    border-radius: 15px;
}
</style>
