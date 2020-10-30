module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     // 取消以分号结束
    //     semi: false,
    //     // 将双引号改成单引号
    //     singleQuote: true,
    //     // 设置代码最大宽度，换行
    //     printWidth: 160
    //   }
    // ]
  }
};
