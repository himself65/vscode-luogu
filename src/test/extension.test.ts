import * as assert from 'assert';
import { Problem } from '../data/Problem';

suite("Extension Tests", () => {

    
    test("Data Tests", () => {
        let problem = new Problem();
        assert(problem !== null, '题目初始化错误');
        problem.setBackground("Hello,world");
        assert(problem.getBackground() === "Hello,world", "题目保存错误");
    });
});