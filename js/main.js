import { load as loadModule } from './modules/_module';
import root from './modules/root';

// Execution. Nothing here is final.

loadModule(root);

// No-js banner removal. After module loading.
document.getElementById('loader-wrapper').parentNode.removeChild(
  document.getElementById('loader-wrapper')
);
