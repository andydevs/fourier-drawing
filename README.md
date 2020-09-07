Web Template
===========================================================

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andydevs/web-boilerplate)

Use this template for building basic static websites.

On the repository webpage, you can either click 
`Use this Template` which will create a new repository with
the template code, or you can click the "Deploy to Netlify" button in
the README, which will both create a new repository and
deploy a new website to Netlify.

**[DELETE THE NETLIFY BUTTON AND EDIT THIS PART WITH THE DESCRIPTION OF YOUR SITE]**

Development
-----------------------------------------------------------

### Application Architecture

_Technologies_

| Part              |  System |
|:------------------|--------:|
| Task Runner       |   Grunt |
| Web Code Bundling | Webpack |
| Stylesheets       |    SCSS |
| Transpilation     |   Babel |

_Folder Structure_

| Folder      |                             Use |
|:------------|--------------------------------:|
| `app`       |                Application Code |
| `app/style` |                SCSS Stylesheets |
| `pages`     |                   HTML Pages \* |
| `assets`    |   Static Assets for the Site \* |
| `public`    | Build Output Directory for Site |

\* _Folder contents (subfolders included) are copied over to the `public` directory_

### Building and Running

To build the app, run

    $ grunt

The boilerplate also provides a development server which
could be run with

    $ grunt serve

`grunt serve` will automatically open the built page in a web 
browser and start watching for changes in any of these files.
Due to the structure of this boilerplate (namely the html
pages being copied over every build), you may need to fully 
reload the webpage a couple times for it to update with the 
changes.
