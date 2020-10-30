import Mock from "mockjs"

function param5bj(url) {
    const search = url.split("?")[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    );
}

let List = []
List.push(
    Mock.mock([{
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592154814662&di=0c95fd721583fb6391da975e49cfc7c0&imgtype=0&src=http%3A%2F%2Fimages.meishij.net%2Fp%2F20150128%2F709f39ddf2f84f78e50a61e5a607b482.jpg',
            name: '皮蛋瘦肉粥',
            price: '￥8',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        }, {
            image: 'https://i8.meishichina.com/attachment/recipe/2013/01/19/20130119182352142688190.jpg?x-oss-process=style/c320',
            name: '猪手花生粥',
            price: '￥12',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        }, {
            image: 'http://www.54hcz.com/wp-content/uploads/2014/10/香菇鸡肉粥1.jpg',
            name: '香菇鸡肉粥',
            price: '￥12',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        }, {
            image: 'https://i.zw3e.com/zw_news_map/550/2017084/1504061642642838738.jpg',
            name: '板栗粥',
            price: '￥8',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        },
        {
            image: 'http://upload.taihainet.com/2016/1116/1479273236300.jpg',
            name: '猪心安神粥',
            price: '￥15',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        },
        {
            image: 'https://tse4-mm.cn.bing.net/th/id/OIP.H62H1i1i5UIZofogEy2LYgHaE8?pid=Api&rs=1',
            name: '菜干烧骨粥',
            price: '￥10',
            online: Mock.Random.datetime("yyyy-MM-dd"),
            selled: Mock.Random.float(100, 4000, 0, 0),
        }
    ], )
)


export default {
    // 获取商品列表
    getGoodsList: config => {
        const { name, page, limit = 5 } = param5bj(config.url);
        console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
        const mockList = List[0]
        const pageList = mockList.filter(
            (item, index) => index < limit * page && index >= limit * (page - 1),
        );
        console.log(pageList)
        return {
            count: List[0].length,
            List: pageList
        }
    },
    // 增加商品
    createGoods: config => {
        const { name, price, online, selled } = JSON.parse(config.body);
        List[0].unshift({
            name: name,
            price: price,
            online: online,
            selled: selled,
        });
        return {
            code: 20000,
            data: {
                message: "添加成功"
            }
        };
    },
    // 修改商品
    updateGoods: config => {
        const { name, price, online, selled } = JSON.parse(config.body);
        List[0].some(u => {
            if (u.name == name) {
                u.name = name;
                u.price = price;
                u.online = online;
                u.selled = selled;
                return true;
            }

        });
        return {
            code: 20000,
            data: {
                message: "编辑成功"
            }
        };
    },
    // 删除商品
    deleteGoods: config => {
        const { name } = param5bj(config.url);
        if (!name) {
            return {
                code: -999,
                message: "参数不正确"
            };
        } else {
            List[0] = List[0].filter(u => u.name !== name);
            return {
                code: 20000,
                message: "删除成功"
            };
        }
    },
}