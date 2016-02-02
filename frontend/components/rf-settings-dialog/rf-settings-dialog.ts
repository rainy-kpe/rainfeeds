/// <reference path="../../../typings/browser.d.ts" />
"use strict";

/**
 * Settings Dialog web component
 *
 * The dialog where the settings can be changed.
 *
 * @property {String} wallpaperSource The wallpaper source
 */
@component("rf-settings-dialog")
class RFSettingsDialog extends polymer.Base {

    @property({type: Object, value: "bing", notify: true})
    source: Object;

    toggle: any = () => {
        this.$.dialog.toggle();
    };
}

RFSettingsDialog.register();