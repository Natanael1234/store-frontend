import { TestBed } from '@angular/core/testing';
import { AuthResponseDto } from '../auth/dtos/auth.response.dto';
import { HttpService } from '../http/http.service';
import { testCreateMockedTokenService } from '../token/test-token-service.utils';
import { TokenService } from '../token/token.service';
import { Role } from './dtos/role/role.enum';
import { UserService } from './user.service';

/** mocks JWT token */
const SECRET_KEY = 'SECRET_KEY';
function base64Encode(str: string): string {
    return btoa(str)
        .replace(/=/g, '') // remove padding
        .replace(/\+/g, '-') // substitui + por -
        .replace(/\//g, '_'); // substitui / por _
}
async function createSignature(
    header: string,
    payload: string,
): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${header}.${payload}`);
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(SECRET_KEY),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return base64Encode(String.fromCharCode(...new Uint8Array(signature)));
}
async function generateToken(payload: object): Promise<string> {
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = base64Encode(JSON.stringify(payload));

    const signature = await createSignature(header, encodedPayload);
    return `${header}.${encodedPayload}.${signature}`;
}

const EXPIRED_TEST_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE';
const EXPIRED_TEST_REFRESH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU';

let mockAuthResponse: AuthResponseDto = {
    status: 'success',
    data: {
        user: {
            id: '891db31e-dfb5-42ed-b912-48b98463b004',
            name: 'John Doe',
            email: 'john@example.com',
            roles: [Role.user],
            active: true,
            created: '2024-02-03T19:05:21.689Z',
            updated: '2024-02-03T19:05:21.689Z',
            deletedAt: null,
        },
        payload: {
            type: 'bearer',
            token: EXPIRED_TEST_ACCESS_TOKEN,
            refreshToken: EXPIRED_TEST_REFRESH_TOKEN,
        },
    },
};

describe('UserService', () => {
    let authService: UserService;
    let mockedHttpService: any;
    let mockedTokenService: any;

    beforeEach(async () => {
        mockedTokenService = testCreateMockedTokenService();

        mockedHttpService = jasmine.createSpyObj('HttpService', ['post']);

        TestBed.configureTestingModule({
            providers: [
                { provide: TokenService, useValue: mockedTokenService },
                { provide: HttpService, useValue: mockedHttpService },
                UserService,
            ],
        });

        authService = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    xdescribe('getUsers', () => {
        it('should delegate get users request', () => {});
    });
});
