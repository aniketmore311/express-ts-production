import { getEnvVar } from '../../../../src/lib/utils/getEnvVar'
import { expect, describe, it, beforeEach } from "@jest/globals";

describe("getFromEnv", () => {

    it("should return the environment variable", () => {
        process.env.TEST_KEY1 = "test_value"
        const val = getEnvVar("TEST_KEY1")
        expect(val).toEqual("test_value")
    })

    it("should return the alt value if environment variable is not present", () => {
        const val = getEnvVar("TEST_KEY2", "default_value")
        expect(val).toEqual("default_value")
    })

    it("should throw an error if environment variable is not present and default value is not provided", () => {
        expect(() => getEnvVar("TEST_KEY3")).toThrow()
    })
})