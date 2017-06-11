import { stub, analytics } from './vendor/supplement';
import { load as loadModule } from './modules/_module';
import root from './modules/root';

// Deals with methods that dont exist. This MUST be the first line.
stub();

// Execution. Nothing here is final.
loadModule(root);

// No-js banner removal. After module loading.
document.getElementById('loader-wrapper').parentNode.removeChild(
  document.getElementById('loader-wrapper')
);

// Adds analytics.
analytics();
