"use strict";

import {context as ctx} from "./lib/globals.js";
import {load as loadModule} from "./modules/_module.js";
import {module_def as root} from "./modules/root.js";

//Execution. Nothing here is final.

loadModule(root);

//No-js banner removal. After module loading.
document
.getElementById("loader-wrapper")
.parentNode
.removeChild(document.getElementById("loader-wrapper"));
