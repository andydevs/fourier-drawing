SPA Boilerplate
===================================================================

A visual that demos drawing paths using a fourier series.

Check out this [video by 3Blue1Brown][3b1b] and this 
[video by CodingTrain][cdtr] to learn more about the math.

Development
-------------------------------------------------------------------

### Application Architecture

_Technologies_

| Part          |  System |
|:--------------|--------:|
| Bundling      | Webpack |
| Stylesheets   |    SCSS |
| Transpilation |   Babel |

_Folder Structure_

| Folder       |                             Use |
|:-------------|--------------------------------:|
| `app`        |                Application Code |
| `app/style`  |                SCSS Stylesheets |
| `app/assets` |      Static Assets for the Site |
| `public`     | Build Output Directory for Site |

### Building and Running

To build the app, run

    $ npx webpack

Or

    $ npm run build

The boilerplate also provides a development server which
could be run with

    $ npx webpack-dev-server

Or

    $ npm start

-------------------------------------------------------------------

_Created with [SPA boilerplate][spa] made by [Andydevs][andydevs]_

[spa]: http://github.com/andydevs/spa-boilerplate
[andydevs]: http://github.com/andydevs
[3b1b]: https://www.youtube.com/watch?v=r6sGWTCMz2k
[cdtr]: https://www.youtube.com/watch?v=Mm2eYfj0SgA