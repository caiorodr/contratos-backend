<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Deploy Cloud run GCP

```bash
gcloud run deploy teste-backend --source . --project focused-sentry-353319 --platform=managed --region southamerica-east1 --allow-unauthenticated --add-cloudsql-instances focused-sentry-353319:southamerica-east1:db-winn-contratos --set-env-vars="mysql://web-innovation:webinnovation2022@34.95.178.210:3306/db-winn-contratos?connection_limit=1&pool_timeout=0&connect_timeout=0" --set-env-vars="PROJECT_ID=unique-moon-351412" --set-env-vars="PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCe65UhMuHcdpXP\ncA60/M4QyToHl5BCJTHurefmjkqq7AvM9GApdzH0HbR0zy0iHidy3VO+98DXjRDg\n7X3/3PRx2B3IDgCjv+dHCPzyOaq7eiDS18PkKEp6Ya5rF4aAgynrFfexr7jqdnL7\nCABxgSKC51/NcAlS6J/tLfUcjQijcTxP3jnF+qdFMR+qkEFevHTRF3rbZ1+m/AmJ\n8PL5oWwskmL9OuewNHYTAnswxRf5owfn5Hz5C9E8K3/P8zTLpmSkxlEYnisxC3Fj\nIl5cgEh3+hSv5xY4V7oF3HWJD7/Hm+ENT8l4WR/GW04T2plvLxl+aR2PXBgqn+bo\nbvSs2kr7AgMBAAECggEAG1EBPEijvCKCE7r+PCvsO8Rq/h0WRdhg4dbwspeozAJw\n8NTcpqP/aSel+iIWbvPh8gOLPpsVgbeUvCT2cIGJXvw3+kg14e+9kF9CI1y4NSuD\n8tn1qQUn8CtUMMJFc1eYX/lRrzA2R87+apnwgZIh3YBp3kUwxRiJTNqGdFblsjoh\n/zAu4LEP+yez1KSgL45tMQqkF9dXmeJ/LAo9JWDoguN3gjqjzrAexAra1ZutrDl2\nQhwL5SJnJqB0eNBl0gRh7grzkIk1YWw/7vamorNHwsXo94NFkPtkQn3mEUM1Hrcr\ne3cj2FBaprPrAkZVf6L4qvpKQAEHoMTkiDKrOVYsAQKBgQDbU0mCXCzxIoMkrKOs\nUMAGlHhSaoQA1SsoYiMe+aPTRg4LNHDHdcvPbdmvR0WeceKOZxMiWqwF9yFrqfT0\nsz5rx+cfkWZOLR0K5bfBYfHkAWr0NTVO6WrTk4eCu/EWPVwbR8R3P7TwBPad+Gf7\n86J0vvPY4UpjkQMAHA6T4LvOAQKBgQC5foUUed8mMFJrs4i1aUg/b1NX7QDtB3IA\nEoYaXbVVXZkJXcuxb2IM4ePOMmOPzaEDC9I9exM55ULpjh+NGg97LrVMCZkhG80Z\niY+qGx+YqWz6CpAHnXEtq5K5x6jSuE5+d9UaX/85hqiHg/nhi6DREDOtkrObyeRp\nPT+NoldQ+wKBgBsneqhrJR1NupLl1PXWoY+u/h6mFWXM/qTnUZXaLpBP0hlNCtGH\nIg6yeQscdeAiFXywAkx0kWvDpx2fUzagoo/RlinwZIw1Ra09t7x3le02x7kohUsZ\n1yIO1+41uqmYOzkdb5OcDZjR5H62bJljFrABnEszyXP+VjLDRoLEhjwBAoGAIon/\nZ6eluGuo/Srp2rWm4UDuaOHVmU0YmhDY7ZHjUOjjtQ3E/t35iOKK03sodL9aKsIJ\nvK7tDou04N4428ItfcddtLHY1IRjtUya9pakVH2/r/NFjFVxnIplALi/o7Tz0LKp\neIbFdEWxncIiRjAEmskEhl5ZmTmHkVz5N3sx/P8CgYEAuniMYCOY6uSOXzZUXZdW\nhEZwBWkfyk46ijd2JDT5DzvHK0GPqUrndEy1ubDbttvlVcG2UdAWI6BG2hvx6hTh\nRnVI8z0bnKQyfsLYjtphvqC6pxFhOBJlPiuQot10iT7C/r4rES6PZlQ3WCowJV++\nNBMBsGejZRy/R2nKGRofB9Q=\n-----END PRIVATE KEY-----\n" --set-env-vars="CLIENT_EMAIL=storage@focused-sentry-353319.iam.gserviceaccount.com" --set-env-vars="STORAGE_MEDIA_BUCKET=storage-winndev" --set-env-vars="PRIVILEGIO_API=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarAcesso/" --set-env-vars="ACESSO_API=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarAcessoCRs/OEP_EC/" --set-env-vars="IDSIGA_API_PORTAL=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarIdSiga" --set-env-vars="IDSIGA_API=http://localhost:8743/api/v1/cookies/idSiga" --port 3022
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - WEB INNOVATION - WINN

## License

Nest is [MIT licensed](LICENSE).

# contratos-backend
