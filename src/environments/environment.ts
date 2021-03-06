// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiRoot: "http://localhost:3001",
  // apiRoot: "https://guitartonefinderapi-staging.herokuapp.com",
  amplitudeApiKey: '7303a1f3cd3faa5eaa7d2ebd58da1648',
  // postFix: '-development',
  postFix: '',
  // s3Postfix: '-staging',
  s3Postfix: '',
  stripeClientId: 'ca_BWePa4eb31deUqLyDTXduRf5DhaMHBa0'
};
