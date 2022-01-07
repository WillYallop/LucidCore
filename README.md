# Lucid - LucidCore (moved!)
> This project has been merged into the [Lucid](https://github.com/WillYallop/Lucid) repository and is no longer being worked on here!

LucidCore is a dependency of Lucid, that controls the core functionality. It does everything from handling statically generating the site, to validation and optimising media. 

LucidCore is tightly coupled to Lucid, and does not contain features such as the: API, the CMS site itself and more. It has been created as a seperate repository to make the Lucid easier to maintain and update. 

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

To use LucidCore all you need to do is install it, and then import where needed.

```
npm install LucidCore
```

Then, dending on how you decide to use this package, you can import it in one of two ways. The first will import it under one namespace, the second, more efficient way, you can specify what modules specifically you want to use. 

```typescript
import * as lucid from 'lucid-core';
// or, for example:
import { validate, componentController, themeController, distController, generateApp } from 'lucid-core';
```

Once you have imported the package, you will need to then add the ```lucid.config.js``` file. Read more about this [here](#config).

### Config

At the root of your projects directory you must include a ``` lucid.config.js ``` file. As you would assume, this is in place to define important config for LucidCore to use. An exmaple of this file is bellow. Please note this is not final and is under heavy development still!

```typescript
module.exports = {
    domain: 'lucid.local',
    directories: {
        theme: './theme',
        temp: './temp',
        templates: './templates',
        // Dists 
        dist: './app',
        assets_dist: './dist/assets',
        cms_dist: './dist/cms'
    }
}
```




## Capabilities

As mentioned above, LucidCore is tightly coupled to Lucid, and as such, its features are specific to that.

### Static Site Generator

> Not finalised

LucidCore uses the [liquid](https://liquidjs.com/index.html) template engine to generate static html files (Note: this is not used to generate pages on the fly on get requests. This is is used to generate as required). On top of the standard tags liquid uses, we have a few more registered that will need to be used when your building out your templates. These are not final yet, but here they are:

### {% lucidHead %}

> Not finalised

The ```{% lucidHead %}``` tag is used to insert data in the head. If you have any meta tags, fonts, style etc. they will be passed into this tag. This is all handled in the LucidCMS.

### {% lucidSeo %}

The ```{% lucidSeo %}``` tag is used to insert your standard meta tags. Unlike the ```{% lucidHead %}``` that doenst have any input type, this currently requires an object with a title and description key. This will be expanded in the future.

### {% lucidScript %}

The ```{% lucidScript %}``` tag is used to insert scripts into the footer of your pages. 

### {% lucidApp %}

THe ```{% lucidApp %}``` tag is perhaps the most important of the bunch. This is used to insert a pages unique components and data into a tempalte.

**Exposed functions:**
- ``` generator.generateApp() ```
- ``` generator.generateComponents() ```


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

The validation module is in charge of validating all of the data that flows in and out of LucidCore. This could be anything from the component name and description on the frontend, to verify if an ID is valid. There is only one endpoint for this module, but can take in a single validation object, or an array of them.


### Media Optimiser

WIP: This will be in charge of handling all media uploads and requests, along with automatically rezing the images on request and generating a range of different file types such as jpg, webp and avif.



## Testing

WIP: the theme directory in this project is needed for testing purposes. It is currently shipped in the package, but in the future before you can run ```npm run test``` you will have to run another command which will pull create a new theme directory soley for testing from another repo. This will be gitignored and removed from this proejct.