/// <reference path="../../../typings/browser.d.ts" />
"use strict";

/**
 * Rss Feed Item web component
 *
 */
@component("rf-rss-item")
class RFRssItem extends polymer.Base {

    @property({type: Object})
    entry: Object;

    @property({type: String, value: ""})
    image: String;

    @property({type: String, value: ""})
    link: String;

    @observe("entry")
    _entryChanged(newVal: any, oldVal: any): void {
        if (newVal) {
            const imgUrl: string[] = newVal.content.match(/src=\"(http:\/\/.+?.jpg)/);
            if (imgUrl && imgUrl.length > 1) {
                this.set("image", imgUrl[1]);
            } else {
                this.set("image", "");
            }
            const link: string[] = newVal.content.match(/<span><a href=\"(.+?)\">\[link\]<\/a><\/span>/);
            if (link && link.length > 1) {
                this.set("link", link[1]);
            }
        }
    }

    _formatDate(date: string): string {
        const d: Date = new Date(date);
        const diff: number = moment(d).diff(moment());

        this.set("entry.status", Math.abs(diff) < 60 * 60 * 1000 ? "new" : "");

        return moment.duration(diff).humanize();
    }

    _formatSnippet(snippet: string): string {
        snippet = _.unescape(snippet);

        if (snippet.lastIndexOf("Comments", 0) === 0) {
            return "";
        }
        return snippet.replace('[link]', '').replace('[comments]', '');
    }
}

RFRssItem.register();
