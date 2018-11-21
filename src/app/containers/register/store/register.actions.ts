import {Action} from "@ngrx/store";

export enum RegistersActionTypes {
  GET_REGISTER = '[REGISTER] Fetch register requested',
  GET_REGISTER_SUCCESS = '[REGISTER] Fetch register success',
  GET_REGISTER_FAIL = '[REGISTER] Fetch register failed',
}

export class GetRegister implements Action {
  readonly type = RegistersActionTypes.GET_REGISTER;
}

export class GetRegisterSuccess implements Action {
  readonly type = RegistersActionTypes.GET_REGISTER_SUCCESS;
  constructor(public payload: boolean) {}
}

export class GetRegisterFail implements Action {
  readonly type = RegistersActionTypes.GET_REGISTER_FAIL;

  constructor(public error: any) {}

}

export type RegisterActionsUnion = GetRegister | GetRegisterSuccess | GetRegisterFail;
