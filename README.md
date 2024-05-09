# upstreamcode.github.io

The main website for Upstream Code.

## Development

Set up developer environment: [Mac](https://desiredpersona.com/install-jekyll-on-macos/) | [Windows](https://jekyllrb.com/docs/installation/windows/).  Once installed, make sure you are using Ruby version 3.2.3.  Now install all the required libraries:

```
bundle install
```

Then you can start up the local server with: `bundle exec jekyll serve`.

### Code Quality

To verify your code meets certain code standards, and to protect from accidentally creating common mistakes, we provide linters to verify your code. First you will need to install the linters using NodeJS and npm. Run the following command from the terminal in the project's root directory:

```
npm install
```

Now you can test your code quality by running this command:

```
npm run lint
```

Happy coding!
