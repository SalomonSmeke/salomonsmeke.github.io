"use strict";

import {context as ctx} from "./lib/globals.js";
import {load as loadModule} from "./modules/_module.js";
import {module_def as root} from "./modules/root.js";
import {module_def as bars} from "./modules/bars.js";

//No-js banner removal
document
.getElementById("loader-wrapper")
.parentNode
.removeChild(document.getElementById("loader-wrapper"));

//Execution. Nothing here is final.

loadModule(root);
loadModule(bars);
