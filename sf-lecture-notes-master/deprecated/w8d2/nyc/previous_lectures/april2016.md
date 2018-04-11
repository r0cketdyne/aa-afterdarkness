Heroku Lecture app academy docs:
https://github.com/appacademy/capstone-project-curriculum/blob/master/readings/heroku-deployment.md  
Quick Review:
What do we normally do before we can run our app in development?
  - bundle install
  - npm install
  - webpack
  - rake db:migrate, rake db:seed

So we need to set up our heroku remote location, and then mimic these actions on that side. How?  

## STEPS:
### In your app:
- Add `gem 'rails_12factor'` to your Gemfile in `group :production`, and bundle install. (This gem lets us see Heroku server logs later on)
- Make sure node_modules is in your .gitignore.
Add these lines to your package.json:
```js
  "engines": {
     // NOTE Your versions of node and npm should go here
     // NOTE Check this by running `node -v` and `npm -v` in the terminal
   "node": "4.1.1", (or whatever your version is)
   "npm": "2.1.x" (ditto)
  },
  "scripts": {
      // NOTE this will make Heroku run "webpack" after it's finished installing node_modules
   "postinstall": "./node_modules/.bin/webpack"
  }
```

Make sure git is up to date (git add -A, git commit -m "prepare to push to Heroku")

### On Heroku:
- Make a Heroku account.
- Install Heroku toolbelt, which gives you `heroku` commands in the terminal.
  - you can do this through Homebrew (`brew install homebrew`)
   or through direct download (https://toolbelt.heroku.com/)
- Go to Heroku website dashboard; create a new app and choose a name.
- Go to settings and get the heroku git url.

### In the terminal in the root folder of your app:
- heroku login (and then enter your credentials)
- git remote add heroku [heroku-git-url-here]  (like "git remote add origin")
- heroku buildpacks:set heroku/ruby  (like "bundle install")
- heroku buildpacks:add --index 1 heroku/nodejs  (like "npm install")
- git push heroku master
- heroku run bundle exec rake db:migrate
- heroku run bundle exec rake db:seed

### Let's talk about images!
Where to put images:
- old way was to put them in Public, which is where 404 page, etc lives.
  - problem: client-side caching. If I put a photo in there,
  then later put in a different photo but give it the same name,
  the browser might have cached that photo by its name and won't load it again.
- solution: fingerprinting! a technique that makes the file name
  dependent on the contents of the file.
  - Now, if I swap out my "luna.jpg"
  picture for another, but name it "luna.jpg" again, the fingerprint on the end of the file name will be different. So the browser will know not to
  use the cached version of the file.
- how do we do it?
  - put photos into app/assets and use the Rails helpers (image_url, asset_url) to generate the URL.
  - Note: this demo uses
  image in an <img> tag in an HTML view. If you want to use an image in CSS as background, just make sure the file extension is .scss so it'll get precompiled (plain .css will not).
  - then Heroku will precompile + fingerprint them for you (by running `bundle exec rake assets:precompile` behind the scenes-- don't run this yourself or it'll cause issues when Heroku runs it).

### Troubleshooting:
- for rejections on initial push:
  - use Postgres for your db (that's what Heroku uses)
  - add node_modules to your .gitignore
  - make sure git is up to date
  - look at the stack before "push rejected!"
  - could be a syntax error. Heroku is tougher to please than webpack.
- for bugs after initial deploy:
  - run `heroku logs -t` to check out server logs (this is what the gem rails_12factor gives us)
  - `heroku run rails console` will open up Rails console for you to poke around (e.g. Dog.all)
- if you're using rails image helpers (image-url, asset-url) as CSS background, then the file extension has to be .scss
- pushing to your remote git repository ("git push origin master") is totally separate from pushing to heroku ("git push heroku master"). You'll need to do both. When? Minimum at the end of each day, probably more frequently. (Good to keep heroku current, both because that's how the TAs will be assessing your progress, and because sometimes things that worked fine on localhost will not work on heroku, and you 'll need to figure out why!)
