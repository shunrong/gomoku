// 导入@testing-library/jest-dom扩展断言
require('@testing-library/jest-dom');

// 全局声明Jest测试API
global.describe = describe;
global.test = test;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
global.jest = jest; 