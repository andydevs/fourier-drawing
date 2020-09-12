/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { animationFrameScheduler, of } from 'rxjs';
import { observeOn, repeat } from 'rxjs/operators';

// Create an animation looper
export const animationLoop$ = of(0).pipe(
    observeOn(animationFrameScheduler),
    repeat()
)