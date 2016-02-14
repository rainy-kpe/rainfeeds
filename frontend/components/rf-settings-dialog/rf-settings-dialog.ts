/// <reference path="../../../typings/browser.d.ts" />
"use strict";

/**
 * Settings Dialog web component
 *
 * The dialog where the settings can be changed.
 */
@component("rf-settings-dialog")
class RFSettingsDialog extends polymer.Base {

    // The firebase authentication data
    @property({type: Object})
    auth: FirebaseAuthData;

    // The name of the wallpaper provicer
    @property({type: String, value: "bing", notify: true})
    source: String;

    // The read settings callback
    _authCallBack: any;

    // The firebase instance
    _firebase: Firebase = new Firebase('https://sweltering-fire-9601.firebaseio.com/settings');

    /**
     * Toggles the settings dialog visibility
     * @returns void
     */
    toggle: any = (): void => {
        this.$.dialog.toggle();
    };

    /**
     * Registers the handlers
     * @returns void
     */
    attached(): void {
        // When authentication changes read the settings from the database
        this._firebase.onAuth((authData: FirebaseAuthData) => {
            if (authData) {
                this._authCallBack = this._firebase.child(authData.uid).on("value", (snapshot: FirebaseDataSnapshot) => {
                    if (snapshot.val() && snapshot.val().wallpaper) {
                        this.set("source", snapshot.val().wallpaper);
                    }
                }, (error: any) => {
                    console.log("Reading the settings failed: " + error.code);
                });
            } else if (this.auth && this._authCallBack) {
                // Remove the listener if the user logs out
                this._firebase.child(this.auth.uid).off("value", this._authCallBack);
            }
            this.set("auth", authData);
        });
    }

    /**
     * Observes the changes in "source" property. Saves the value to the database.
     * @param  {any} newVal The new value
     * @param  {any} oldVal The old value
     * @returns void
     */
    @observe("source")
    _sourceChanged(newVal: any, oldVal: any): void {
        if (this.auth && this._firebase) {
            this._firebase.child(this.auth.uid).set({
                wallpaper: newVal
            }, (error: any) => {
                if (error) {
                    console.log('Writing the settings failed: ' + JSON.stringify(error));
                }
            });
        }
    }
}

RFSettingsDialog.register();
