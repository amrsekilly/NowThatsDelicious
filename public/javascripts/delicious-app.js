import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';

// call the autocomplete function on the address
autocomplete($("#address"), $("#lat"), $("#lng"));
