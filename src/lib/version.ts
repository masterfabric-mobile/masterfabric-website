import packageJson from '../../package.json'

/** Full semver from package.json. Used by the masterfabric-version meta tag. */
export const SITE_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || packageJson.version

const [major = '0', minor = '0'] = SITE_VERSION.split('.')

/** Splash label: "v" plus major.minor, derived from package.json. */
export const SITE_VERSION_LABEL = `v${major}.${minor}`

/** Short commit SHA of the build (set in next.config.js), or '' when unknown. */
export const SITE_COMMIT_SHA = process.env.NEXT_PUBLIC_COMMIT_SHA || ''

export const REPO_URL = 'https://github.com/masterfabric-mobile/masterfabric-website'
