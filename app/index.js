/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { animationFrameScheduler, fromEvent, of } from 'rxjs';
import { map, observeOn, repeat } from 'rxjs/operators';
import { buildRandomFourier } from './fourier/builders/random';
import { buildSquareFourier } from './fourier/builders/square';
import { FourierOutputContext } from './fourier-output';

// Number of elements and fscale
const n = 5
const fscale = 1.0

// -------------------------- FORM CONTROL -------------------------

// Get form
const form = document.getElementById('custom')

// Add options to select field
const typeSelect = document.getElementById('type-select')
const squareOpt = document.createElement('option')
squareOpt.value = 'square'
squareOpt.text = 'square'
typeSelect.add(squareOpt)
const randomOpt = document.createElement('option')
randomOpt.value = 'random'
randomOpt.text = 'random'
typeSelect.add(randomOpt)

// Type select which emits on change
const typeOnChange$ = fromEvent(typeSelect, 'change')
    .pipe(
        map(event => event.target.value)
    )

// --------------------------- ANIMATION ---------------------------

// Create an animation looper
const animationLoop$ = of(0).pipe(
    observeOn(animationFrameScheduler),
    repeat()
)

// Draw Context
let fctx = new FourierOutputContext('fourout')

function createAnimation(fourier, fctx) {
    const path = fourier.getPath()
    let state = fourier.getInitialState()
    return () => {
        fctx.clear()
        fctx.drawPath(path)
        fctx.drawLines(state)
        fctx.drawCircles(state)
        state = state.update()    
    }
}

// ----------------------------- MAIN -----------------------------

// Initial fourier animation
let builder = buildSquareFourier
let fourier = builder(n, fscale)
let fanim = createAnimation(fourier, fctx)
let animation = animationLoop$.subscribe(fanim)

// Change animation on type change
typeOnChange$.subscribe(typ => {

    // Get builder
    let builder
    switch (typ) {
        case 'square':
            builder = buildSquareFourier
            break;
        case 'random':
        default:
            builder = buildRandomFourier
            break;
    }

    // Set new animation
    animation.unsubscribe()
    fourier = builder(n, fscale)
    fanim = createAnimation(fourier, fctx)
    animation = animationLoop$.subscribe(fanim)

})