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
gcloud run deploy nestjs-backend-contrato --source . --project i-hexagon-349014 --platform=managed --region southamerica-east1 --allow-unauthenticated --add-cloudsql-instances i-hexagon-349014:southamerica-east1:web-innovation-2022 --set-env-vars="DATABASE_URL=mysql://web-innovation-2022:webinnovation2022@35.247.223.140:3306/web-innovation-2022?connection_limit=1&pool_timeout=0&connect_timeout=0" --set-env-vars="PROJECT_ID=i-hexagon-349014" --set-env-vars="PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2+hzqTEUfIJAQ\n2P1KsRgwtx8EsWvarj4sFxYSmgACJukvJ+dUUT9Ada3gyqyEaTFtafQ5VauHgksm\nYxPAOkNDLkEaaOnEqZNdMvOqrR06yK0ceFCzSZYwukzGPFOQvVMBLVBGzJcmnHgy\nfc0vDndEJaa7p3s9UUNHjLmPHt+KvVSlDi1Io0Mhowo5C52nTgJrZMcXKnzUAt/Q\nOA6K3ZB5pU879fZO43QYi1KZHQrUERggVAUfHgK20Dyoc/2zD/bEeYI47pVxmG6D\nhb75dtap18xrLsteuv+GRj+v/At6V2mFX51fQKcnE9HRQAGQ6YL53wO6HKw4xVHF\nBuA1/niBAgMBAAECggEACoDc/A4Ywaqq2my6TXlQ/Crm2uwcVtc9tmY03Ch+66C0\nLgLKYqqvSNH4gzjfIlKvhapZXJkwWXz/N1rknVo61jZngk6XbLSXQvhTyG5biS5P\n0ZyOdVw6BN4M3ixEV8CmbSDexNGls4+zzqIuDw9zhTPsGEWK64AorojDdhW9m0cd\n79qE1iBwKhesOJJlUpRacrH1aWa2Q2S7mCazvQNDsetEPAE0L09RkUePc1fxzTSk\nPFkxnty4uxmqyX1GZ/dGbVGjGDCh4WsPPoYHBI43MVajOKBgLRwsrnwQdjF3egXf\nYAvypIjtYzReMEMmfK8xLJTQIlwU1qxP2NdlzFA4YQKBgQD2fqwAR+WQnsxqUb2j\nDP43xChuQSpQeq91BxnG/VE6or0dZrhZwOGd/NbgDkNGHsfjZ4Iye6/CS1HLfRkR\nUvvyu2pGGO3fg0GzY6UWdlbzLif9GrCibtmIOvQ5Vk64TP9scvmnaNwFY6G//SOl\nk6x1wHTfFY2uTHRMB4uY8vfdNQKBgQC+CGk0t28DUSx7I/ZWz4xJBEyJDuGS9aJs\nOPhzqwNfbAE56Y62g7KRVo74iYflSxl5P3WM89dYyyTC4qy5qZe7UZhksaViXQ72\nWv5b2XZ2xXacU+w1W1/HaTYPc4pex7kROEeQZpEkIt3mga40iDdYXZ4VdMYHq7pT\npU67GclznQKBgQD1+7k32ofMB7ykyQe/BENZcWaLiHpqr9QSrFBcFQWPx0GEarLD\n1skQOXZRR8p42lTNqcjzCh1+fl2U/TUb5b1KIR9P7qbLa5gQJftkbBofOctsOMtW\nfdqVqYd5BJkwMJ6hIifjmbAfrKqJBlwhazoqlDHNQhwOeXuBN/JmYulZlQKBgAh2\nyXDOpsQoDmohrOwq7F2oMlx8bDGmfSiC1RYZzNmoLtnMfE3GyeJNT6rkPUhKMwVC\nfVLc3X+X9Lg1bmoKkraGKNp7Sxl5eZwha2jd47fgjari1gd+XWK9XeoMRGJ6VNTe\ng9l7qAVLBEUrC35NfuGRsePUwqk+zdrB5yLQQDfFAoGBAKs7fbm8IbHuBFTAi3NH\nUzjx84DpkHL1h+FoeDlUSpO/+0SvaNNJylRG9QaYCIWYTMm8eDy3X+jxGt1dXpId\nXQUfDnaOTg0lvV/DnHJo3qakMg0w3T8bokCmIqBZbvVSZ9Y9dCNjiTav9rcppOTc\nIjoBSieL54espeGsAZe9/QPY\n-----END PRIVATE KEY-----\n" --set-env-vars="CLIENT_EMAIL=i-hexagon-349014@appspot.gserviceaccount.com" --set-env-vars="STORAGE_MEDIA_BUCKET=dev-web-innovation"
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
