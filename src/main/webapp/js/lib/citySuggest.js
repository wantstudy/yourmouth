(function () {
    var city = [
        {
            "id": "1001",
            "name": "北京市",
            "enname": "beijingshi",
            "parentId": 1,
            "schoolNum": 84
        },
        {
            "id": "2001",
            "name": "天津市",
            "enname": "tianjinshi",
            "parentId": 2,
            "schoolNum": 46
        },
        {
            "id": "3001",
            "name": "保定市",
            "enname": "baodingshi",
            "parentId": 3,
            "schoolNum": 12
        },
        {
            "id": "3002",
            "name": "邯郸市",
            "enname": "handanshi",
            "parentId": 3,
            "schoolNum": 4
        },
        {
            "id": "3003",
            "name": "唐山市",
            "enname": "tangshanshi",
            "parentId": 3,
            "schoolNum": 7
        },
        {
            "id": "3004",
            "name": "石家庄市",
            "enname": "shijiazhuangshi",
            "parentId": 3,
            "schoolNum": 38
        },
        {
            "id": "3005",
            "name": "秦皇岛市",
            "enname": "qinhuangdaoshi",
            "parentId": 3,
            "schoolNum": 5
        },
        {
            "id": "3006",
            "name": "廊坊市",
            "enname": "langfangshi",
            "parentId": 3,
            "schoolNum": 8
        },
        {
            "id": "3007",
            "name": "三河市",
            "enname": "sanheshi",
            "parentId": 3,
            "schoolNum": 3
        },
        {
            "id": "3008",
            "name": "张家口市",
            "enname": "zhangjiakoushi",
            "parentId": 3,
            "schoolNum": 5
        },
        {
            "id": "3009",
            "name": "承德市",
            "enname": "chengdeshi",
            "parentId": 3,
            "schoolNum": 5
        },
        {
            "id": "3010",
            "name": "衡水市",
            "enname": "hengshuishi",
            "parentId": 3,
            "schoolNum": 2
        },
        {
            "id": "3011",
            "name": "邢台市",
            "enname": "xingtaishi",
            "parentId": 3,
            "schoolNum": 4
        },
        {
            "id": "3012",
            "name": "沧州市",
            "enname": "cangzhoushi",
            "parentId": 3,
            "schoolNum": 7
        },
        {
            "id": "4001",
            "name": "太原市",
            "enname": "taiyuanshi",
            "parentId": 4,
            "schoolNum": 39
        },
        {
            "id": "4002",
            "name": "晋中市",
            "enname": "jinzhongshi",
            "parentId": 4,
            "schoolNum": 5
        },
        {
            "id": "4003",
            "name": "临汾市",
            "enname": "linfenshi",
            "parentId": 4,
            "schoolNum": 4
        },
        {
            "id": "4004",
            "name": "大同市",
            "enname": "datongshi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4005",
            "name": "长治市",
            "enname": "changzhishi",
            "parentId": 4,
            "schoolNum": 5
        },
        {
            "id": "4006",
            "name": "运城市",
            "enname": "yunchengshi",
            "parentId": 4,
            "schoolNum": 7
        },
        {
            "id": "4007",
            "name": "忻州市",
            "enname": "xinzhoushi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4008",
            "name": "吕梁市",
            "enname": "lvliangshi",
            "parentId": 4,
            "schoolNum": 1
        },
        {
            "id": "4009",
            "name": "阳泉市",
            "enname": "yangquanshi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4010",
            "name": "朔州市",
            "enname": "shuozhoushi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4011",
            "name": "晋城市",
            "enname": "jinchengshi",
            "parentId": 4,
            "schoolNum": 1
        },
        {
            "id": "5001",
            "name": "呼和浩特市",
            "enname": "huhehaoteshi",
            "parentId": 5,
            "schoolNum": 21
        },
        {
            "id": "5002",
            "name": "包头市",
            "enname": "baotoushi",
            "parentId": 5,
            "schoolNum": 5
        },
        {
            "id": "5003",
            "name": "通辽市",
            "enname": "tongliaoshi",
            "parentId": 5,
            "schoolNum": 3
        },
        {
            "id": "5004",
            "name": "赤峰市",
            "enname": "chifengshi",
            "parentId": 5,
            "schoolNum": 4
        },
        {
            "id": "5005",
            "name": "呼伦贝尔市",
            "enname": "hulunbeiershi",
            "parentId": 5,
            "schoolNum": 3
        },
        {
            "id": "5006",
            "name": "乌兰察布市",
            "enname": "wulanchabushi",
            "parentId": 5,
            "schoolNum": 3
        },
        {
            "id": "5007",
            "name": "巴彦淖尔市",
            "enname": "bayannaoershi",
            "parentId": 5,
            "schoolNum": 2
        },
        {
            "id": "5008",
            "name": "鄂尔多斯市",
            "enname": "eerduosishi",
            "parentId": 5,
            "schoolNum": 2
        },
        {
            "id": "5009",
            "name": "阿拉善盟",
            "enname": "alashanmeng",
            "parentId": 5,
            "schoolNum": 1
        },
        {
            "id": "5010",
            "name": "兴安盟",
            "enname": "xinganmeng",
            "parentId": 5,
            "schoolNum": 1
        },
        {
            "id": "5011",
            "name": "锡林郭勒盟",
            "enname": "xilinguolemeng",
            "parentId": 5,
            "schoolNum": 1
        },
        {
            "id": "5012",
            "name": "乌海市",
            "enname": "wuhaishi",
            "parentId": 5,
            "schoolNum": 1
        },
        {
            "id": "6001",
            "name": "大连市",
            "enname": "dalianshi",
            "parentId": 6,
            "schoolNum": 27
        },
        {
            "id": "6002",
            "name": "沈阳市",
            "enname": "shenyangshi",
            "parentId": 6,
            "schoolNum": 41
        },
        {
            "id": "6003",
            "name": "鞍山市",
            "enname": "anshanshi",
            "parentId": 6,
            "schoolNum": 2
        },
        {
            "id": "6004",
            "name": "阜新市",
            "enname": "fuxinshi",
            "parentId": 6,
            "schoolNum": 2
        },
        {
            "id": "6005",
            "name": "抚顺市",
            "enname": "fushunshi",
            "parentId": 6,
            "schoolNum": 3
        },
        {
            "id": "6006",
            "name": "锦州市",
            "enname": "jinzhoushi",
            "parentId": 6,
            "schoolNum": 7
        },
        {
            "id": "6007",
            "name": "本溪市",
            "enname": "benxishi",
            "parentId": 6,
            "schoolNum": 2
        },
        {
            "id": "6008",
            "name": "丹东市",
            "enname": "dandongshi",
            "parentId": 6,
            "schoolNum": 3
        },
        {
            "id": "6009",
            "name": "葫芦岛市",
            "enname": "huludaoshi",
            "parentId": 6,
            "schoolNum": 2
        },
        {
            "id": "6010",
            "name": "营口市",
            "enname": "yingkoushi",
            "parentId": 6,
            "schoolNum": 3
        },
        {
            "id": "6011",
            "name": "朝阳市",
            "enname": "zhaoyangshi",
            "parentId": 6,
            "schoolNum": 1
        },
        {
            "id": "6012",
            "name": "铁岭市",
            "enname": "tielingshi",
            "parentId": 6,
            "schoolNum": 4
        },
        {
            "id": "6013",
            "name": "盘锦市",
            "enname": "panjinshi",
            "parentId": 6,
            "schoolNum": 2
        },
        {
            "id": "6014",
            "name": "辽阳市",
            "enname": "liaoyangshi",
            "parentId": 6,
            "schoolNum": 3
        },
        {
            "id": "7001",
            "name": "长春市",
            "enname": "changchunshi",
            "parentId": 7,
            "schoolNum": 31
        },
        {
            "id": "7002",
            "name": "延吉市",
            "enname": "yanjishi",
            "parentId": 7,
            "schoolNum": 2
        },
        {
            "id": "7003",
            "name": "吉林市",
            "enname": "jilinshi",
            "parentId": 7,
            "schoolNum": 8
        },
        {
            "id": "7004",
            "name": "四平市",
            "enname": "sipingshi",
            "parentId": 7,
            "schoolNum": 3
        },
        {
            "id": "7005",
            "name": "通化市",
            "enname": "tonghuashi",
            "parentId": 7,
            "schoolNum": 1
        },
        {
            "id": "7006",
            "name": "白城市",
            "enname": "baichengshi",
            "parentId": 7,
            "schoolNum": 3
        },
        {
            "id": "7007",
            "name": "辽源市",
            "enname": "liaoyuanshi",
            "parentId": 7,
            "schoolNum": 1
        },
        {
            "id": "7008",
            "name": "白山市",
            "enname": "baishanshi",
            "parentId": 7,
            "schoolNum": 1
        },
        {
            "id": "7009",
            "name": "松原市",
            "enname": "songyuanshi",
            "parentId": 7,
            "schoolNum": 1
        },
        {
            "id": "8001",
            "name": "哈尔滨市",
            "enname": "haerbinshi",
            "parentId": 8,
            "schoolNum": 48
        },
        {
            "id": "8002",
            "name": "大庆市",
            "enname": "daqingshi",
            "parentId": 8,
            "schoolNum": 5
        },
        {
            "id": "8003",
            "name": "佳木斯市",
            "enname": "jiamusishi",
            "parentId": 8,
            "schoolNum": 2
        },
        {
            "id": "8004",
            "name": "齐齐哈尔市",
            "enname": "qiqihaershi",
            "parentId": 8,
            "schoolNum": 6
        },
        {
            "id": "8005",
            "name": "牡丹江市",
            "enname": "mudanjiangshi",
            "parentId": 8,
            "schoolNum": 8
        },
        {
            "id": "8006",
            "name": "绥化市",
            "enname": "suihuashi",
            "parentId": 8,
            "schoolNum": 2
        },
        {
            "id": "8007",
            "name": "鸡西市",
            "enname": "jixishi",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "8008",
            "name": "黑河市",
            "enname": "heiheshi",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "8009",
            "name": "鹤岗市",
            "enname": "hegangshi",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "8010",
            "name": "伊春市",
            "enname": "yichunshi",
            "parentId": 8,
            "schoolNum": 4
        },
        {
            "id": "8011",
            "name": "大兴安岭地区",
            "enname": "daxinganlingdiqu",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "8012",
            "name": "双鸭山市",
            "enname": "shuangyashanshi",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "8013",
            "name": "七台河市",
            "enname": "qitaiheshi",
            "parentId": 8,
            "schoolNum": 1
        },
        {
            "id": "9001",
            "name": "上海市",
            "enname": "shanghaishi",
            "parentId": 9,
            "schoolNum": 65
        },
        {
            "id": "10001",
            "name": "南京市",
            "enname": "nanjingshi",
            "parentId": 10,
            "schoolNum": 44
        },
        {
            "id": "10002",
            "name": "徐州市",
            "enname": "xuzhoushi",
            "parentId": 10,
            "schoolNum": 9
        },
        {
            "id": "10003",
            "name": "无锡市",
            "enname": "wuxishi",
            "parentId": 10,
            "schoolNum": 12
        },
        {
            "id": "10004",
            "name": "苏州市",
            "enname": "suzhoushi",
            "parentId": 10,
            "schoolNum": 22
        },
        {
            "id": "10005",
            "name": "镇江市",
            "enname": "zhenjiangshi",
            "parentId": 10,
            "schoolNum": 5
        },
        {
            "id": "10006",
            "name": "常州市",
            "enname": "changzhoushi",
            "parentId": 10,
            "schoolNum": 9
        },
        {
            "id": "10007",
            "name": "南通市",
            "enname": "nantongshi",
            "parentId": 10,
            "schoolNum": 7
        },
        {
            "id": "10008",
            "name": "扬州市",
            "enname": "yangzhoushi",
            "parentId": 10,
            "schoolNum": 5
        },
        {
            "id": "10009",
            "name": "盐城市",
            "enname": "yanchengshi",
            "parentId": 10,
            "schoolNum": 6
        },
        {
            "id": "10010",
            "name": "淮安市",
            "enname": "huaianshi",
            "parentId": 10,
            "schoolNum": 5
        },
        {
            "id": "10011",
            "name": "连云港市",
            "enname": "lianyungangshi",
            "parentId": 10,
            "schoolNum": 3
        },
        {
            "id": "10012",
            "name": "泰州市",
            "enname": "taizhoushi",
            "parentId": 10,
            "schoolNum": 5
        },
        {
            "id": "10013",
            "name": "宿迁市",
            "enname": "suqianshi",
            "parentId": 10,
            "schoolNum": 2
        },
        {
            "id": "11001",
            "name": "杭州市",
            "enname": "hangzhoushi",
            "parentId": 11,
            "schoolNum": 36
        },
        {
            "id": "11002",
            "name": "温州市",
            "enname": "wenzhoushi",
            "parentId": 11,
            "schoolNum": 6
        },
        {
            "id": "11003",
            "name": "金华市",
            "enname": "jinhuashi",
            "parentId": 11,
            "schoolNum": 5
        },
        {
            "id": "11004",
            "name": "宁波市",
            "enname": "ningboshi",
            "parentId": 11,
            "schoolNum": 12
        },
        {
            "id": "11005",
            "name": "舟山市",
            "enname": "zhoushanshi",
            "parentId": 11,
            "schoolNum": 2
        },
        {
            "id": "11006",
            "name": "湖州市",
            "enname": "huzhoushi",
            "parentId": 11,
            "schoolNum": 2
        },
        {
            "id": "11007",
            "name": "绍兴市",
            "enname": "shaoxingshi",
            "parentId": 11,
            "schoolNum": 6
        },
        {
            "id": "11008",
            "name": "丽水市",
            "enname": "lishuishi",
            "parentId": 11,
            "schoolNum": 2
        },
        {
            "id": "11009",
            "name": "嘉兴市",
            "enname": "jiaxingshi",
            "parentId": 11,
            "schoolNum": 3
        },
        {
            "id": "11010",
            "name": "衢州市",
            "enname": "quzhoushi",
            "parentId": 11,
            "schoolNum": 2
        },
        {
            "id": "12001",
            "name": "合肥市",
            "enname": "hefeishi",
            "parentId": 12,
            "schoolNum": 50
        },
        {
            "id": "12002",
            "name": "马鞍山市",
            "enname": "maanshanshi",
            "parentId": 12,
            "schoolNum": 4
        },
        {
            "id": "12003",
            "name": "淮南市",
            "enname": "huainanshi",
            "parentId": 12,
            "schoolNum": 5
        },
        {
            "id": "12004",
            "name": "芜湖市",
            "enname": "wuhushi",
            "parentId": 12,
            "schoolNum": 8
        },
        {
            "id": "12005",
            "name": "淮北市",
            "enname": "huaibeishi",
            "parentId": 12,
            "schoolNum": 3
        },
        {
            "id": "12006",
            "name": "蚌埠市",
            "enname": "bengbushi",
            "parentId": 12,
            "schoolNum": 5
        },
        {
            "id": "12007",
            "name": "阜阳市",
            "enname": "fuyangshi",
            "parentId": 12,
            "schoolNum": 4
        },
        {
            "id": "12008",
            "name": "安庆市",
            "enname": "anqingshi",
            "parentId": 12,
            "schoolNum": 5
        },
        {
            "id": "12009",
            "name": "黄山市",
            "enname": "huangshanshi",
            "parentId": 12,
            "schoolNum": 2
        },
        {
            "id": "12010",
            "name": "六安市",
            "enname": "liuanshi",
            "parentId": 12,
            "schoolNum": 5
        },
        {
            "id": "12011",
            "name": "滁州市",
            "enname": "chuzhoushi",
            "parentId": 12,
            "schoolNum": 4
        },
        {
            "id": "12012",
            "name": "铜陵市",
            "enname": "tonglingshi",
            "parentId": 12,
            "schoolNum": 3
        },
        {
            "id": "12013",
            "name": "池州市",
            "enname": "chizhoushi",
            "parentId": 12,
            "schoolNum": 3
        },
        {
            "id": "12014",
            "name": "亳州市",
            "enname": "bozhoushi",
            "parentId": 12,
            "schoolNum": 2
        },
        {
            "id": "12015",
            "name": "宣城市",
            "enname": "xuanchengshi",
            "parentId": 12,
            "schoolNum": 1
        },
        {
            "id": "13001",
            "name": "厦门市",
            "enname": "shamenshi",
            "parentId": 13,
            "schoolNum": 14
        },
        {
            "id": "13002",
            "name": "泉州市",
            "enname": "quanzhoushi",
            "parentId": 13,
            "schoolNum": 16
        },
        {
            "id": "13003",
            "name": "福州市",
            "enname": "fuzhoushi",
            "parentId": 13,
            "schoolNum": 31
        },
        {
            "id": "13004",
            "name": "漳州市",
            "enname": "zhangzhoushi",
            "parentId": 13,
            "schoolNum": 6
        },
        {
            "id": "13005",
            "name": "南平市",
            "enname": "nanpingshi",
            "parentId": 13,
            "schoolNum": 4
        },
        {
            "id": "13006",
            "name": "宁德市",
            "enname": "ningdeshi",
            "parentId": 13,
            "schoolNum": 2
        },
        {
            "id": "13007",
            "name": "三明市",
            "enname": "sanmingshi",
            "parentId": 13,
            "schoolNum": 3
        },
        {
            "id": "13008",
            "name": "龙岩市",
            "enname": "longyanshi",
            "parentId": 13,
            "schoolNum": 2
        },
        {
            "id": "13009",
            "name": "莆田市",
            "enname": "putianshi",
            "parentId": 13,
            "schoolNum": 2
        },
        {
            "id": "14001",
            "name": "南昌市",
            "enname": "nanchangshi",
            "parentId": 14,
            "schoolNum": 44
        },
        {
            "id": "14002",
            "name": "赣州市",
            "enname": "ganzhoushi",
            "parentId": 14,
            "schoolNum": 6
        },
        {
            "id": "14003",
            "name": "吉安市",
            "enname": "jianshi",
            "parentId": 14,
            "schoolNum": 1
        },
        {
            "id": "14004",
            "name": "景德镇市",
            "enname": "jingdezhenshi",
            "parentId": 14,
            "schoolNum": 4
        },
        {
            "id": "14005",
            "name": "上饶市",
            "enname": "shangraoshi",
            "parentId": 14,
            "schoolNum": 3
        },
        {
            "id": "14006",
            "name": "萍乡市",
            "enname": "pingxiangshi",
            "parentId": 14,
            "schoolNum": 3
        },
        {
            "id": "14007",
            "name": "新余市",
            "enname": "xinyushi",
            "parentId": 14,
            "schoolNum": 5
        },
        {
            "id": "14008",
            "name": "九江市",
            "enname": "jiujiangshi",
            "parentId": 14,
            "schoolNum": 6
        },
        {
            "id": "14009",
            "name": "鹰潭市",
            "enname": "yingtanshi",
            "parentId": 14,
            "schoolNum": 1
        },
        {
            "id": "15001",
            "name": "济南市",
            "enname": "jinanshi",
            "parentId": 15,
            "schoolNum": 39
        },
        {
            "id": "15002",
            "name": "青岛市",
            "enname": "qingdaoshi",
            "parentId": 15,
            "schoolNum": 17
        },
        {
            "id": "15003",
            "name": "淄博市",
            "enname": "ziboshi",
            "parentId": 15,
            "schoolNum": 8
        },
        {
            "id": "15004",
            "name": "泰安市",
            "enname": "taianshi",
            "parentId": 15,
            "schoolNum": 6
        },
        {
            "id": "15005",
            "name": "济宁市",
            "enname": "jiningshi",
            "parentId": 15,
            "schoolNum": 6
        },
        {
            "id": "15006",
            "name": "聊城市",
            "enname": "liaochengshi",
            "parentId": 15,
            "schoolNum": 2
        },
        {
            "id": "15007",
            "name": "烟台市",
            "enname": "yantaishi",
            "parentId": 15,
            "schoolNum": 10
        },
        {
            "id": "15008",
            "name": "临沂市",
            "enname": "linyishi",
            "parentId": 15,
            "schoolNum": 3
        },
        {
            "id": "15009",
            "name": "潍坊市",
            "enname": "weifangshi",
            "parentId": 15,
            "schoolNum": 13
        },
        {
            "id": "15010",
            "name": "滨州市",
            "enname": "binzhoushi",
            "parentId": 15,
            "schoolNum": 3
        },
        {
            "id": "15011",
            "name": "德州市",
            "enname": "dezhoushi",
            "parentId": 15,
            "schoolNum": 4
        },
        {
            "id": "15012",
            "name": "菏泽市",
            "enname": "hezeshi",
            "parentId": 15,
            "schoolNum": 4
        },
        {
            "id": "15013",
            "name": "枣庄市",
            "enname": "zaozhuangshi",
            "parentId": 15,
            "schoolNum": 3
        },
        {
            "id": "15014",
            "name": "日照市",
            "enname": "rizhaoshi",
            "parentId": 15,
            "schoolNum": 3
        },
        {
            "id": "15015",
            "name": "威海市",
            "enname": "weihaishi",
            "parentId": 15,
            "schoolNum": 2
        },
        {
            "id": "15016",
            "name": "莱芜市",
            "enname": "laiwushi",
            "parentId": 15,
            "schoolNum": 1
        },
        {
            "id": "15017",
            "name": "东营市",
            "enname": "dongyingshi",
            "parentId": 15,
            "schoolNum": 3
        },
        {
            "id": "16001",
            "name": "郑州市",
            "enname": "zhengzhoushi",
            "parentId": 16,
            "schoolNum": 54
        },
        {
            "id": "16002",
            "name": "焦作市",
            "enname": "jiaozuoshi",
            "parentId": 16,
            "schoolNum": 5
        },
        {
            "id": "16003",
            "name": "洛阳市",
            "enname": "luoyangshi",
            "parentId": 16,
            "schoolNum": 7
        },
        {
            "id": "16004",
            "name": "开封市",
            "enname": "kaifengshi",
            "parentId": 16,
            "schoolNum": 4
        },
        {
            "id": "16005",
            "name": "新乡市",
            "enname": "xinxiangshi",
            "parentId": 16,
            "schoolNum": 7
        },
        {
            "id": "16006",
            "name": "信阳市",
            "enname": "xinyangshi",
            "parentId": 16,
            "schoolNum": 4
        },
        {
            "id": "16007",
            "name": "周口市",
            "enname": "zhoukoushi",
            "parentId": 16,
            "schoolNum": 3
        },
        {
            "id": "16008",
            "name": "安阳市",
            "enname": "anyangshi",
            "parentId": 16,
            "schoolNum": 5
        },
        {
            "id": "16009",
            "name": "许昌市",
            "enname": "xuchangshi",
            "parentId": 16,
            "schoolNum": 4
        },
        {
            "id": "16010",
            "name": "南阳市",
            "enname": "nanyangshi",
            "parentId": 16,
            "schoolNum": 6
        },
        {
            "id": "16011",
            "name": "商丘市",
            "enname": "shangqiushi",
            "parentId": 16,
            "schoolNum": 6
        },
        {
            "id": "16012",
            "name": "驻马店市",
            "enname": "zhumadianshi",
            "parentId": 16,
            "schoolNum": 2
        },
        {
            "id": "16013",
            "name": "平顶山市",
            "enname": "pingdingshanshi",
            "parentId": 16,
            "schoolNum": 4
        },
        {
            "id": "16014",
            "name": "漯河市",
            "enname": "luoheshi",
            "parentId": 16,
            "schoolNum": 3
        },
        {
            "id": "16015",
            "name": "三门峡市",
            "enname": "sanmenxiashi",
            "parentId": 16,
            "schoolNum": 1
        },
        {
            "id": "16016",
            "name": "鹤壁市",
            "enname": "hebishi",
            "parentId": 16,
            "schoolNum": 2
        },
        {
            "id": "16017",
            "name": "濮阳市",
            "enname": "puyangshi",
            "parentId": 16,
            "schoolNum": 1
        },
        {
            "id": "16018",
            "name": "济源市",
            "enname": "jiyuanshi",
            "parentId": 16,
            "schoolNum": 1
        },
        {
            "id": "17001",
            "name": "武汉市",
            "enname": "wuhanshi",
            "parentId": 17,
            "schoolNum": 62
        },
        {
            "id": "17002",
            "name": "荆州市",
            "enname": "jingzhoushi",
            "parentId": 17,
            "schoolNum": 5
        },
        {
            "id": "17003",
            "name": "宜昌市",
            "enname": "yichangshi",
            "parentId": 17,
            "schoolNum": 4
        },
        {
            "id": "17004",
            "name": "黄石市",
            "enname": "huangshishi",
            "parentId": 17,
            "schoolNum": 3
        },
        {
            "id": "17005",
            "name": "黄冈市",
            "enname": "huanggangshi",
            "parentId": 17,
            "schoolNum": 3
        },
        {
            "id": "17006",
            "name": "恩施市",
            "enname": "enshishi",
            "parentId": 17,
            "schoolNum": 2
        },
        {
            "id": "17007",
            "name": "襄阳市",
            "enname": "xiangyangshi",
            "parentId": 17,
            "schoolNum": 3
        },
        {
            "id": "17008",
            "name": "十堰市",
            "enname": "shiyanshi",
            "parentId": 17,
            "schoolNum": 4
        },
        {
            "id": "17009",
            "name": "孝感市",
            "enname": "xiaoganshi",
            "parentId": 17,
            "schoolNum": 2
        },
        {
            "id": "17010",
            "name": "咸宁市",
            "enname": "xianningshi",
            "parentId": 17,
            "schoolNum": 2
        },
        {
            "id": "17011",
            "name": "荆门市",
            "enname": "jingmenshi",
            "parentId": 17,
            "schoolNum": 1
        },
        {
            "id": "17012",
            "name": "鄂州市",
            "enname": "ezhoushi",
            "parentId": 17,
            "schoolNum": 2
        },
        {
            "id": "17013",
            "name": "天门市",
            "enname": "tianmenshi",
            "parentId": 17,
            "schoolNum": 1
        },
        {
            "id": "17014",
            "name": "仙桃市",
            "enname": "xiantaoshi",
            "parentId": 17,
            "schoolNum": 1
        },
        {
            "id": "17015",
            "name": "随州市",
            "enname": "suizhoushi",
            "parentId": 17,
            "schoolNum": 1
        },
        {
            "id": "17016",
            "name": "潜江市",
            "enname": "qianjiangshi",
            "parentId": 17,
            "schoolNum": 1
        },
        {
            "id": "18001",
            "name": "长沙市",
            "enname": "changshashi",
            "parentId": 18,
            "schoolNum": 47
        },
        {
            "id": "18002",
            "name": "湘潭市",
            "enname": "xiangtanshi",
            "parentId": 18,
            "schoolNum": 11
        },
        {
            "id": "18003",
            "name": "吉首市",
            "enname": "jishoushi",
            "parentId": 18,
            "schoolNum": 2
        },
        {
            "id": "18004",
            "name": "衡阳市",
            "enname": "hengyangshi",
            "parentId": 18,
            "schoolNum": 9
        },
        {
            "id": "18005",
            "name": "株洲市",
            "enname": "zhuzhoushi",
            "parentId": 18,
            "schoolNum": 10
        },
        {
            "id": "18006",
            "name": "岳阳市",
            "enname": "yueyangshi",
            "parentId": 18,
            "schoolNum": 4
        },
        {
            "id": "18007",
            "name": "郴州市",
            "enname": "chenzhoushi",
            "parentId": 18,
            "schoolNum": 2
        },
        {
            "id": "18008",
            "name": "邵阳市",
            "enname": "shaoyangshi",
            "parentId": 18,
            "schoolNum": 3
        },
        {
            "id": "18009",
            "name": "怀化市",
            "enname": "huaihuashi",
            "parentId": 18,
            "schoolNum": 3
        },
        {
            "id": "18010",
            "name": "常德市",
            "enname": "changdeshi",
            "parentId": 18,
            "schoolNum": 5
        },
        {
            "id": "18011",
            "name": "永州市",
            "enname": "yongzhoushi",
            "parentId": 18,
            "schoolNum": 3
        },
        {
            "id": "18012",
            "name": "娄底市",
            "enname": "loudishi",
            "parentId": 18,
            "schoolNum": 3
        },
        {
            "id": "18013",
            "name": "益阳市",
            "enname": "yiyangshi",
            "parentId": 18,
            "schoolNum": 4
        },
        {
            "id": "18014",
            "name": "张家界市",
            "enname": "zhangjiajieshi",
            "parentId": 18,
            "schoolNum": 1
        },
        {
            "id": "19001",
            "name": "广州市",
            "enname": "guangzhoushi",
            "parentId": 19,
            "schoolNum": 70
        },
        {
            "id": "19002",
            "name": "汕头市",
            "enname": "shantoushi",
            "parentId": 19,
            "schoolNum": 2
        },
        {
            "id": "19003",
            "name": "湛江市",
            "enname": "zhanjiangshi",
            "parentId": 19,
            "schoolNum": 4
        },
        {
            "id": "19004",
            "name": "深圳市",
            "enname": "shenzhenshi",
            "parentId": 19,
            "schoolNum": 5
        },
        {
            "id": "19005",
            "name": "江门市",
            "enname": "jiangmenshi",
            "parentId": 19,
            "schoolNum": 3
        },
        {
            "id": "20001",
            "enname": "",
            "parentId": 20,
            "schoolNum": 1
        },
        {
            "id": "19006",
            "name": "韶关市",
            "enname": "shaoguanshi",
            "parentId": 19,
            "schoolNum": 2
        },
        {
            "id": "19007",
            "name": "惠州市",
            "enname": "huizhoushi",
            "parentId": 19,
            "schoolNum": 3
        },
        {
            "id": "19008",
            "name": "潮州市",
            "enname": "chaozhoushi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19009",
            "name": "肇庆市",
            "enname": "zhaoqingshi",
            "parentId": 19,
            "schoolNum": 5
        },
        {
            "id": "19010",
            "name": "梅州市",
            "enname": "meizhoushi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19011",
            "name": "茂名市",
            "enname": "maomingshi",
            "parentId": 19,
            "schoolNum": 2
        },
        {
            "id": "19012",
            "name": "东莞市",
            "enname": "dongguanshi",
            "parentId": 19,
            "schoolNum": 5
        },
        {
            "id": "19013",
            "name": "佛山市",
            "enname": "foshanshi",
            "parentId": 19,
            "schoolNum": 6
        },
        {
            "id": "19014",
            "name": "揭阳市",
            "enname": "jieyangshi",
            "parentId": 19,
            "schoolNum": 2
        },
        {
            "id": "19015",
            "name": "中山市",
            "enname": "zhongshanshi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19016",
            "name": "珠海市",
            "enname": "zhuhaishi",
            "parentId": 19,
            "schoolNum": 2
        },
        {
            "id": "19017",
            "name": "汕尾市",
            "enname": "shanweishi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19018",
            "name": "云浮市",
            "enname": "yunfushi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19019",
            "name": "阳江市",
            "enname": "yangjiangshi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19020",
            "name": "河源市",
            "enname": "heyuanshi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "19021",
            "name": "清远市",
            "enname": "qingyuanshi",
            "parentId": 19,
            "schoolNum": 1
        },
        {
            "id": "21001",
            "name": "南宁市",
            "enname": "nanningshi",
            "parentId": 21,
            "schoolNum": 27
        },
        {
            "id": "21002",
            "name": "柳州市",
            "enname": "liuzhoushi",
            "parentId": 21,
            "schoolNum": 6
        },
        {
            "id": "21003",
            "name": "桂林市",
            "enname": "guilinshi",
            "parentId": 21,
            "schoolNum": 8
        },
        {
            "id": "21004",
            "name": "百色市",
            "enname": "baiseshi",
            "parentId": 21,
            "schoolNum": 5
        },
        {
            "id": "21005",
            "name": "崇左市",
            "enname": "chongzuoshi",
            "parentId": 21,
            "schoolNum": 4
        },
        {
            "id": "21006",
            "name": "河池市",
            "enname": "hechishi",
            "parentId": 21,
            "schoolNum": 2
        },
        {
            "id": "21007",
            "name": "玉林市",
            "enname": "yulinshi",
            "parentId": 21,
            "schoolNum": 3
        },
        {
            "id": "21008",
            "name": "钦州市",
            "enname": "qinzhoushi",
            "parentId": 21,
            "schoolNum": 2
        },
        {
            "id": "21009",
            "name": "贺州市",
            "enname": "hezhoushi",
            "parentId": 21,
            "schoolNum": 1
        },
        {
            "id": "21010",
            "name": "梧州市",
            "enname": "wuzhoushi",
            "parentId": 21,
            "schoolNum": 2
        },
        {
            "id": "21011",
            "name": "贵港市",
            "enname": "guigangshi",
            "parentId": 21,
            "schoolNum": 1
        },
        {
            "id": "21012",
            "name": "北海市",
            "enname": "beihaishi",
            "parentId": 21,
            "schoolNum": 2
        },
        {
            "id": "22001",
            "name": "海口市",
            "enname": "haikoushi",
            "parentId": 22,
            "schoolNum": 10
        },
        {
            "id": "22002",
            "name": "五指山市",
            "enname": "wuzhishanshi",
            "parentId": 22,
            "schoolNum": 1
        },
        {
            "id": "22003",
            "name": "三亚市",
            "enname": "sanyashi",
            "parentId": 22,
            "schoolNum": 4
        },
        {
            "id": "22004",
            "name": "琼海市",
            "enname": "qionghaishi",
            "parentId": 22,
            "schoolNum": 1
        },
        {
            "id": "22005",
            "name": "文昌市",
            "enname": "wenchangshi",
            "parentId": 22,
            "schoolNum": 1
        },
        {
            "id": "23001",
            "name": "重庆市",
            "enname": "zhongqingshi",
            "parentId": 23,
            "schoolNum": 57
        },
        {
            "id": "24001",
            "name": "成都市",
            "enname": "chengdushi",
            "parentId": 24,
            "schoolNum": 47
        },
        {
            "id": "24002",
            "name": "绵阳市",
            "enname": "mianyangshi",
            "parentId": 24,
            "schoolNum": 7
        },
        {
            "id": "24003",
            "name": "雅安市",
            "enname": "yaanshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24004",
            "name": "南充市",
            "enname": "nanchongshi",
            "parentId": 24,
            "schoolNum": 4
        },
        {
            "id": "24005",
            "name": "广汉市",
            "enname": "guanghanshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24006",
            "name": "自贡市",
            "enname": "zigongshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24007",
            "name": "西昌市",
            "enname": "xichangshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24008",
            "name": "泸州市",
            "enname": "luzhoushi",
            "parentId": 24,
            "schoolNum": 4
        },
        {
            "id": "24009",
            "name": "内江市",
            "enname": "neijiangshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24010",
            "name": "宜宾市",
            "enname": "yibinshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24011",
            "name": "达州市",
            "enname": "dazhoushi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24012",
            "name": "乐山市",
            "enname": "leshanshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24013",
            "name": "攀枝花市",
            "enname": "panzhihuashi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24014",
            "name": "甘孜州",
            "enname": "ganzizhou",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24015",
            "name": "汶川县",
            "enname": "wenchuanxian",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24016",
            "name": "广元市",
            "enname": "guangyuanshi",
            "parentId": 24,
            "schoolNum": 2
        },
        {
            "id": "24017",
            "name": "德阳市",
            "enname": "deyangshi",
            "parentId": 24,
            "schoolNum": 4
        },
        {
            "id": "24018",
            "name": "巴中市",
            "enname": "bazhongshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24019",
            "name": "资阳市",
            "enname": "ziyangshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24020",
            "name": "眉山市",
            "enname": "meishanshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24021",
            "name": "遂宁市",
            "enname": "suiningshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "24022",
            "name": "广安市",
            "enname": "guanganshi",
            "parentId": 24,
            "schoolNum": 1
        },
        {
            "id": "25001",
            "name": "贵阳市",
            "enname": "guiyangshi",
            "parentId": 25,
            "schoolNum": 21
        },
        {
            "id": "25002",
            "name": "遵义市",
            "enname": "zunyishi",
            "parentId": 25,
            "schoolNum": 5
        },
        {
            "id": "25003",
            "name": "铜仁市",
            "enname": "tongrenshi",
            "parentId": 25,
            "schoolNum": 3
        },
        {
            "id": "25004",
            "name": "兴义市",
            "enname": "xingyishi",
            "parentId": 25,
            "schoolNum": 2
        },
        {
            "id": "25005",
            "name": "安顺市",
            "enname": "anshunshi",
            "parentId": 25,
            "schoolNum": 2
        },
        {
            "id": "25006",
            "name": "毕节市",
            "enname": "bijieshi",
            "parentId": 25,
            "schoolNum": 2
        },
        {
            "id": "25007",
            "name": "凯里市",
            "enname": "kailishi",
            "parentId": 25,
            "schoolNum": 3
        },
        {
            "id": "25008",
            "name": "都匀市",
            "enname": "duyunshi",
            "parentId": 25,
            "schoolNum": 3
        },
        {
            "id": "25009",
            "name": "六盘水市",
            "enname": "liupanshuishi",
            "parentId": 25,
            "schoolNum": 2
        },
        {
            "id": "25010",
            "name": "黔南州",
            "enname": "qiannanzhou",
            "parentId": 25,
            "schoolNum": 1
        },
        {
            "id": "26001",
            "name": "昆明市",
            "enname": "kunmingshi",
            "parentId": 26,
            "schoolNum": 35
        },
        {
            "id": "26002",
            "name": "大理市",
            "enname": "dalishi",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26003",
            "name": "昭通市",
            "enname": "zhaotongshi",
            "parentId": 26,
            "schoolNum": 1
        },
        {
            "id": "26004",
            "name": "曲靖市",
            "enname": "qujingshi",
            "parentId": 26,
            "schoolNum": 3
        },
        {
            "id": "26005",
            "name": "普洱市",
            "enname": "puershi",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26006",
            "name": "保山市",
            "enname": "baoshanshi",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26007",
            "name": "蒙自市",
            "enname": "mengzishi",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26008",
            "name": "玉溪市",
            "enname": "yuxishi",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26009",
            "name": "楚雄市",
            "enname": "chuxiongshi",
            "parentId": 26,
            "schoolNum": 3
        },
        {
            "id": "26010",
            "name": "文山州",
            "enname": "wenshanzhou",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26011",
            "name": "丽江市",
            "enname": "lijiangshi",
            "parentId": 26,
            "schoolNum": 1
        },
        {
            "id": "26012",
            "name": "德宏州",
            "enname": "dehongzhou",
            "parentId": 26,
            "schoolNum": 2
        },
        {
            "id": "26013",
            "name": "临沧市",
            "enname": "lincangshi",
            "parentId": 26,
            "schoolNum": 1
        },
        {
            "id": "26014",
            "name": "个旧市",
            "enname": "gejiushi",
            "parentId": 26,
            "schoolNum": 1
        },
        {
            "id": "26015",
            "name": "景洪市",
            "enname": "jinghongshi",
            "parentId": 26,
            "schoolNum": 1
        },
        {
            "id": "27001",
            "name": "拉萨市",
            "enname": "lasashi",
            "parentId": 27,
            "schoolNum": 5
        },
        {
            "id": "27002",
            "name": "咸阳市",
            "enname": "xianyangshi",
            "parentId": 27,
            "schoolNum": 12
        },
        {
            "id": "4012",
            "name": "西安市",
            "enname": "xianshi",
            "parentId": 4,
            "schoolNum": 45
        },
        {
            "id": "4013",
            "name": "延安市",
            "enname": "yananshi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4014",
            "name": "汉中市",
            "enname": "hanzhongshi",
            "parentId": 4,
            "schoolNum": 3
        },
        {
            "id": "4015",
            "name": "宝鸡市",
            "enname": "baojishi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4016",
            "name": "渭南市",
            "enname": "weinanshi",
            "parentId": 4,
            "schoolNum": 3
        },
        {
            "id": "4017",
            "name": "商洛市",
            "enname": "shangluoshi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4018",
            "name": "安康市",
            "enname": "ankangshi",
            "parentId": 4,
            "schoolNum": 2
        },
        {
            "id": "4019",
            "name": "铜川市",
            "enname": "tongchuanshi",
            "parentId": 4,
            "schoolNum": 1
        },
        {
            "id": "28001",
            "name": "兰州市",
            "enname": "lanzhoushi",
            "parentId": 28,
            "schoolNum": 20
        },
        {
            "id": "28002",
            "name": "庆阳市",
            "enname": "qingyangshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28003",
            "name": "天水市",
            "enname": "tianshuishi",
            "parentId": 28,
            "schoolNum": 4
        },
        {
            "id": "28004",
            "name": "张掖市",
            "enname": "zhangyeshi",
            "parentId": 28,
            "schoolNum": 2
        },
        {
            "id": "28005",
            "name": "甘南州",
            "enname": "gannanzhou",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28006",
            "name": "平凉市",
            "enname": "pingliangshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28007",
            "name": "陇南市",
            "enname": "longnanshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28008",
            "name": "定西市",
            "enname": "dingxishi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28009",
            "name": "嘉峪关市",
            "enname": "jiayuguanshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28010",
            "name": "金昌市",
            "enname": "jinchangshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28011",
            "name": "白银市",
            "enname": "baiyinshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28012",
            "name": "酒泉市",
            "enname": "jiuquanshi",
            "parentId": 28,
            "schoolNum": 1
        },
        {
            "id": "28013",
            "name": "武威市",
            "enname": "wuweishi",
            "parentId": 28,
            "schoolNum": 2
        },
        {
            "id": "29001",
            "name": "西宁市",
            "enname": "xiningshi",
            "parentId": 29,
            "schoolNum": 8
        },
        {
            "id": "30001",
            "name": "银川市",
            "enname": "yinchuanshi",
            "parentId": 30,
            "schoolNum": 11
        },
        {
            "id": "30002",
            "name": "固原市",
            "enname": "guyuanshi",
            "parentId": 30,
            "schoolNum": 1
        },
        {
            "id": "30003",
            "name": "石嘴山市",
            "enname": "shizuishanshi",
            "parentId": 30,
            "schoolNum": 1
        },
        {
            "id": "30004",
            "name": "吴忠市",
            "enname": "wuzhongshi",
            "parentId": 30,
            "schoolNum": 1
        },
        {
            "id": "31001",
            "name": "乌鲁木齐市",
            "enname": "wulumuqishi",
            "parentId": 31,
            "schoolNum": 21
        },
        {
            "id": "31002",
            "name": "阿拉尔市",
            "enname": "alaershi",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31003",
            "name": "石河子市",
            "enname": "shihezishi",
            "parentId": 31,
            "schoolNum": 2
        },
        {
            "id": "31004",
            "name": "喀什地区",
            "enname": "kashidiqu",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31005",
            "name": "伊犁州",
            "enname": "yilizhou",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31006",
            "name": "昌吉市",
            "enname": "changjishi",
            "parentId": 31,
            "schoolNum": 3
        },
        {
            "id": "31007",
            "name": "和田市",
            "enname": "hetianshi",
            "parentId": 31,
            "schoolNum": 2
        },
        {
            "id": "31008",
            "name": "奎屯市",
            "enname": "kuitunshi",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31009",
            "name": "克拉玛依市",
            "enname": "kelamayishi",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31010",
            "name": "伊宁市",
            "enname": "yiningshi",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31011",
            "name": "阿克苏市",
            "enname": "akesushi",
            "parentId": 31,
            "schoolNum": 1
        },
        {
            "id": "31012",
            "name": "库尔勒市",
            "enname": "kuerleshi",
            "parentId": 31,
            "schoolNum": 1
        }
    ];
    var source = [];
    var sourceHash = {};
    for (var i = 0; i < city.length; i++) {
        var key = city[i].enname + "-" + city[i].name;
        source.push(key);
        sourceHash[key] = city[i];
    }

    $(".citySuggest").each(function () {
        var $this = $(this);
        var cityId = $('<input type="hidden" id="cityId" name="cityId" >').insertAfter($this);
        $this.typeahead({
            source: source,
            items: 8
        }, {
            afterSelect: function (e, val) {
                if(sourceHash[val]){
                    cityId.val(sourceHash[val].id);
                    $this.val(sourceHash[val].name);
                }
            },
            afterKeyup: function (e) {
                cityId.val("");
            }
        });
    });
})();