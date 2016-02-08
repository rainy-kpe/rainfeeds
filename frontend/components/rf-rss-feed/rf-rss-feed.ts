/// <reference path="../../../typings/browser.d.ts" />
"use strict";

/**
 * Rss Feed web component
 *
 */
@component("rf-rss-feed")
class RFRssFeed extends polymer.Base {

    @property({type: String})
    feed: Object;

    @property({type: Object})
    result: any;

    @property({type: Object, notify: true})
    title: any;

    old: Set<string> = new Set<string>();

    /**
     * Observer for the feed changes.
     */
    @observe("result")
    _resultChanged(newVal: any, oldVal: any): void {
        if (newVal) {
            this.title = newVal.title;

            if (this.old.size > 0) {
                newVal.entries.map((e: any) => {
                    e.status = this.old.has(e.title) ? "" : "new";
                });
            }
            this.old.clear();

            // Update feed every 15 minutes
            this.async(() => this.$.feed._fetchFeeds(), 15 * 60 * 1000);
        }
    }
}

RFRssFeed.register();
