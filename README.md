# candelabra

<img src="./candelabra-logo.png" alt="Candelabra Logo - Lit candles on a 6-prong candelabra glowing in the dark" width="128px"/>

## What does Candelabra do?

Candelabra is a web crawler designed to generate a thorough sitemap and audit each page for valid, semantic HTML and accessibility violations. Using Candelabra, you can check any website for accessibility violations. More importantly, you can point it to local servers and other developer environments to test your code before you deploy.

It works out of the box for any website that doesn't require authentication on entry. This means it can audit any JavaScript-rendered website including those built with the popular front-end frameworks: React, Vue, Ember, Angular, etc.

Want to read more about Candelabra? [Check out the wiki](https://github.com/sanctuarycomputer/candelabra/wiki).

## How do I use Candelabra?

Candelabra was designed to require no configuration. Simply install the package and fire it up. For detailed usage, see [Options](#options).

```bash
# install the package
yarn global add candelabra

# run the utility
candelabra <entry-url>
```

## Options

| Flag                  | Description                                             |
| --------------------- | ------------------------------------------------------- |
| -V, --version         | output the version number                               |
| -o, --output <path>   | file path to output JSON, defaults to displaying inline |
| -g, --groupBy <group> | SEVERITY / PAGE / RULE, defaults to SEVERITY            |
| -h, --help            | output usage information                                |

Use `candelabra -h` for a current list of options while development continues.

## Contributing

Simply clone the repository and get to work! Create pull requests against the repository to merge code in.

```bash
# clone the repo
git clone https://github.com/sanctuarycomputer/candelabra.git

# build the changes
yarn build

# run developer instance against a website
node lib/index.js <entry-url> <options>
```

Feel free to make an issue if something isn't working properly or if you think there's a way to enhance the experience.
