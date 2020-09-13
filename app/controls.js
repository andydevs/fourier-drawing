/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { combineLatest, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Type select which emits on change
const typeSelect = document.getElementById('type-select')
const typeOnChange$ = fromEvent(typeSelect, 'change')
    .pipe(
        map(event => event.target.value),
        startWith('wave-square')
    )

// N select which emits on change
const nSelect = document.getElementById('n-select')
const nOnChange$ = fromEvent(nSelect, 'change')
    .pipe(
        map(event => event.target.value),
        startWith(50)
    )

// zscale select which emits on change
const zscaleSelect = document.getElementById('zscale-select')
const zscaleOnChange$ = fromEvent(zscaleSelect, 'change')
    .pipe(
        map(event => event.target.value),
        startWith(1)
    )

// Button which triggers regeneration
const regenButton = document.getElementById('regenerate')
const regenClick$ = fromEvent(regenButton, 'click')
    .pipe(startWith(new Event('click')))

// Combine observable that emits control changes
export const controlUpdate$ = combineLatest([
    typeOnChange$,
    nOnChange$,
    zscaleOnChange$,
    regenClick$
])
    .pipe(map(([typ, n, zscale, _]) => ({ typ, n, zscale })))