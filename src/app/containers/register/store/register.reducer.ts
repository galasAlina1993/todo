import {RegisterActionsUnion, RegistersActionTypes} from './register.actions';

export interface IregisterState {
  isRegistered: boolean;
}

export const  initialState: IregisterState = {
  isRegistered: false
};

export function reducer (state: IregisterState = initialState, action: RegisterActionsUnion) {
  switch (action.type) {
    case RegistersActionTypes.GET_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: action.payload
      };
    default:
      return state;
  }
}

export const selectIsregistered = (state) => state.register.isRegistered;
