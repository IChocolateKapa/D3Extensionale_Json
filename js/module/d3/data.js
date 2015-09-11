/**
 * Created by Echo on 2015/9/11.
 */


var link;

var node;

var force;

var linkedByIndex = {};

var dCurrent;

var dCurrentNode;

var toggle = 0;

var nodes = {};

var links = new Array();

var himSelf;
var mylinks = new Array();
var hisqun;

var qunInfo;
var qunMemberInfo_re;
var qunMemberInfo;

var org_qunid;

var line_text;

var outer, svg;
var container;


var result = {
    "allqun": [],
    "qunRes": [
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "2746294",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "70305",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "73813",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "88521",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "4654",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "26936",
            "qunTotalMember": "36"
        },
        {
            "qunCreateTime": "2009-12-23",
            "qunDescription": "这是一个测试数据娃哈哈哈哈",
            "qunNickName": "18班同学交流会",
            "qunNumber": "12860",
            "qunTotalMember": "36"
        }
    ],
    "self": {
        "qqAccount": "43253670",
        "qqAge": "34",
        "qqName": "我就是齐天大圣娃哈哈",
        "qqNickName": "我就是齐天大圣娃哈哈dasheng",
        "qqSex": "男",
        "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
        "qunNickName": "天宫群",
        "qunNumber": "323647"
    }
}





var child = {
    "allqun": [
        {
            "qqAccount": "43253670.709312515963414",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.9682799844825942",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.3522960434387403",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.559201666275274",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.5619659155451163",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.13661044469213202",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.835686058386601",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.8354529924970263",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.9398212333593564",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.5693549516335132",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.6128784373535403",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.9475018539620145",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.7702474463440377",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.17168172692345973",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.8080966491882",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.9011687863094004",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.6728778962668205",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.6842923365692685",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.11520175429719481",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.4560660447087209",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.4640086843620308",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.8429109216711351",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        },
        {
            "qqAccount": "43253670.2735514900376619",
            "qqAge": "34",
            "qqName": "我就是齐天大圣娃哈哈",
            "qqNickName": "我就是齐天大圣娃哈哈dasheng",
            "qqSex": "男",
            "qunDescription": "天上神仙在此汇聚，治理人三界安稳，望各位神仙踊跃出谋划策!",
            "qunNickName": "天宫群",
            "qunNumber": "323647"
        }
    ],
    "qunInfo": {
        "qunCreateTime": "2010-12-21",
        "qunDescription": "这里是我们仙女之家，牛郎们快来玩耍吧~这里是我们仙女之家，牛郎们快来玩耍吧~这里是我们仙女之家，牛郎们快来玩耍吧~这里是我们仙女之家，牛郎们快来玩耍吧~这里是我们仙女之家，牛郎们快来玩耍吧~",
        "qunNickName": "七仙女之家",
        "qunNumber": "2746294",
        "qunTotalMember": "703"
    }
}