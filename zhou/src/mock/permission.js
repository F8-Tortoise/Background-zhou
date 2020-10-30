import Mock from "mockjs";
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body);
        console.log(JSON.parse(config.body));
        // 先判断用户是否存在
        if (username === "yedafa" || username === "yanglizhu") {
            // 判断账号和密码是否对应
            if (username === "yanglizhu" && password === "123456") {
                return {
                    code: 20000,
                    data: {
                        menu: [{
                                path: "/",
                                name: "home",
                                label: "首页",
                                icon: "s-home",
                                url: "Home/Home"
                            },
                            {
                                path: "/goods",
                                name: "goods",
                                label: "商品列表页",
                                icon: "goods",
                                url: "Good/Goods"
                            },
                            {
                                path: "/user",
                                name: "user",
                                label: "用户管理页",
                                icon: "user",
                                url: "UserManage/UserManage"
                            },
                            {
                                label: "其他",
                                icon: "location",
                                children: [{
                                        path: "/page1",
                                        name: "page1",
                                        label: "页面1",
                                        icon: "setting",
                                        url: "Other/PageOne"
                                    },
                                    {
                                        path: "/page2",
                                        name: "page2",
                                        label: "页面2",
                                        icon: "setting",
                                        url: "Other/PageTwo"
                                    }
                                ]
                            }
                        ],
                        token: Mock.Random.guid(),
                        message: "获取成功"
                    }
                };
            } else if (username === "yedafa" && password === "123456") {
                return {
                    code: 20000,
                    data: {
                        menu: [{
                                path: "/",
                                name: "home",
                                label: "首页",
                                icon: "s-home",
                                url: "Home/Home"
                            },
                            {
                                path: "/goods",
                                name: "goods",
                                label: "商品列表页",
                                icon: "goods",
                                url: "Good/Goods.vue"
                            },
                        ],
                        token: Mock.Random.guid(),
                        message: "获取成功"
                    }
                };
            } else {
                return {
                    code: -999,
                    data: {
                        message: "密码错误"
                    }
                };
            }
        } else {
            return {
                code: -999,
                data: {
                    message: "用户不存在"
                }
            };
        }
    }
};