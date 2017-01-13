import * as angular from 'angular'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';

import AppModule from './app/app.module'
import './app/angularOneApp'

platformBrowserDynamic().bootstrapModule(AppModule).then((platformRef: any) => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['NosApp']);
});