import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "./index";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {TodosEffects} from "./effects/todos.effects";

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({name: 'NgRx Demo', logOnly: environment.production}),
    EffectsModule.forRoot([TodosEffects])
  ]
})

export class AppStoreModule { }
