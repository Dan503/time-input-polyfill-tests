import { Segment } from "@time-input-polyfill/utils"
import { cySelectSegment, forcedPolyfillId } from "."

export const demoSiteUrl = 'http://localhost:3000'

interface LoadTestPageParams {
	htmlFileOrUrl?: string
	segment?: Segment
	polyfillId?: string
}

export const loadTestPage = ({ segment, htmlFileOrUrl = demoSiteUrl, polyfillId = forcedPolyfillId }: LoadTestPageParams = {}) => {
	return cy.visit(htmlFileOrUrl).wait(100).then(() => {
		if (segment) {
			return cySelectSegment(segment)
		}
		return cy.get(`#${polyfillId}`).wait(10)
	})
}
