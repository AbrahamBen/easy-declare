import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts/layouts.component';
import { NavBarComponent } from './layouts/components/nav-bar/nav-bar.component';
import { HeaderComponent } from './layouts/components/header/header.component';
import { AboutComponent } from './layouts/components/about/about.component';
import { TeamComponent } from './layouts/components/team/team.component';
import { DeclarationBlocComponent } from './layouts/components/declaration-bloc/declaration-bloc.component';
import { ServicesComponent } from './layouts/components/services/services.component';
import { ContactComponent } from './layouts/components/contact/contact.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { ModalsComponent } from './layouts/components/modals/modals.component';
import { PartnerComponent } from './layouts/components/partner/partner.component';
import {RouterLinkWithHref} from "@angular/router";



@NgModule({
    declarations: [
        LayoutsComponent,
        NavBarComponent,
        HeaderComponent,
        AboutComponent,
        TeamComponent,
        DeclarationBlocComponent,
        ServicesComponent,
        ContactComponent,
        FooterComponent,
        ModalsComponent,
        PartnerComponent
    ],
  exports: [
    LayoutsComponent,
    HeaderComponent,
    NavBarComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref
    ]
})
export class CoreModule { }
