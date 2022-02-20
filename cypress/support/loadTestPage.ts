import { Segment } from "@time-input-polyfill/utils"
import { cySelectSegment, forcedPolyfillId } from "."

export const demoSiteUrl = 'http://localhost:3000'

export interface LoadTestPageParams {
	url?: string
	segment?: Segment
	polyfillId?: string
}

export const loadTestPage = ({ segment, url = demoSiteUrl, polyfillId = forcedPolyfillId }: LoadTestPageParams = {}) => {
	return cy.visit(url).wait(100).then(() => {
		if (segment) {
			return cySelectSegment(segment)
		}
		return cy.get(`#${polyfillId}`).wait(10)
	})
}
