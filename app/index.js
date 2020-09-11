/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { animationFrameScheduler, of } from 'rxjs';
import { observeOn, repeat } from 'rxjs/operators';
import { buildRandomFourier } from './fourier/builders/random';
import { buildSquareFourier } from './fourier/builders/square';
import { FourierOutputContext } from './fourier-output';

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

// Initial fourier animation
let fourier = buildSquareFourier(4, 1.0)
let fanim = createAnimation(fourier, fctx)

// Frame animation
let animation = animationLoop$.subscribe(fanim)

setTimeout(() => {
    animation.unsubscribe()
    fourier = buildRandomFourier(4, 1.0)
    fanim = createAnimation(fourier, fctx)
    animation = animationLoop$.subscribe(fanim)
}, 10000)