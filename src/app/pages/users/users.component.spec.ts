import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpStatusCode } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { UsersComponent } from './users.component';
import { UserService } from '../../services/user/user.service';

const SOMETHING_WENT_WRONG_MESSAGE = 'Algo deu errado!';

type FormData = {
  password: string;
  repeatPassword: string;
};

type FormErrors = {
  mainError?: string;
  password?: string;
  repeatPassword?: string;
};

type ExceptionData = {
  /** Human readable message. Ex.: "Something went wrong!".  */
  message: string;
  /** Exception class name. Ex.: "HttpErrorResponse". */
  name: string;
  /** Status code. Ex.: 422. */
  statusCode: HttpStatusCode.UnprocessableEntity;
  /** Status text. Ex.: "'Unprocessable Entity'". */
  statusText: string;
  error: {
    /** Backend exception class name. Ex.: "UnprocessableEntityException" */
    error: string;
    /** Message. Exs.:
     * "Something went wrong!" or
     * { email: 'Error 2', password: 'Error 3' }
     */
    message: { password?: string; repeatPassword?: string } | string;
  };
};

type RemoteFormErrorData = {
  formData: FormData;
  expectedErrors: FormErrors;
  exceptionData: ExceptionData;
};

describe('UsersComponent', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUser',
      'saveUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,

        MatCardModule,
        AlertComponent,
        MatProgressBarModule,
      ],
      providers: [
        provideAnimationsAsync(),
        {
          provide: UserService,
          useValue: spy,
          RouterTestingModule,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('getUsers request', () => {});
});
