<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]
[![ProtonMail][protonmail-shield]][protonmail-url]

# poetrypengyou.com

_Péngyou_ (朋友) is a Mandarin word meaning "friend.” **Poetry Pengyou** is a web app that allows users to explore classic Tang dynasty (~600-900 CE) poetry in Simplified and Traditional Mandarin and in English.

This app is live at [poetrypengyou.com](https://poetrypengyou.com/). It was tested in Safari on mobile and Chrome on desktop. The styling is not 100% perfect on all platforms but all functions are working.

Currently the database only contains a small sample of poems. More poems will be added soon.

## How to Use

- Tap or click a poem on the **Poem Select** page to see the full poem
- Tap or click the **简/繁** button to switch between Simplified or Traditional Mandarin
- Tap or click the **A** button to see the poem in English
- Tap or click a word to see the word's English translation, alongside its pinyin (Chinese pronunciation). The words are colored according to their tone.

## Built With

- [![React][react.js]][react-url]
- [![Redux][redux.js]][redux-url]
- [![Redux-Saga][redux-saga.js]][redux-saga-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- [![Express][express.js]][express-url]
- [![Node][node.js]][node-url]
- [![Markdown][markdown]][markdown-url]
- [![React-Router][react-router]][react-router-url]
- [![Heroku][heroku]][heroku-url]
- [![NPM][npm]][npm-url]
- [![OpenCC-JS][opencc-js-shield]][opencc-js-url]
- [![LightSail][lightsail-shield]][lightsail-url]

A full list of dependencies can be found in `package.json`.

English translations are by Witter Bynner.

## Roadmap

- [ ] Fix up some styling issues
- [ ] Make the code more DRY!
- [ ] Allow two-character word lookups
- [ ] Add audio readings of the poems
- [ ] Add other styles of poetry
- [ ] Improve accessibility by adding light mode and user-selectable tone colors
- [ ] Add search and favorites 
- [ ] Reduce unecessary side-effects
- [ ] Add more loading bars

See the [Projects page](https://github.com/users/sdnii/projects/2) for a full list of planned features.

## Directory Structure:

- `src/` contains the React application
- `build/` contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Contact

Carlos Kelley - [LinkedIn](https://linkedin.com/in/carloskelley) - [Protonmail](mailto:carloskelley@protonmail.com)

Project Link: [Poetry Pengyou](https://github.com/sdnii/poetrypengyou)

## License

Distributed under the MIT License.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/carloskelley
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[redux-saga.js]: https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999
[redux-saga-url]: https://redux-saga.js.org/
[markdown]: https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white
[markdown-url]: https://duckduckgo.com/?q=markdown&t=brave&ia=web
[heroku]: https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white
[heroku-url]: https://heroku.com
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://react-router.js.org/
[lightsail-shield]: https://img.shields.io/badge/Amazon%20Lightsail-232F3E?style=for-the-badge&logo=amazon%20lightsail&logoColor=white
[lightsail-url]: https://lightsail.aws.amazon.com/
[protonmail-shield]: https://img.shields.io/badge/ProtonMail-8B89CC?style=for-the-badge&logo=protonmail&logoColor=white
[protonmail-url]: mailto:carloskelley@protonmail.com
[opencc-js-shield]: https://img.shields.io/badge/OpenCC--JS-1.0.4-bluez
[opencc-js-url]: https://github.com/nk2028/opencc-js

