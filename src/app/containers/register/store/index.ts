import * as fromRegister from './register.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface State {
  register: fromRegister.IregisterState;
}

export const registerReducers:  ActionReducerMap <State> = {
  register: fromRegister.reducer
}

export const getRegister = createFeatureSelector<fromRegister.IregisterState>('auth');
export const getIsRegister = createSelector(getRegister, fromRegister.selectIsregistered)

