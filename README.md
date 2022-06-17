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
gcloud run deploy nestjs-backend-contrato --source . --project unique-moon-351412 --platform=managed --region southamerica-east1 --allow-unauthenticated --add-cloudsql-instances unique-moon-351412:southamerica-east1:winn-db-contratos --set-env-vars="DATABASE_URL=mysql://web-innovation:webinnovation2022@35.247.251.243:3306/winn-db-contratos?connection_limit=1&pool_timeout=0&connect_timeout=0" --set-env-vars="PROJECT_ID=unique-moon-351412" --set-env-vars="PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCaS6o78ROgXatX\npDz+grpfokxisXnx+yibRUpwNidUmDyv8a0nHjavovb04AHZg5hoKdEYkvU4wBKo\nZm4VhVF9EWgdKMGnlUW/Qfs88hO6Mly1DQ63pa4VCbJlqD9D+FA4aetnvh0wwvR1\n3lXvHx57vdYUhU6e19hRBZi6Dg7hNaSQNXIShU2o/8XtJzn1xKRXgj+/LmL9OLY7\nnRwqdlI078KM1/UA5kV+gozZI/u0iMKG3cmXjym2mOHIK02IbLAJYCbLMI6TUZLx\nVPjYSjRToC0nGwQZBDdb+CY06SkOznsiJ8OGqtwqiLwtNHYFsKHVrtc6uUgJQvQl\nNjkWOz1dAgMBAAECggEABmPZfi0Fmo/L36Unei+Q0hLHJhPikIEjKoxhQP9v0Tg9\nfy3mSrycwtkKxZPHZSo8NB195uN4hhanpH4a010CRciO7seNfvLBgOJrKhgpH/4j\nn8NALPPkH0PtCvpqUFbRf7Hx9AnIF15jlcQU/AJma/Ut5LYBTmEduNFKBMk97YQP\nkBE+C1WXif1NNg1qJEM6s/F4RNug287HT46PbVTVpmhKkAbyr1cqs19dt9WeO96/\nch3zNG1bkD/PXVzRd459IchjdSxsa9UE4Ad3A5J3DF4rkbMyKYoSdxaZdNWGPxRW\nBFhi62cMR4d0I6BYzk/QUAIM7k+grHDKsxVMw9ddgwKBgQDSFxcm/SuwE4dDHwzg\nFCwYl9Gw781tbpTSW+wq3FeMjqZWY0GfASdmg+T1800c41pCF0ikLGHEZ3qS4aQV\nZIEYGHDJ8FsEt5wr+vtYumXA6zJAiInKVqqP9DWj9yKegkx/qk+kd072KwC8AiWT\nV/P+adD2LSAQaVbsWQmqKGw6DwKBgQC8A0y4OFR0pC8YbQ005B+NaiAOMI29oaoG\nhTwc+EOvMb6OEmY2eAyGHDPxTN4seZdzMljsiiPKrVseOxmmvgMDpQVxPOAL1qL9\nghGXp+p10Ckjuu69uNVOkn8Q1/WBQ6dO5IqUwn3GCDveXNg7w7vLIZI9g/Lisuo9\nqoB8ZcFt0wKBgCYmlUi6Pr25vh1dPRxP7XYF08lasqZFp3bPxIJAAxH+MYyMd7Ul\nI3+FQgW7yewOCSzpR4KwoIxm8iZMHVzZJGw4u/qf0Bd6NDz0VcJWDvZKf5Sidsss\nk8qSYU9GKJ46MSQZzF6kX81qH7cEeMhZ92/izVR2+1SfnG5M+OlSb9zXAoGAQhR+\n0Hir5lsWWmVpsN9E37UfEx2pk67QTX5ihGQVlevL56870YUcEb6z2umDZOpPeqOF\ncY2TytZnIhbvixVZhdxoL0aQEFkd7C/c8wqHc2T4MKCw7GmcPwNqOYdNuGMI2Mem\nlWZOQl3+fMbxEQBYbqqb9Zb8tQThI09b3Vz+QRUCgYBonwfer5bEC4gwjrOMtsWp\naahy7GGY89TmisqnBxHM66A2579ysP4BxznTAJoZjuL6z4M0REgQeK43VjyVD2G0\n0ugEMNI49E4FSL0+eoX4gLiSR6e9fHjqsbNM7sSuwiheoZmLAlBqLtp2dzFgAi71\nF2U+0cLYYEimHnPDeBUKLw==\n-----END PRIVATE KEY-----\n" --set-env-vars="CLIENT_EMAIL=229300164792-compute@developer.gserviceaccount.com" --set-env-vars="STORAGE_MEDIA_BUCKET=winn-bucket-contratos" --set-env-vars="PRIVILEGIO_API=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarAcesso/" --set-env-vars="ACESSO_API=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarAcessoCRs/OEP_EC/" --set-env-vars="IDSIGA_API_PORTAL=https://portalws.gpssa.com.br/SRH_API/api/Acesso/BuscarIdSiga" --set-env-vars="IDSIGA_API=http://localhost:8743/api/v1/cookies/idSiga" --port 3022
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

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# contratos-backend
