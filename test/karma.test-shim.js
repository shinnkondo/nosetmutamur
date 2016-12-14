import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('../source/javascripts/app', true, /spec\.ts$/);

context.keys().forEach(context);