module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  /**
   * <type>(<scope>): <subject>
   *
   * <body>
   *
   * <footer>
   *
   * eg: `
   *      feat(dashboard): update statistic orders
   *
   *      update statistic total orders in current month
   *
   *      note: npm i chart.js
   * `
   */
  rules: {
    'body-leading-blank': [2, 'always'], // always body leading blank, if dont pass throw error(2)
    'footer-leading-blank': [1, 'always'], // always footer leading blank, if dont pass throw waring(1)
    'header-max-length': [2, 'always', 108], // always header length < 108, if dont pass throw error(2)
    'subject-empty': [2, 'never'], // never subject empty, if dont pass throw error(2)
    'type-empty': [2, 'never'], // never type empty, if dont pass throw error(2)
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ] // always type enum included in this following array, if dont pass throw error(2)
  }
};
