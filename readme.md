# styl-ish

> discovery phase

## Commands

`npm run dev`

Access server side rendered components with custom HMR at the following urls:

> This is currently breaking as node needs to parse export statements. Also vue-server-renderer implemented seems to not work in the current setup as the context passed to render function is null (maybe it's just a mounting issue)

> Consider using playground script for now

- react: [`http://localhost:2000/react/atoms/knob`](http://localhost:2000/react/atoms/knob)
- vue: [`http://localhost:2000/react/atoms/knob`](http://localhost:2000/react/atoms/knob)



`npm run playground`

start playground to test components via webpack-dev-server:

- react: [`http://localhost:8080/react.html`](http://localhost:8080/react.html)
- vue: [`http://localhost:8080/vue.html`](http://localhost:8080/react.html)


