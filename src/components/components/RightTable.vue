    <template>
        <div ref="rightTable" id="rightTable" :style="{maxWidth:tableMaxWidth}">
            <!-- 周版本 -->
            <div class="setWidth">
                <div class="gantt-rightTable-version" :style="{width:versionWidth}" v-for="(item,index) in versionData" :key="index">
                    <span class="versionName">{{item}}</span>
                </div>
            </div>
            <!-- 日期 -->
            <div class="setWidth">
                <div class="gantt-rightTable-dataRange" :style="{width:dataRangeWidth}" v-for="(item,index) in dataRange" :key="index">
                    <span>{{item}}</span>
                </div>
            </div>
            <!-- 周信息 -->
            <div class="setWidth">
                <!-- item为 六、日 进行特殊标示 -->
            <div class="gantt-rightTable-dataRange" :style="{width:dataRangeWidth,backgroundColor:dataRangeColorList[index]}" v-for="(item,key,index) in dataInfo" :key="index">
                    <span>{{item}}</span>
                </div>
            </div>
            <!-- 甘特图信息 -->
            <div class="setBodyWidth">
                <!-- 遍历组别 personDataItem获取每个组别信息-->
                <div v-for="(personDataItem,personDataIndex) in personData" :key="personDataIndex">
                    <!-- 根据每个组别的深度遍历出行数 personDataItem.totalDeep-->
                    <div class="gantt-rightTable-taskRow" :style="{width:rowWidth}" v-for="(item,index) in personDataItem.totalDeep" :key="index">
                            <div>
                                <div class="gantt-rightTable-tasks" :style="{width:dataRangeWidth,backgroundColor:personColorList[dataInfoIndex]}" v-for="(dataInfoItem,dataInfoKey,dataInfoIndex) in dataInfo" :key="dataInfoIndex">
                                    <span style='user-select:none;'>&nbsp</span>
                                </div>
                            </div>
                            <!-- v-drag:info="{'taskInfoItem':taskInfoItem,'dataRange':dataRange,'endIndex':endIndex}" -->
                            <div class='gantt-rightTable-taskNumbers' :style="{left:(72-2)*taskInfoItem.startDayIndex + 'px',width:(72 - 2)*taskInfoItem.during + 'px',backgroundColor:taskStatus[taskInfoItem.taskStatus]}" v-for='(taskInfoItem,taskInfoIndex) in personDataItem.task[index]'>
                                <div v-if="taskInfoItem.taskStatus == 'leave'" class='gantt-rightTable-taskNumber'>
                                    <span style="font-size:15px;">
                                        {{taskInfoItem.orderNum}}
                                    </span>
                                </div>
                                <div v-if="taskInfoItem.taskStatus != 'leave'" class='gantt-rightTable-taskNumber'>
                                    <el-tooltip class="item" effect="light" placement="top" >
                                        <div slot="content">
                                            <span style="font-weight:bold;font-size:15px;">单号：{{taskInfoItem.orderNum}}</span><br>
                                            <span class="tooltipSpan">主体：单子主体内容介绍</span><br>
                                            <span class="tooltipSpan">跟踪标签：策划案</span><br>
                                            <span class="tooltipSpan">优先级：中</span><br>
                                            <span class="tooltipSpan">预计工作量：{{taskInfoItem.during}}</span><br>
                                            <span class="tooltipSpan">开始日期：{{taskInfoItem.startDay}}</span><br>

                                        </div>
                                        <span>
                                            <a href="javaScript:void(0)" style="color:black;font-size:13px;">{{taskInfoItem.orderNum}}</a>
                                        </span>
                                    </el-tooltip>
                                </div>
                            </div>
                            
                            
                    </div>
                </div> 
            </div>
        </div>
    </template>

    <script>
    export default {
        props:{
            personNum:{
                type:Number
            },
            versionData:{
                type: Array,
                default: () => []
            },
            dataRange:{
                type: Array,
                default: () => []
            },
            dataInfo:{
                type: Object,
                default: () => {}
            },
            personData: {
                type: Array,
                default: []
            },
        },
        data(){
            return {
                // 任务单状态设置
                taskStatus:{
                    'new':'#5cadff',
                    'underhalf':'#f78669',
                    'overhalf':'#2d8cf0',
                    'underway':'#8a99b9',
                    'finish':'#3db898',
                    'closed':'#c5c8ce',
                    'leave':'#f7f6f3'
                },
                
                endIndex:0,//记录拖动终点

                tableMaxWidth:null,
            }
        },
        computed:{
            divHeight:function(){//没用了
                return 100+this.personNum*37 + 'px'
            },
            versionWidth:function(){//版本行宽度
                return 70*7 + 'px'
            },
            dataRangeWidth:function(){//日期行的宽度
                return 70 + 'px'
            },
            dataRangeColorList:function(){//日期行的颜色
                let colorLIst = []
                this.dataRange.map((value,key)=>{
                    if(this.dataInfo[value] == '六' || this.dataInfo[value] == '日'){
                        colorLIst.push('#e6e6e6')
                    }else{
                        colorLIst.push('#f8fafc')
                    }
                })
                return colorLIst
            },
            personColorList:function(){//人员行的颜色
                let colorLIst = []
                this.dataRange.map((value,key)=>{
                    if(this.dataInfo[value] == '六' || this.dataInfo[value] == '日'){
                        colorLIst.push('#e6e6e6')
                    }else{
                        colorLIst.push('#fff')
                    }
                })
                return colorLIst
            },
            rowWidth:function(){//行宽
                return (72 -2)*this.dataRange.length + 'px'
            },
        },
        mounted(){
            this.$nextTick(()=>{
                console.log(this.$refs)
                this.tableMaxWidth = this.$refs.rightTable.parentNode.offsetWidth -212 + 'px'
            })
        },
        directives: {
            drag: (el,binding) => {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - dragBox.offsetLeft;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;
                        console.log('拖动距离:',left,'根据拖动距离发送请求，重新调整数据');
                        console.log('拖动起点：',binding.value.taskInfoItem.startDay,binding.value.taskInfoItem.startDayIndex)
                        //移动当前元素
                        dragBox.style.left = left + "px";
                        // dragBox.style.top = top + "px";
                        binding.value.endIndex = parseInt(left/70)
                        
                    };
                    document.onmouseup = e => {
                        // console.log('结束位置：',this.endIndex)
                        //鼠标弹起来的时候不再移动
                        document.onmousemove = null;
                        //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                        document.onmouseup = null;
                        console.log(binding.value.endIndex,binding.value.dataRange.length)
                        if(binding.value.endIndex + 1 < 0){
                            alert('小于起点')
                        }else if(binding.value.endIndex + 1 > binding.value.dataRange.length){
                            alert('大于起点')
                        }
                    };
                };
            }
        }
    }
    </script>

    <style scoped>
    #rightTable{
        max-width: 1200px;
        overflow-x: auto
    }
    .setWidth{
        white-space: nowrap;
    }
    .setBodyWidth{
        white-space: nowrap;
    }
    .gantt-rightTable-version{
        background-color:#f8fafc;
        border:1px solid #f3f3f3;
        display:inline-block;
        height: 28px;
        margin-left:-1px;
        margin-right:-1px;
        /* margin-bottom:-1px; */
        text-align: center;
    }
    .gantt-rightTable-version span{
        line-height: 29px;
    }

    .gantt-rightTable-dataRange{
        background-color:#f8fafc;
        border:1px solid #f3f3f3;
        display:inline-block;
        height: 28px;
        margin-left:-1px;
        margin-right:-1px;
        /* margin-top:-1px; */
        text-align: center;
    }

    .gantt-rightTable-dataRange span{
        line-height: 30px;
    }

    .gantt-rightTable-tasks{
        display:inline-block;
        margin-left:-1px;
        margin-right:-1px;
        border-right:1px solid #f3f3f3;
        width: 69px;
        border-left:1px solid #f3f3f3;
    }

    .gantt-rightTable-taskRow{
        border:1px solid #f3f3f3;
        line-height: 34px;
        height: 34px;
        margin-left:-1px;
        position: relative;
    }

    .gantt-rightTable-taskNumbers{
        position: absolute;
        top: 0;
        text-align:center;
        border-radius:20px;
        /* cursor: move; */
    }

    .gantt-rightTable-taskNumber{
        display:inline-block;
    }

    .versionName{
        width: 115px;
        height: 18px;
        font-family: MicrosoftYaHeiUI-Bold;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
    }
    .tooltipSpan{
        margin-top:2px;
        display:inline-block;
    }
    </style>