import nock from "nock"

import "./utils/path" // Import to enable String.prototype.toPosix().

// Disable network requests by default for all tests.
nock.disableNetConnect()

// simple-git blocks operations when editor-related variables are present
// unless allowUnsafeEditor is enabled. Keep test env deterministic.
delete process.env.EDITOR
delete process.env.GIT_EDITOR
delete process.env.VISUAL

export function allowNetConnect(host?: string | RegExp) {
	if (host) {
		nock.enableNetConnect(host)
	} else {
		nock.enableNetConnect()
	}
}

// Global mocks that many tests expect.
global.structuredClone = global.structuredClone || ((obj: any) => JSON.parse(JSON.stringify(obj)))
