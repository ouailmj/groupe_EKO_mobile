import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleVisitPage } from './schedule-visit';

@NgModule({
	declarations: [
		ScheduleVisitPage
	],
	imports: [
		IonicPageModule.forChild(ScheduleVisitPage)
	],
	exports: [
		ScheduleVisitPage
	]
})

export class ScheduleVisitPageModule { }
