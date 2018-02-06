
var data = [
  {name:'兰家沱港',value:[21,27]},
  {name:'朝天门客运码头',value:[13,23]},
  {name:'寸滩港',value:[93,34]},
  {name:'果园港',value:[31,76]},
  {name:'九龙坡港',value:[32,14]},
  {name:'猫儿沱港',value:[51,34]},
  {name:'东港',value:[55,63]},
  {name:'长寿化工码头',value:[12,45]},
  {name:'黄旗港',value:[122,341]},
  {name:'红溪沟码头',value:[22,43]},
  {name:'鞍子坝码头',value:[232,24]},
];

var dataColor = [
  {name:'兰家沱港',value:'rgba(73,169,238,0.75)'},
  {name:'朝天门客运码头',value:'rgba(152,216,125,0.75)'},
  {name:'寸滩港',value:'rgba(255,213,98,0.75)'},
  {name:'果园港',value:'rgba(242,123,113,0.75)'},
  {name:'九龙坡港',value:'rgba(137,150,231,0.75)'},
  {name:'猫儿沱港',value:'rgba(152,192,255,0.75)'},
  {name:'东港',value:'rgba(84,190,182,0.75)'},
  {name:'长寿化工码头',value:'rgba(47,121,155,0.75)'},
  {name:'黄旗港',value:'rgba(250,130,162,0.75)'},
  {name:'红溪沟码头',value:'rgba(143,59,229,0.75)'},
  {name:'鞍子坝码头',value:'rgba(255,102,0,0.75)'},
];


var geoCoordMap = {
    '兰家沱港':[106.221029,29.264584],
    '朝天门客运码头':[106.594154,29.569423],
    '寸滩港':[106.600445,29.62693],
    '果园港':[106.76775,29.6288],
    '九龙坡港':[106.540474,29.506796],
    '猫儿沱港':[106.398683,29.308917],
    '东港':[106.75664,29.590991],
    '长寿化工码头':[107.005532,29.825949],
    '黄旗港':[107.360409,29.743784],
    '红溪沟码头':[108.421571,30.772599],
    '鞍子坝码头':[108.392612,30.816259],
}

//获取url信息
var  GetQueryString = function(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return '';
}
var chart = echarts.init(document.getElementById('selfChartMain'));

var dataConvert = function(){
  	var data = [
          [
            107.40097045898438,
            29.716681287231072
          ],
          
        ];
	var str = '';
	for(var index=0;index<data.length;index++){
		if(index+1<data.length){
		 str += "[{coord: ["+data[index][0]+","+data[index][1]+"]},{coord: ["+data[index+1][0]+","+data[index+1][1]+"]}],";
		}
	}
	console.log(str);
}


//从数据集获取的数据模型
var exampleData = {
  time:'',
  componey:'',//单位
  assets:'',//资产 
  inCome:'',//收入
}

//整理数据集之后的结果
var resultEntry = [];



var receiveData = function(data){
  resultEntry.splice(0,resultEntry.length);
  for(var dataIndex=0;dataIndex<data.data.dsDatas.length;dataIndex++){
    if(data.data.dsDatas[dataIndex].length>=4){
      
      resultEntry.push({
        time:data.data.dsDatas[dataIndex][0],
        componey:data.data.dsDatas[dataIndex][1],
        assets:data.data.dsDatas[dataIndex][2],
        inCome:data.data.dsDatas[dataIndex][3]
      });
    }
  }
}

var convertResultToData = function(){
  data.splice(0,data.length);
  for(var resultIndex=0;resultIndex<resultEntry.length;resultIndex++){
    data.push({
      name:resultEntry[resultIndex].componey,
      value:[resultEntry[resultIndex].assets,resultEntry[resultIndex].inCome]
    });
  }
}


var getLegendData = function(){
  var legendData = [];
  for(var legendIndex=0;legendIndex<data.length;legendIndex++){
    legendData.push({
        name:data[legendIndex].name,
        icon: 'circle',
        textStyle: {
          color: '#666666',
          fontSize:14
        }
    });
  }
  return legendData;
}


var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value[0])
            });
        }
    }
    return res;
};

var convertLineData = function(){
  var lineDataResult = [];
  for(var lineDataIndex=0;lineDataIndex<lineData.length;lineDataIndex++){
    lineDataResult.push(lineData[lineDataIndex][0].coord);
  }
  return lineDataResult;
}

function itemStyle(idx) {
    return {
        normal: {
            color:'#fff',
            borderWidth:1,
            borderColor:['rgba(30,144,255,1)','lime'][idx],
            lineStyle: {
                //shadowColor : ['rgba(30,144,255,1)','lime'][idx], //默认透明
                //shadowBlur: 10,
                //shadowOffsetX: 0,
                //shadowOffsetY: 0,
                type: 'solid'
            }
        }
    }
};


var result = 
  {
        geo: {
          map: 'chongqing',
          zoom:1.2,
          left:'15%',
          label: {
              emphasis: {
                  show: false
              }
          },
          itemStyle:{
              normal:{
                areaColor:'rgba(113,183,238,0.1)',
                borderColor:'#ffffff',
              }
            },
        },
        legend: {
          type: 'plain',
          orient: 'vertical',
          right: 10,
          bottom: 10,
          zlevel:4,
          data: getLegendData()
        },
        series: [{
            type: 'map',
            map: 'chongqing',
            roam: false,
            zoom:1.2,
            left:'15%',
            data:[],
            markLine:{
              label:{
                normal:{
                   position:'middle'
                }         
              },
              symbolSize : 1,
              lineStyle:{
                normal:{
                  width:0,
                  type: 'solid',
                  color:'rgba(113,183,238,1)',
                }
                
              },
              smooth:true,
              data:lineData
            },
            itemStyle:{
              normal:{
                areaColor:'rgba(113,183,238,0.5)',
                borderColor:'#ffffff',
              },
              emphasis:{
                areaColor:'rgba(113,183,238,0.2)',
              }
            },
            label:{
                normal:{
                    show: false//隐藏名称
                }
            }
        },{
          type: 'lines',
          zlevel: 1,
          coordinateSystem:'geo',
          polyline:true,//多段线
          effect : {
                show: true,
                period: 20,
                color: '#ffffff',
                trailLength:0.5,
          },
          lineStyle: {
              normal: {
                  color: '#5fbeef',
                  width: 2,
                  curveness: 0.2
              }
          },
          data: [{
            coords:changjiangRover
          }]
        },{
          type: 'lines',
          zlevel: 1,
          coordinateSystem:'geo',
          polyline:true,//多段线
          lineStyle: {
              normal: {
                  color: '#5fbeef',
                  width: 1,
                  curveness: 0.2
              }
          },
          data: [{
            coords:jialing1
          }]
        },{
          type: 'lines',
          zlevel: 1,
          coordinateSystem:'geo',
          polyline:true,//多段线
          lineStyle: {
              normal: {
                  color: '#5fbeef',
                  width: 1,
                  curveness: 0.2
              }
          },
          data: [{
            coords:jialing2
          }]
        },{
          type: 'lines',
          zlevel: 1,
          coordinateSystem:'geo',
          polyline:true,//多段线
          lineStyle: {
              normal: {
                  color: '#5fbeef',
                  width: 1,
                  curveness: 0.2
              }
          },
          data: [{
            coords:jialing3
          }]
        },{
          type: 'lines',
          zlevel: 1,
          coordinateSystem:'geo',
          polyline:true,//多段线
          lineStyle: {
              normal: {
                  color: '#5fbeef',
                  width: 1,
                  curveness: 0.2
              }
          },
          data: [{
            coords:wujiang
          }]
        }
     ]
    };


var getMapOption = function(){
  
  for(var curIndex=0;curIndex<data.length;curIndex++){
    var curResult = {
            name: data[curIndex].name,
            type: 'effectScatter',
            zoom:1.2,
            left:'15%',
            coordinateSystem: 'geo',
            data: [{name:data[curIndex].name,value:geoCoordMap[data[curIndex].name].concat(data[curIndex].value[0])}],
            symbolSize: function (val) {
                return 17;
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: getColorByName(data[curIndex].name),
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 2,
            z:2
        }
        result.series.push(curResult);
  }
  return result;
}





var ifNameInData = function(name){
  var exit  = false;
  for(var index=0;index<data.length;index++){
    if(data[index].name === name){
      exit = true;
      break;
    }
  }
  return exit;
}

var getColorByName = function(name){
  for(var colorIndex=0;colorIndex<dataColor.length;colorIndex++){
    if(dataColor[colorIndex].name === name){
      return dataColor[colorIndex].value;
    }
  }
  return '#ff6600';
}

var getValueByName = function(name){
  var value  = [];
  for(var index1=0;index1<data.length;index1++){
    if(data[index1].name === name){
      value = data[index1].value;
      break;
    }
  }
  return value;
}


var loadChart = function(areaName){
  $.get(areaName, function (chinaJson) {
    echarts.registerMap('chongqing', chinaJson);
        var option =  getMapOption();
        chart.setOption(option); 
});
}

var dsId = GetQueryString('dsId');
var BQDataTokenID = '';
BQDataTokenID = GetQueryString('BQDataTokenID');
if(dsId!==''&&dsId!==null){
  $.ajax({
    url:'/bq_self/ds/web/data/export4out/'+BQDataTokenID+'/'+dsId,
    method:'get',
    data:'json',
    success:function(data){
      receiveData(eval('('+data+')'));
      convertResultToData();
      loadChart('web/static/js/chongqing.json');
    }

  });
}else{
  loadChart('web/static/js/chongqing.json');
}



chart.on('mouseover',function(params,e){
    var evt = e || window.event;  
    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true); 
    var left = params.event.offsetX;
    var top = params.event.offsetY;
    if(ifNameInData(params.name)){
      $('#hoverInfo').css('left',left+15+'px');
      $('#hoverInfo').css('top',top+15+'px');
      $('.hoverCircle').css('background',getColorByName(params.name));
      $('.hoverName').html(params.name);
      var value = getValueByName(params.name);
      $('.inCome').html(value[1]);
      $('.assets').html(value[0]);
      $('#hoverInfo').removeClass('hidden');
    }else{
      $('#hoverInfo').addClass('hidden');
    }

});






 window.onresize = function(){
    var winHeight = document.documentElement.clientHeight;
    var winWidth = document.documentElement.clientWidth;
    document.getElementById('selfChartMain').style.width = winWidth;
    document.getElementById('selfChartMain').style.height = winHeight;
    chart.resize();
 };