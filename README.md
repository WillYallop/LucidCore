# CMS CORE
> Still In Development

CMS Core is a dependency of WillPress (WIP name...), that controls the core functionality of the CMS. It does everything from handling statically generating the site, to validation and optimising media. 

This CMS Core is tightly coupled to the CMS, and does not contain features such as the: API, the CMS site itself and more. It has been created as a seperate repository to make the WillPress CMS easier to maintain and update. 

**Important information:**
- [Getting Started](#getting-started)
- [Config](#config)
- [Testing](#testing)

**Find out more about its capablities:**
- [Static Site Generator](#static-site-generator)
- [Controller](#controller)
- [Validation](#validation)
- [Media Optimiser](#media-optimiser)

## Important Information

### Getting Started

To use the CMS Core all you need to do is install it, and then import where needed.

```
npm install cms_core
```

Then, dending on how you decide to use this package, you can import it in one of two ways. The first will import it under one namespace, the second, more efficient way, you can specify what modules specifically you want to use. 

```typescript
import * as willpressCore from 'cms_core';
// or, for example:
import { validate, componentController, themeController, distController, generateApp } from 'cms_core';
```

Once you have imported the package, you will need to then add the ```cms.config.ts``` file. Read more about this [here](#config).

### Config

At the root of your projects directory you must include a ``` cms.config.ts ``` file. As you would assume, this is in place to define importing config for the CMS Core to use. An exmaple of this file is bellow. Please note this is not final and is under heavy development still!

```typescript
module.exports = {
    directories: {
        theme: './theme',
        dist: './app',
        temp: './temp',
        templates: './templates'
    }
}
```




## Capabilities

As mentioned above, this CMS Core is tightly couple to the WillPress CMS, and as such, isnt built to be generalised.

### Static Site Generator

> Not finalised

This CMS Core uses the twig template engine to generate dynamic and flexible templates and component markup. On top of the default twig syntax, we have some in-house tags such as ```<willpress>``` which depending on the element will add in different data to the final buit pages.

**Custom elements include:**
- ```<willpressHead>```
- ```<willpressSeo>```
- ```<willpress>```
- ```<willpressFooter>```

Their functions are not fully defined yet, so this will be updated in the future.

**Exposed functions:**
- ``` generateApp() ```
- ``` generateComponent() ```


### Controller

There are a handful of different controllers and each is responsible for interacting with the filesystem in some way.

All of the controllers bellow are exposed through the ``` componentController ``` name space.

#### Component Controller

The component controller is in charge of saving, reading, deleting and updated any component information in the themes directory.

**Exposed functions:**
- ``` saveSingle() ```
- ``` updateSingle() ```
- ``` deleteSingle() ```
- ``` getSingleByID() ```
- ``` getMultiple() ```

#### Theme Controller

The theme controller is in charge of all things filesystem when in comes to the theme directory. This has a number of super important functions that the rest of the package relies upon such as the bellow.

**Exposed functions:**
- ``` getSingleFileContent() ```
- ``` verifyFileExists() ```
- ``` writeSingleFile() ```
- ``` listDirectoryFiles() ```

#### Dist Controller

The dist controller, much like the theme controller, is in charge of all things filesystem when in comes to the dist directory. However with this controller, its more coupled in with the generator modules which you can read more about [here](#static-site-generator).

**Exposed functions:**
- ``` buildDefaultApp() ```
- ``` copyStatic() ```
- ``` createSitemap() ```
- ``` savePages() ```


### Validation

The validation module is in charge of validating all of the data that flows in and out of the CMS. This could be anything from the component name and description on the frontend, to verify if an ID is valid. There is only one endpoint for this module, but can take in a single validation object, or an array of them.


### Media Optimiser

WIP: This will be in charge of handling all media uploads and requests, along with automatically rezing the images on request and generating a range of different file types such as jpg, webp and avif.



## Testing

WIP: the theme directory in this project is needed for testing purposes. It is currently shipped in the package, but in the future before you can run ```npm run test``` you will have to run another command which will pull create a new theme directory soley for testing from another repo. This will be gitignored and removed from this proejct.