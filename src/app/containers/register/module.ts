import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RegisterRoutingModule]
})
export class RegisterModule {}
