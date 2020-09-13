/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { FourierOutputContext } from './fourier-output';
import { FourierSeries } from './fourier/series';
import { builders, random } from './fourier/builders';

// -------------------------- FORM CONTROL -------------------------

// Type select which emits on change
const typeSelect = document.getElementById('type-select')
const typeOnChange$ = fromEvent(typeSelect, 'change')
    .pipe(map(event => event.target.value))

// Button which triggers regeneration
const regenButton = document.getElementById('regenerate')
const regenClick$ = fromEvent(regenButton, 'click')

// ----------------------------- MAIN ------------------------------

// Draw Context and initial animation
let fctx = new FourierOutputContext('fourout')

// Initialize
let n = 50
let fscale = 2
let lastTyp = 'wave-square'
update(lastTyp, n, fscale)

function update() {
    let builder = builders[lastTyp] || random
    let fourier = FourierSeries.buildFourier(builder, n, fscale)
    fctx.renderAnimation(fourier)
}

// Change animation on type change
typeOnChange$.subscribe(typ => {
    lastTyp = typ
    update()
})

// Render on button trigger
regenClick$.subscribe(() => {
    update()
})