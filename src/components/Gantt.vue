<template>
    <div id="gantt" ref="gantt">
        <div>
            <!-- 组别 -->
            <div class="topSearch">
                <span class="filterStyle" style="font-weight:bold;margin-left:0px">组别</span>
                <el-select v-model="groupModel" @change='groupChange' placeholder="请选择组别" size="mini" style="width:120px;margin-left:15px">
                    <el-option
                        v-for="item in groupOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- 人员 -->
            <div class="topSearch">
                <span class="filterStyle"  style="font-weight:bold;margin-left:30px">人员</span>
                <el-select v-model="personModel" @change='personChange' placeholder="请选择人员" filterable  size="mini" style="width:120px;margin-left:15px">
                    <el-option
                        v-for="item in personOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- 搜索 -->
            <div class="topSearch">
                <el-input v-model="keyWordModel" clearable placeholder="请输入关键字" size="mini" style="width:250px;margin-left:30px">
                    <el-button slot="append" icon="el-icon-search" @click="keyWordSearch"></el-button>
                </el-input>
            </div>

            <!-- 时间编辑 -->
            <div style="float:right;">
                <el-button size="mini" @click="dialogVisible = true">时间编辑</el-button>
            </div>
        </div>
        <div style="margin-top:20px;overflow:auto;" :style="{maxHeight:currentMaxHeight}">
            <LeftTable style="display:inline-block;width:200px;float:left;" 
                :personData='ganttData.personData' />
            <RightTable style="display:inline-block;margin-left:1px;" 
                :personNum='personNum' 
                :versionData='ganttData.versionData' 
                :dataRange='ganttData.dataRange'
                :dataInfo='ganttData.dataInfo'
                :personData='ganttData.personData' />
        </div>

        <!-- 时间编辑model -->
        <el-dialog
            title="时间编辑"
            :visible.sync="dialogVisible"
            width="30%">
            <span>1111</span>
            <span slot="footer" class="dialog-footer">
                <el-button size='mini' type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button size='mini' @click="dialogVisible = false">取 消</el-button>
                
            </span>
        </el-dialog>
    </div>
</template>

<script>
import LeftTable from './components/LeftTable'
import RightTable from './components/RightTable'

export default {
    components:{
        LeftTable,
        RightTable
    },
    data(){
        return{
            dialogVisible:false,//时间编辑模态框
            currentMaxHeight:null,
            groupModel:'全部',//组别
            personModel:'全部',//人员
            keyWordModel:'',//关键字
            ganttData:{
                versionData:['2019-12-4周版本','2019-12-11周版本','2019-12-18周版本'],//周版本
                dataRange:['11-28','11-29','11-30','12-1','12-2','12-3','12-4',//周版本内日期
                '12-5','12-6','12-7','12-8','12-9','12-10','12-11',
                '12-12','12-13','12-14','12-15','12-16','12-17','12-18',],
                dataInfo:{//根据日期，获取当前周信息
                    '11-28':'四',
                    '11-29':'五',
                    '11-30':'六',
                    '12-1':'日',
                    '12-2':'一',
                    '12-3':'二',
                    '12-4':'三',
                    '12-5':'四',
                    '12-6':'五',
                    '12-7':'六',
                    '12-8':'日',
                    '12-9':'一',
                    '12-10':'二',
                    '12-11':'三',
                    '12-12':'四',
                    '12-13':'五',
                    '12-14':'六',
                    '12-15':'日',
                    '12-16':'一',
                    '12-17':'二',
                    '12-18':'三',
                },
                personData:[
                    {
                        group:'策划',//组别
                        membership:['张xx','赵x x','涂xx'],//组员
                        taskDeep:{'张xx':1,'赵xx':2,'涂xx':1},//每个组员重叠的任务单深度（一天分配了多个任务）
                        totalDeep:4,//该组成员所有任务单深度相加
                        maxDeep:2,//改组成员最大深度,
                        rowOwner:['张xx','赵xx','赵xx','涂xx'],
                        task:[//任务单情况
                            //array处理重叠任务的情况
                                [
                                    {
                                        startDay:'11-29',//中间周六日隔开
                                        startDayIndex:1,//开始日期对应该版本内日期的位置
                                        during:1,//对应开始日期的持续时长
                                        orderNum:'#13567',//任务单编号
                                        taskStatus:'finish'//任务单状态
                                    },
                                    {
                                        startDay:'12-2',
                                        startDayIndex:4,
                                        during:2,
                                        orderNum:'#13567',
                                        taskStatus:'overhalf'
                                    },
                                    {
                                        startDay:'12-10',
                                        startDayIndex:12,
                                        during:3,
                                        orderNum:'#14422',
                                        taskStatus:'underway'
                                    }
                                ],
                                [
                                    {
                                        startDay:'12-13',
                                        startDayIndex:15,
                                        during:1,
                                        orderNum:'#31313',
                                        taskStatus:'new'
                                    },
                                ],
                                [
                                    {
                                        startDay:'12-18',
                                        startDayIndex:20,
                                        during:1,
                                        orderNum:'#12313',
                                        taskStatus:'underhalf'
                                    },
                                    {
                                        startDay:'12-4',
                                        startDayIndex:6,
                                        during:2,
                                        orderNum:'#31231',
                                        taskStatus:'overhalf'
                                    },
                                ],
                                [
                                    {
                                        startDay:'11-28',
                                        startDayIndex:0,
                                        during:2,
                                        orderNum:'#3245',
                                        taskStatus:'closed'
                                    },
                                    {
                                        startDay:'12-2',
                                        startDayIndex:4,
                                        during:2,
                                        orderNum:'#6745',
                                        taskStatus:'finish'
                                    },
                                ]
                        ]
                    },
                    {
                        group:'程序',
                        membership:['马xx','钱xx','陶xx','孙xx','唐xx','李xx'],
                        taskDeep:{'马xx':1,'钱xx':2,'陶xx':1,'孙xx':3,'唐xx':1,'李xx':1},
                        totalDeep:9,
                        maxDeep:3,
                        task:[
                            [
                                {
                                    startDay:'12-2',
                                    startDayIndex:4,
                                    during:4,
                                    orderNum:'#13567',
                                    taskStatus:'closed'
                                },
                            ],
                            [
                                {
                                    startDay:'12-9',
                                    startDayIndex:11,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                                {
                                    startDay:'12-17',
                                    startDayIndex:19,
                                    during:2,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                            ],
                            [
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:2,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'12-11',
                                    startDayIndex:13,
                                    during:3,
                                    orderNum:'#13567',
                                    taskStatus:'overhalf'
                                },
                            ],
                            [
                                {
                                    startDay:'12-3',
                                    startDayIndex:5,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                                {
                                    startDay:'12-6',
                                    startDayIndex:8,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                                {
                                    startDay:'12-11',
                                    startDayIndex:13,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'closed'
                                },
                            ],
                            [
                                {
                                    startDay:'12-16',
                                    startDayIndex:18,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'12-6',
                                    startDayIndex:8,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'11-29',
                                    startDayIndex:1,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                            ],
                            [
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                                {
                                    startDay:'12-13',
                                    startDayIndex:15,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                                {
                                    startDay:'12-10',
                                    startDayIndex:12,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underway'
                                },
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                            ],
                        ]
                    },
                    {
                        group:'xx',
                        membership:['李xx','吕xx'],
                        taskDeep:{'李xx':2,'吕xx':1},
                        totalDeep:3,
                        maxDeep:2,
                        task:[
                            [
                                {
                                    startDay:'12-6',
                                    startDayIndex:8,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'11-29',
                                    startDayIndex:1,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'closed'
                                },
                                {
                                    startDay:'12-4',
                                    startDayIndex:6,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'overhalf'
                                },
                                {
                                    startDay:'12-12',
                                    startDayIndex:14,
                                    during:2,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                            ],
                        ]
                    },
                    {
                        group:'策划2',
                        membership:['张xx','赵xx','涂xx'],
                        taskDeep:{'张xx':1,'赵xx':2,'涂xx':1},
                        totalDeep:4,
                        maxDeep:2,
                        rowOwner:['张xx','赵xx','赵xx','涂xx'],
                        task:[
                                [
                                    {
                                        startDay:'11-29',
                                        startDayIndex:1,
                                        during:1,
                                        orderNum:'#13567',
                                        taskStatus:'finish'
                                    },
                                    {
                                        startDay:'12-2',
                                        startDayIndex:4,
                                        during:2,
                                        orderNum:'#13567',
                                        taskStatus:'overhalf'
                                    },
                                    {
                                        startDay:'12-10',
                                        startDayIndex:12,
                                        during:3,
                                        orderNum:'请假',
                                        taskStatus:'leave'
                                    }
                                ],
                                [
                                    {
                                        startDay:'12-13',
                                        startDayIndex:15,
                                        during:1,
                                        orderNum:'#31313',
                                        taskStatus:'new'
                                    },
                                ],
                                [
                                    {
                                        startDay:'12-18',
                                        startDayIndex:20,
                                        during:1,
                                        orderNum:'请假',
                                        taskStatus:'leave'
                                    },
                                    {
                                        startDay:'12-4',
                                        startDayIndex:6,
                                        during:2,
                                        orderNum:'#31231',
                                        taskStatus:'overhalf'
                                    },
                                ],
                                [
                                    {
                                        startDay:'11-28',
                                        startDayIndex:0,
                                        during:2,
                                        orderNum:'#3245',
                                        taskStatus:'closed'
                                    },
                                    {
                                        startDay:'12-2',
                                        startDayIndex:4,
                                        during:2,
                                        orderNum:'#6745',
                                        taskStatus:'finish'
                                    },
                                ]
                        ]
                    },
                    {
                        group:'程序2',
                        membership:['马xx','钱xx','陶xx','孙xx','唐xx','李xx'],
                        taskDeep:{'马xx':1,'钱xx':2,'陶xx':1,'孙xx':3,'唐xx':1,'李xx':1},
                        totalDeep:9,
                        maxDeep:3,
                        task:[
                            [
                                {
                                    startDay:'12-2',
                                    startDayIndex:4,
                                    during:4,
                                    orderNum:'#13567',
                                    taskStatus:'closed'
                                },
                            ],
                            [
                                {
                                    startDay:'12-9',
                                    startDayIndex:11,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                                {
                                    startDay:'12-17',
                                    startDayIndex:19,
                                    during:2,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                            ],
                            [
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:2,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'12-11',
                                    startDayIndex:13,
                                    during:3,
                                    orderNum:'请假',
                                    taskStatus:'leave'
                                },
                            ],
                            [
                                {
                                    startDay:'12-3',
                                    startDayIndex:5,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                                {
                                    startDay:'12-6',
                                    startDayIndex:8,
                                    during:1,
                                    orderNum:'请假',
                                    taskStatus:'leave'
                                },
                                {
                                    startDay:'12-11',
                                    startDayIndex:13,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'closed'
                                },
                            ],
                            [
                                {
                                    startDay:'12-16',
                                    startDayIndex:18,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'12-6',
                                    startDayIndex:8,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'new'
                                },
                            ],
                            [
                                {
                                    startDay:'11-29',
                                    startDayIndex:1,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'finish'
                                },
                            ],
                            [
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                                {
                                    startDay:'12-13',
                                    startDayIndex:15,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                                {
                                    startDay:'12-10',
                                    startDayIndex:12,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underway'
                                },
                                {
                                    startDay:'11-28',
                                    startDayIndex:0,
                                    during:1,
                                    orderNum:'#13567',
                                    taskStatus:'underhalf'
                                },
                            ],
                        ]
                    },
                ]
            }
        }
    },
    computed:{
        personNum:function(){// 人员总数
            let num = 0 
            this.ganttData.personData.map((value,key)=>{
                num += value.membership.length
            })
            return num
        },
        groupOption:function(){//组别的下拉选项
            let curArr = []
            this.ganttData.personData.map((value,key)=>{
                let obj = {}
                obj.value = value.group
                obj.label = value.group
                curArr.push(obj)
            })
            curArr.push({value:'全部',label:'全部'})
            return curArr
        },
        personOption:function(){//人员的下拉选项
            let curArr = []
            this.ganttData.personData.map((value,key)=>{
                value.membership.map((memberValue,memberKey)=>{
                    curArr.push(memberValue)
                })
            })
            curArr.push('全部')
            curArr = Array.from(new Set(curArr))
        
            let personArr = []
            curArr.map((valueOpt,key)=>{
                let obj = {}
                obj.value = valueOpt
                obj.label = valueOpt
                personArr.push(obj)
            })
            return personArr
        }
    },
    mounted(){
        this.$nextTick(()=>{
            // 设置甘特图的最大高度，超出部分滚动条显示
            let clinetHeight = document.documentElement.clientHeight || document.body.clientHeight
            this.currentMaxHeight = clinetHeight - 150 + 'px'
            setTimeout(()=>{
                this.$emit('setleftColHeight',this.$refs.gantt.offsetHeight + 'px')
            },20)
        })
    },
    methods:{
        groupChange(){
            console.log('项目组change，重新请求数据：',this.groupModel)
        },
        personChange(){
            console.log('人员change，重新请求数据：',this.personModel)
        },
        keyWordSearch(){
            console.log('搜索：',this.keyWordModel)
        }
    }
};
</script>

<style scoped>
#gantt {
    padding: 20px !important;
    /* max-height: 800px; */
    /* overflow: auto; */
}
.topSearch{
    display: inline-block;
}
.filterStyle{
    width: 115px;
    height: 20px;
    font-family: MicrosoftYaHeiUI-Bold;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
}
</style>