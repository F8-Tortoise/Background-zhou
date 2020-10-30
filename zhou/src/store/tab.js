import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        menu: [],
        tabsList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "home"
        }]
    },
    mutations: {
        setMenu(state, val) {
            (state.menu = val), Cookie.set("menu", JSON.stringify(val));
            // console.log(val, 'vuex')
        },
        clearMenu(state) {
            (state.menu = []), Cookie.remove("menu");
        },
        addMenu(state, router) {
            if (!Cookie.get("menu")) {
                return;
            }
            let menu = JSON.parse(Cookie.get("menu"));
            state.menu = menu;
            let currentMenu = [{
                path: "/",
                component: () =>
                    import ("@/views/Main"),
                children: []
            }];
            //循环操作根据url拼接component路径
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            // 这里不是单引号  而是顿号
                            import (`@/views/${item.url}`);
                        return item;
                    });
                    currentMenu[0].children.push(...item.children);
                } else {
                    item.component = () =>
                        import (`@/views/${item.url}`);
                    currentMenu[0].children.push(item);
                }
            });
            console.log(currentMenu, 'cur')
            router.addRoutes(currentMenu);
        },
        selectMenu(state, value) {
            if (value.name !== "home") {
                state.currentMenu = value;
                let result = state.tabsList.findIndex(item => item.name === value.name);
                result === -1 ? state.tabsList.push(value) : "";
                Cookie.set("tagList", JSON.stringify(state.tabsList));
            } else {
                state.currentMenu = null;
            }
            //   value.name === "home"
            //     ? (state.currentMenu = null)
            //     : (state.currentMenu = value);
        },
        getMenu(state) {
            if (Cookie.get("tagList")) {
                let tagList = JSON.parse(Cookie.get("tagList"));
                state.tabsList = tagList;
            }
        },
        closeTab(state, value) {
            let result = state.tabsList.findIndex(item => item.name === value.name);
            state.tabsList.splice(result, 1);
            Cookie.set("tagList", JSON.stringify(state.tabsList));
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        }
    },
    actions: {}
};