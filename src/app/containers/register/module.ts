import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from './store/register.effects';
import {registerReducers} from './store';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    StoreModule.forFeature('auth', registerReducers),
    EffectsModule.forFeature([RegisterEffect])
  ]
})
export class RegisterModule {}
