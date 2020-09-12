/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { buildRandomFourier } from './fourier/builders/random';
import { buildSquareFourier } from './fourier/builders/square';
import { FourierOutputContext } from './fourier-output';

// -------------------------- FORM CONTROL -------------------------

// Type select which emits on change
const typeSelect = document.getElementById('type-select')
const typeOnChange$ = fromEvent(typeSelect, 'change')
    .pipe(map(event => event.target.value))

// ----------------------------- MAIN -----------------------------

// Parameters
const n = 5
const fscale = 1.0

// Draw Context and initial animation
let fctx = new FourierOutputContext('fourout')
let fourier = buildSquareFourier(n, fscale)
fctx.renderAnimation(fourier)

// Change animation on type change
typeOnChange$.subscribe(typ => {

    // Get Update fourier
    switch (typ) {
        case 'square':
            fourier = buildSquareFourier(n, fscale)
            break;
        case 'random':
            fourier = buildRandomFourier(n, fscale)
            break;
        default:
            break;
    }

    // Animated
    fctx.renderAnimation(fourier)

})