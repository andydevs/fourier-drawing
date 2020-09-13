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

// N select which emits on change
const nSelect = document.getElementById('n-select')
const nOnChange$ = fromEvent(nSelect, 'change')
    .pipe(map(event => event.target.value))

// zscale select which emits on change
const zscaleSelect = document.getElementById('zscale-select')
const zscaleOnChange$ = fromEvent(zscaleSelect, 'change')
    .pipe(map(event => event.target.value))

// Button which triggers regeneration
const regenButton = document.getElementById('regenerate')
const regenClick$ = fromEvent(regenButton, 'click')

// ----------------------------- MAIN ------------------------------

// Draw Context and initial animation
let fctx = new FourierOutputContext('fourout')

// Initialize
let lastN = 50
let lastZscale = 1
let lastTyp = 'wave-square'
update(lastTyp, lastN, lastZscale)

function update() {
    let builder = builders[lastTyp] || random
    let fourier = FourierSeries.buildFourier(builder, lastN, lastZscale)
    fctx.renderAnimation(fourier)
}

zscaleOnChange$.subscribe(zscale => {
    lastZscale = zscale
    update()
})

// Rerender on n change
nOnChange$.subscribe(n => {
    lastN = n
    update()
})

// Rerender on type change
typeOnChange$.subscribe(typ => {
    lastTyp = typ
    update()
})

// Rerender on button trigger
regenClick$.subscribe(() => {
    update()
})