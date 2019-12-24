<template>
    <div class='gantt-leftTable-whole'>
        <div>
            <!-- headerArr 头部左侧数据-->
            <div class="gantt-leftTable gantt-leftTable-header" :key="index" v-for="(item,index) in  headerArr">
                <span class="groupName">{{item}}</span>
            </div>
        </div>
        <!-- personData 父组件人员数据  36为高度  2为上下边框-->
        <div class="gantt-leftTable gantt-leftTable-project" :style="{lineHeight:36*item.totalDeep + 'px',height:36*item.totalDeep + 'px'}" :key="index" v-for="(item,index) in  personData">
            <div class="gantt-leftTable-groupInfo">
                <div class="gantt-leftTable-groupName" :style="{lineHeight:36*item.totalDeep - 2 + 'px',height:36*item.totalDeep - 2 + 'px'}">
                    <span :style="{lineHeight:36*item.totalDeep + 'px',height:36*item.totalDeep + 'px'}">{{item.group}}</span>
                </div>
                <div class="gantt-leftTable-member">
                    <div :key="personIndex" v-for="(person,personIndex) in  item.membership">
                        <!-- 多行合并情况的高度设置 -->
                        <span v-if="personData[index].taskDeep[person] === 1 " :style="{lineHeight:35 + 'px'}">{{person}}</span>
                        <span v-if="personData[index].taskDeep[person] != 1 " :style="{lineHeight:36*personData[index].taskDeep[person] - 1 + 'px'}">{{person}}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        personData: {
            type: Array,
            default: []
        },
    },
    computed:{

    },
    data() {
        return {
            headerArr:['组别','人员']
        };
    },
    mounted() {

    }
};
</script>

<style scoped>
span{
    line-height: 36px;
    display: block;
    font-size: 14px;
}
.gantt-leftTable-whole{
    box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.1);
}
.gantt-leftTable-header{
    
    display: inline-block;
    width: 99px;
    text-align: center;
    line-height: 88px;
    height: 88px;
    border:1px solid #f3f3f3;
    margin-right:-1px;
}
.gantt-leftTable-header span{
    line-height: 90px;
    font-size: 16px;
    color: #666666;
    font-weight: bold;
}
.gantt-leftTable{
    margin-right:-1px;
}

.gantt-leftTable-groupInfo{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    
}
.gantt-leftTable-groupName{
    border:1px solid #f3f3f3;
    display: inline-block;
    width: 98px;
    text-align: center;
    
}
.gantt-leftTable-member{
    display: inline-block;
    width: 99px;
    text-align: center;
    border-left: 1px solid #f3f3f3;
}
.gantt-leftTable-member span{
    border-bottom: 1px solid #f3f3f3;
    color: #333333;
}

.groupName{
    font-family: MicrosoftYaHeiUI-Bold;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
}
</style>