export function getEnvVar(key: string, fallback?: string) {
    const val = process.env[key]
    if (val === undefined) {
        if (fallback === undefined) {
            throw new Error(`env variable ${key} not found`)
        } else {
            return fallback;
        }
    } else {
        return val;
    }
}