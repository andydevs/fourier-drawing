/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { FourierOutputContext } from './fourier-output';
import { FourierSeries } from './fourier/series';
import { builders, random } from './fourier/builders';
import { controlUpdate$ } from './controls';

// Draw Context and initial animation
let fctx = new FourierOutputContext('fourout')

// Subscribe to control updates and update fourier on change
controlUpdate$.subscribe(({ typ, n, zscale }) => {
    let builder = builders[typ] || random
    let fourier = FourierSeries.buildFourier(builder, n, zscale)
    fctx.renderAnimation(fourier)
})