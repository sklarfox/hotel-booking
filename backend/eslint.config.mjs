import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  prettierConfig,
]
