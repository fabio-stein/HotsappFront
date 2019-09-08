/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome');

    let clientId = environment.paypalClientId;
    this.loadExternalScript("https://www.paypal.com/sdk/js?client-id=" + clientId + "&currency=BRL");
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
