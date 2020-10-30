import Mock from "mockjs";

// 图表数据
let List = [];
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    皮蛋瘦肉粥: Mock.Random.float(100, 8000, 0, 2),
                    猪手花生粥: Mock.Random.float(100, 8000, 0, 2),
                    香菇鸡粥: Mock.Random.float(100, 8000, 0, 2),
                    板栗粥: Mock.Random.float(100, 8000, 0, 2),
                    猪心安神粥: Mock.Random.float(100, 8000, 0, 2),
                    菜干烧骨粥: Mock.Random.float(100, 8000, 0, 2)
                })
            );
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [{
                        name: "皮蛋瘦肉粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "猪手花生粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "香菇鸡粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "板栗粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "猪心安神粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "菜干烧骨粥",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    }
                ],
                // 柱状图
                userData: [{
                        date: "周一",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周二",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周三",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周四",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周五",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周六",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: "周日",
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    }
                ],
                // 折线图
                orderData: {
                    date: [
                        "20191001",
                        "20191002",
                        "20191003",
                        "20191004",
                        "20191005",
                        "20191006",
                        "20191007"
                    ],
                    data: List
                },
                tableData: [{
                        name: "皮蛋瘦肉粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: "猪手花生粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: "香菇鸡粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: "板栗粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: "猪心安神粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: "菜干烧骨粥",
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    }
                ]
            }
        };
    }
};