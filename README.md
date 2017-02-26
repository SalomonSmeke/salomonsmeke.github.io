Setting up for a re-work. So far nothing but bones.

TO-DOs:

* Create deploy script. Deploy script should: <- Meta
  * Make a subdirectory for output.
  * Run any transpile, minify, whatever task(s).
  * Push to master

* Figure out the standalone structure. <- Meta
  * Any pages/code examples should be, during build, modularized and placed in
  build/standalone.
  * html wrappers take the modules and give them their css via adapters.

* Create the interactive navigation things. <- Functionality

* More. Theres a ton to do.

Guidelines:

* Filesizes < 14KB
* No images
* Modules
* VanillaJS, regular CSS.
