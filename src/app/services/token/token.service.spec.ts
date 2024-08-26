import { TestBed, inject } from '@angular/core/testing';
import { TokenService } from './token.service';

let store: { [key: string]: string } = {};

export class LocalStorageMock implements Storage {
  // https://armno.medium.com/til-mocking-localstorage-and-sessionstorage-in-angular-unit-tests-a765abdc9d87
  constructor() {}
  getItem(key: string): string | null {
    return store[key] || null;
  }

  setItem(key: string, value: string): void {
    store[key] = value;
  }

  removeItem(key: string): void {
    delete store[key];
  }

  clear(): void {
    store = {};
  }

  key(index: number): string | null {
    return Object.keys(store)[index] || null;
  }

  get length(): number {
    return Object.keys(store).length;
  }
}

describe('TokenService', () => {
  let service: TokenService;
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    });
    service = TestBed.get(TokenService);
    localStorageMock = new LocalStorageMock();
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    const token = 'example_token';
    service.setToken(token);
    expect(service.getToken()).toEqual(token);
    expect(store['auth_token']).toEqual(token);
  });

  it('should set and get refresh token', () => {
    const refreshToken = 'example_refresh_token';
    service.setRefreshToken(refreshToken);
    expect(service.getRefreshToken()).toEqual(refreshToken);
    expect(store['refresh_token']).toEqual(refreshToken);
  });

  it('should clear tokens', () => {
    service.setToken('example_token');
    service.setRefreshToken('example_refresh_token');
    service.clearTokens();
    expect(service.getToken()).toBeNull();
    expect(store['auth_token']).toBeUndefined();
    expect(service.getRefreshToken()).toBeNull();
    expect(store['refresh_token']).toBeUndefined();
    expect(store).toEqual({});
  });
});
