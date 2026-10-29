import packageJson from '../../package.json'

/** Full semver from package.json. Used by the masterfabric-version meta tag. */
export const SITE_VERSION = packageJson.version

const [major = '0', minor = '0'] = SITE_VERSION.split('.')

/** Splash label: "v" plus major.minor, derived from package.json. */
export const SITE_VERSION_LABEL = `v${major}.${minor}`
