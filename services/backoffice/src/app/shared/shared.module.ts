import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './layouts/main-layout/components/drawer/drawer.component';
import { TopBarComponent } from './layouts/main-layout/components/top-bar/top-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';
import { ContainerComponent } from './components/container/container.component';
import { TextFieldComponent } from './components/text-field/text-field.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    AvatarComponent,
    DrawerComponent,
    DrawerComponent,
    TopBarComponent,
    AvatarComponent,
    ButtonComponent,
    PageHeaderComponent,
    LinkButtonComponent,
    ContainerComponent,
    TextFieldComponent,
  ],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [
    MainLayoutComponent,
    AvatarComponent,
    ButtonComponent,
    PageHeaderComponent,
    LinkButtonComponent,
    ContainerComponent,
    TextFieldComponent,
  ],
})
export class SharedModule {}
