import * as API from '../utils/api';
import * as assert from 'assert';

suite("Extension Tests", () => {

    test("API Tests", async () => {
        const problem = await API.getProblem("P1001").then(problem => {
            return problem;
        });
        assert(problem !== null, '返回为空');
    });
});