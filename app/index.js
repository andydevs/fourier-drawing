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

// Button which triggers regeneration
const regenButton = document.getElementById('regenerate')
const regenClick$ = fromEvent(regenButton, 'click')

// ----------------------------- MAIN -----------------------------

// Parameters
const n = 10
const fscale = 1.0
let lastTyp = 'square'

function update() {
    // Get Update fourier
    switch (lastTyp) {
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
}

// Draw Context and initial animation
let fctx = new FourierOutputContext('fourout')
let fourier = buildSquareFourier(n, fscale)
fctx.renderAnimation(fourier)

// Change animation on type change
typeOnChange$.subscribe(typ => {
    lastTyp = typ
    update()
})

// Render on button trigger
regenClick$.subscribe(() => {
    update()
})