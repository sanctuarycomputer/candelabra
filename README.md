# candelabra

<img src="./candelabra-logo.png" alt="Candelabra Logo - Lit candles on a 6-prong candelabra glowing in the dark" width="128px"/>

## What does Candelabra do?

Candelabra is a web crawler designed to generate a thorough sitemap and audit each found page for valid, semantic HTML and accessibility violations. Using Candelabra, you can check any website for accessibility violations. More importantly, you can point it to local servers and other developer environments to test your code before you deploy.

It works out of the box for any website that doesn't require authentication on entry. This means it can audit any JavaScript-rendered website including those built with the popular front-end frameworks: React, Vue, Ember, Angular, etc.

## How do I use Candelabra?

Candelabra was designed to require no configuration. Simply install the package and fire it up. For detailed usage, see [Options](#options).

```bash
# install the package
yarn global add candelabra

# run the utility
candelabra <entry-url>
```

## How does Candelabra work?

This utility is uses `puppeteer` and `axe-puppeteer` to simulate a browser's impression of a web page. It crawls entry points for internal links while simultaneously checking the accessibility of the HTML content found.

It's easy to forget that most websites are composed of hundreds or thousands of pages. With this in mind, know that an audit could take several minutes to run.

## Why was Candelabra made?

There are plenty of auditing tools that will give you a detailed report for a single URL. This has helped, but it has remained difficult to be truly comprehensive. We believe that it should be simple and require little technical know-how to understand precisely how accessible a website actually is.

As for why you should care about any of this, [Deque Labs said it best](https://github.com/dequelabs/axe-core#philosophy):

> The web can only become an accessible, inclusive space if developers are empowered to take responsibility for accessibility testing and accessible coding practices.

Because you can point Candelabra at anything, we're hoping that it encourages a climate of accountability.

## What does Candelabra _**not**_ do?

### Candelabra does not fix anything.

It will simply provide you a list of what needs to be fixed. You can format that list in several different ways with the `output` flag, but ultimately it is up to a developer to make changes.

### Candelabra does not protect you.

It may make you feel more confident and secure, but a website truly designed for _everyone_ has considerable thought put into every image `alt` and every `aria-label`. You can carelessly add a11y-friendly attributes to elements to trick a robot, but the actual people – for whom you make these changes – will continue to be left behind.

## Options

_Coming soon :)_

Use `candelabra -h` for a current list of options while development on the initial release continues.\_
