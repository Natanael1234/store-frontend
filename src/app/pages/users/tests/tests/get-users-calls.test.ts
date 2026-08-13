import { FindUserRequestDTO } from '@services/user/dtos/find-user.request/find-user.request.dto';
import { UserService } from '@services/user/user.service';
import { _testMethodCalls } from '../../../../../test-utils/method-calls.test';

export function _testUserscomponentGetUsersCalls(
    userServiceSpy: jasmine.SpyObj<UserService>,
    expectedCalls: FindUserRequestDTO[],
) {
    const calls = userServiceSpy.getUsers.calls.allArgs();
    const _calls = calls.map((call) => ({
        args: call,
    }));
    const _expectedCalls = expectedCalls.map((expectedCall) => ({
        args: [expectedCall],
    }));
    _testMethodCalls(_calls, _expectedCalls);
}
