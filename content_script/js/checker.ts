/**
 * # The MIT License (MIT)
 *
 * Copyright (c) 2017 Nasreddine HOURIA
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Shield Icons by paomedia (https://github.com/paomedia/small-n-flat)
 * licensed under CC0 which is available here: https://github.com/paomedia/small-n-flat/blob/master/LICENSE
 */

declare var chrome;

/**
 * settings class
 */
class Settings {
    public prefRep = true;
    public prefBackpack = true;
    public prefTf2tools = true;            //http://www.tf2tools.net/id/
    public prefTf2b = true;                //https://tf2b.com/tf2
    public prefFabricator = true;          //http://fabricator.tf/profile/
    public prefDotaBP = true;
    public prefSteamgifts = true;
    public prefCSGOValue = true;
    public prefGoogle = true;
    public prefBazaar = true;
    public prefCsgoLounge = true;
    public prefDota2Lounge = true;
    public prefTf2Outpost = true;
    public prefTf2TradingPost = true;





}

/**
 * Steam user object
 *
 * @type {{SteamID64: string, VacBanned: string, TradeBanState: string, IsLimitedAccount: string, Privacy: string}}
 */
class User {
    public steamID64 = '';
    public vacBanned = '';
    public tradeBanState = '';
    public isLimitedAccount = '';
    public privacy = '';
}

/**
 * Icon info
 */
class IconInfo {
    public height: number;
    public width: number;
    public src: string;
    public alt: string;
    public className: string;
    public style: string;

    constructor(height: number, width: number, source: string, altText: string, className: string, style: string) {
        this.height = height;
        this.width = width;
        this.src = source;
        this.alt = altText;
        this.className = className || '';
        this.style = style || '';
    }
}

class Helpers {

    /**
     * Create a custom info box on a Steam profile
     *
     * @param title title of the infobox
     */
    static createInfoBox(title: string) {

        const link = <HTMLAnchorElement>document.createElement('a');
        link.href = '#';
        link.id = 'src_rep';
        link.innerText = ' Checking Steamrep....';
        link.insertBefore(Helpers.createImageElement(Icons.Loading), link.firstChild);

        const b = document.createElement('b');
        b.textContent = 'Reputation : ';

        const p = <HTMLParagraphElement>document.createElement('p');
        p.appendChild(Helpers.createImageElement(Icons.fiSteamrep));
        p.appendChild(b);
        p.appendChild(link);

        const srcDiv = <HTMLDivElement>document.createElement('div');
        srcDiv.id = 'steamrep_checker';
        srcDiv.appendChild(p);

        const sccbg = <HTMLDivElement>document.createElement('div');
        sccbg.className = 'showcase_content_bg showcase_notes';
        sccbg.appendChild(srcDiv);

        const ctsc = <HTMLDivElement>document.createElement('div');
        ctsc.className = 'customtext_showcase';
        ctsc.appendChild(sccbg);

        const profileCustomBlockDiv = <HTMLDivElement>document.createElement('div');
        profileCustomBlockDiv.className = 'profile_customization_block';
        profileCustomBlockDiv.appendChild(ctsc);


        const profileCustomHeaderDiv = <HTMLDivElement>document.createElement('div');
        profileCustomHeaderDiv.id = 'profile_customization_header';
        profileCustomHeaderDiv.className = 'profile_customization_header ellipsis';
        profileCustomHeaderDiv.textContent = title;

        const infobox = <HTMLDivElement>document.createElement('div');
        infobox.setAttribute("id", "src_profile_customization");
        infobox.className = "profile_customization";
        infobox.appendChild(profileCustomHeaderDiv);
        infobox.appendChild(profileCustomBlockDiv);


        const elements = document.getElementsByClassName('profile_customization_area');

        if (elements.length > 0) {
            elements[0].insertBefore(infobox, elements[0].firstChild)
        } else {
            const customizationAreaDiv = <HTMLDivElement>document.createElement('div');
            customizationAreaDiv.className = 'profile_customization_area';

            const leftCol = document.querySelector('.profile_leftcol');

            customizationAreaDiv.appendChild(infobox);
            leftCol.insertBefore(customizationAreaDiv, leftCol.firstElementChild);

            const clearDiv = <HTMLDivElement>document.createElement('div');
            clearDiv.style.clear = 'both';

            document.querySelector('.profile_content_inner').appendChild(clearDiv);
        }
    }

    /**
     * create an image element
     * @param image
     * @returns {Element}
     */
    static createImageElement(image: IconInfo): HTMLImageElement {
        let imageElement = <HTMLImageElement>document.createElement("img");
        imageElement.height = image.height;
        imageElement.width = image.width;
        imageElement.src = image.src;
        imageElement.alt = image.alt;
        imageElement.className = image.className || "";
        imageElement.style.cssFloat = image.style || "";
        return imageElement;
    }

    /**
     * Create a warning dialog in case the Steam user is a known scammer
     */
    static createScammerWarningDialog() {

        const scammerWarningDialog = <HTMLDivElement>document.createElement('div');
        scammerWarningDialog.id = "openModal";
        scammerWarningDialog.setAttribute("class", "modalDialog");

        const warningDialogInnerDiv = <HTMLDivElement>document.createElement('div');

        const dialogCloseLink = <HTMLAnchorElement>document.createElement('a');
        dialogCloseLink.setAttribute("class", "close");
        dialogCloseLink.href = "javascript:";
        dialogCloseLink.title = "Close";
        dialogCloseLink.textContent = "\u2716";
        dialogCloseLink.addEventListener('click', () => {
            document.getElementById("openModal").style.opacity = "0";
            document.getElementById("openModal").style.pointerEvents = "none";
        });

        const dialogTitle = <HTMLHeadingElement>document.createElement('h2');
        dialogTitle.textContent = 'WARNING: SCAMMER';

        const dialogFirstParag = <HTMLParagraphElement>document.createElement('p');
        dialogFirstParag.textContent = ' This user has been marked as a scammer on SteamRep.com. ';
        dialogFirstParag.insertBefore(Helpers.createImageElement(Icons.ShieldRedBig), dialogFirstParag.firstChild);

        warningDialogInnerDiv.appendChild(dialogCloseLink);
        warningDialogInnerDiv.appendChild(dialogTitle);
        warningDialogInnerDiv.appendChild(dialogFirstParag);
        const dialogSecondParag = <HTMLParagraphElement>document.createElement('p');
        dialogSecondParag.textContent = "To protect yourself and prevent thieves from profiting, do not trade " +
            "with this person. Players shouldn't be encouraged to steal. Supporting them can hurt your reputation";
        warningDialogInnerDiv.appendChild(dialogSecondParag);

        scammerWarningDialog.appendChild(warningDialogInnerDiv);

        document.body.insertBefore(scammerWarningDialog, document.body.children[0]);
    }

    /**
     * Add a link to the external websites links list
     * @param href website url
     * @param image image element
     * @param text link text
     * @returns {Element} li element
     * todo add steambase64 id to href in calls to this method
     */
    static addExtLink(href: string, image: HTMLImageElement, text: string): HTMLLIElement {
        const element = <HTMLLIElement>document.createElement('li');
        const link = <HTMLAnchorElement>document.createElement('a');
        link.href = href;
        link.textContent = ' ' + text;
        link.insertBefore(image, link.firstChild);
        element.appendChild(link);

        return element;
    }
}

let Icons = {
    ShieldGreen: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_green_24.png"), "trusted", '', ''),
    ShieldYellow: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_yellow_24.png"), "caution", '', ''),
    ShieldRed: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_red_24.png"), "scammer", '', ''),
    Loading: new IconInfo(16, 16, chrome.extension.getURL("icons/loading.gif"), "loading", "loading", ''),
    fiRep: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/rep.png"), "Rep.tf", "src_icon", ''),
    fiTF2Bp: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/bp.tf.png"), "Backpack.tf", "src_icon", ''),
    prefTf2tools: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/tf2tools.png"), "Tf2tools.net", "src_icon", ''),
    prefTf2b: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/tf2b.png"), "Tf2b.com", "src_icon", ''),
    prefFabricator: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/fabricator.png"), "Fabricator.tf", "src_icon", ''),
    fiDota2bp: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/d2.bp.tf.png"), "D2.backpack.tf", "src_icon", ''),
    fiSteamgifts: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/st.png"), "Steamgifts", "src_icon", ''),
    fiCSGOValue: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/CSGOValue.png"), "CSGOValue", "src_icon", ''),
    fiGoogle: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/google.png"), "Google", "src_icon", ''),
    fiBazaar: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/bazaar.png"), "Bazaar.tf", "src_icon", ''),
    fiCsgoLounge: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/csgo_lounge.png"), "CSGO Lounge", "src_icon", ''),
    fiDota2Lounge: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/dota2_lounge.png"), "Dota 2 Lounge", "src_icon", ''),
    fiTf2Outpost: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/tf2outpost.png"), "Outpost", "src_icon", ''),
    fiTradingPost: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/tf2tp.png"), "Tf2 Trading Post", "src_icon", ''),
    fiSteamrep: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/sr.png"), "Steamrep", "src_icon", ''),
    ShieldRedBig: new IconInfo(128, 128, chrome.extension.getURL("icons/shield_red_128.png"), "scammer", "", "left")
};

/**
 * An example response from the steamrep api looks like this:
 *  "steamrep":{
 *      "flags":{
 *         "status":"exists"
 *   },
 *   "steamID32":"STEAM_0:0:XXXXXXXX",
 *   "steamID64":"XXXXXXXXXXXXXXXXXX",
 *   "reputation":"SMT MIDDLEMAN"
 * }
 */
interface ISRResponse {
    steamrep: ISteamRep;
}

interface ISteamRep {
    steamID32: string;
    steamID64: string;
    reputation: string;
    flags: IFlags;
}

interface IFlags {
    status: string;
}

class SteamRepChecker {

    user: User;
    settings: Settings;
    reputation: string;


    constructor() {
        this.user = new User();
        this.settings = new Settings();
        this.reputation = "";
    }

    run() {
        Helpers.createInfoBox("SteamRep Checker Report");
        this.getSteamInfo();
    }

    /**
     * retrieve the SteamID64 and the privacy level of a Steam profile
     */
    getSteamInfo() {
        const profileInfoUrl: string = document.location.href + '/?xml=1';

        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: profileInfoUrl
        }, (responseText) => {
            if (responseText !== -1) {
                const parser = new DOMParser();
                const doc: XMLDocument = parser.parseFromString(responseText, "application/xml");

                let prop = doc.getElementsByTagName("steamID64");
                if (prop.length > 0) {
                    this.user.steamID64 = prop[0].textContent;
                }

                prop = doc.getElementsByTagName("isLimitedAccount");
                if (prop.length > 0) {
                    this.user.isLimitedAccount = prop[0].textContent;
                }

                prop = doc.getElementsByTagName("tradeBanState");
                if (prop.length > 0) {
                    this.user.tradeBanState = prop[0].textContent;
                }

                prop = doc.getElementsByTagName("vacBanned");
                if (prop.length > 0) {
                    this.user.vacBanned = prop[0].textContent;
                }

                prop = doc.getElementsByTagName("privacyState");
                if (prop.length > 0) {
                    this.user.privacy = prop[0].textContent;
                }

                this.displaySteamInfo();
                this.querySteamRep();
            } else {
                document.getElementById('src_rep').textContent = 'Error getting the SteamID64';
            }
        });
    }

    /**
     * Display the the SteamID64, privacy level and adds links to 3rd party websites
     * to ease the background check
     */
    displaySteamInfo() {
        const src_rep = <HTMLAnchorElement>document.getElementById('src_rep');
        src_rep.href = "https://steamrep.com/profiles/" + this.user.steamID64;

        let privacy = "";
        switch (this.user.privacy) {
            case "public":
                privacy = "Public";
                break;
            case "friendsonly":
                privacy = "Friends Only";
                break;
            case "usersonly":
                privacy = "Users Only";
                break;
            case "private":
                privacy = "Private";
                break;
        }

        const srcElement = <HTMLDivElement>document.getElementById('steamrep_checker');

        const privacyParag = <HTMLParagraphElement>document.createElement('p');
        const privacyBold = document.createElement('b');
        privacyBold.textContent = 'Profile privacy : ';
        privacyParag.appendChild(privacyBold);
        privacyParag.appendChild(document.createTextNode(privacy));

        const permalinkParag = <HTMLParagraphElement>document.createElement('p');

        const permalinkBold = document.createElement('b');
        permalinkBold.textContent = 'Permalink : ';

        permalinkParag.appendChild(permalinkBold);

        const permalink = <HTMLAnchorElement>document.createElement('a');
        permalink.textContent = 'https://steamcommunity.com/profiles/' + this.user.steamID64;
        permalink.href = 'https://steamcommunity.com/profiles/' + this.user.steamID64;
        permalink.id = 'src_profile_permalink';
        permalinkParag.appendChild(permalink);

        const pendingReportsParag = <HTMLParagraphElement>document.createElement('p');

        const boldPendingReports = document.createElement('b');
        boldPendingReports.textContent = 'Pending reports : ';

        pendingReportsParag.appendChild(boldPendingReports);

        const pendingReportsLink = <HTMLAnchorElement>document.createElement('a');
        pendingReportsLink.textContent = 'Search SteamRep Forums';
        pendingReportsLink.id = 'src_pending_reports';
        pendingReportsLink.href = 'https://forums.steamrep.com/search/search/?keywords=' + this.user.steamID64 + '&o=date';
        pendingReportsParag.appendChild(pendingReportsLink);

        const id64Box = <HTMLParagraphElement>document.createElement('p');

        const id64Label = <HTMLLabelElement>document.createElement('label');
        id64Label.textContent = 'SteamID64 : ';
        id64Label.htmlFor = 'src_sid64tb';

        const id64Input = <HTMLInputElement>document.createElement('input');
        id64Input.id = 'src_sid64tb';
        id64Input.type = 'text';
        id64Input.value = this.user.steamID64;
        id64Input.readOnly = true;

        id64Box.appendChild(id64Label);
        id64Box.appendChild(id64Input);

        srcElement.appendChild(privacyParag);
        srcElement.appendChild(permalinkParag);
        srcElement.appendChild(pendingReportsParag);
        srcElement.appendChild(id64Box);


        // External websites
        const extLinks = <HTMLUListElement>document.createElement('ul');
        extLinks.id = 'ext_links';

        const src = document.getElementById('steamrep_checker');
        src.appendChild(extLinks);
        if (this.settings.prefRep)
        extLinks.appendChild(Helpers.addExtLink('https://rep.tf/' + this.user.steamID64, Helpers.createImageElement(Icons.fiRep), 'Rep.tf'));                                           
        if (this.settings.prefBackpack)
            extLinks.appendChild(Helpers.addExtLink('https://backpack.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiTF2Bp), 'Backpack.tf')); 
        if (this.settings.prefTf2tools)
            extLinks.appendChild(Helpers.addExtLink('http://www.tf2tools.net/id/' + this.user.steamID64, Helpers.createImageElement(Icons.fiRep), 'Tf2tools.net'));                                           
        if (this.settings.prefTf2b)
            extLinks.appendChild(Helpers.addExtLink('https://tf2b.com/tf2/' + this.user.steamID64, Helpers.createImageElement(Icons.fiTf2b), 'Tf2b.com'));                                           
        if (this.settings.prefFabricator)
            extLinks.appendChild(Helpers.addExtLink('http://fabricator.tf/profile/' + this.user.steamID64, Helpers.createImageElement(Icons.fiFabricator), 'Fabricator.tf'));   
        if (this.settings.prefDotaBP)
            extLinks.appendChild(Helpers.addExtLink('https://dota2.backpack.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiDota2bp), 'Dota2.BP.TF'));
        if (this.settings.prefCSGOValue)
            extLinks.appendChild(Helpers.addExtLink('https://www.CSGOValue.com/?steamID=' + this.user.steamID64, Helpers.createImageElement(Icons.fiCSGOValue), 'CSGOValue.com'));
        if (this.settings.prefSteamgifts)
            extLinks.appendChild(Helpers.addExtLink('https://www.steamgifts.com/go/user/' + this.user.steamID64, Helpers.createImageElement(Icons.fiSteamgifts), 'SteamGifts.com'));
        if (this.settings.prefGoogle)
            extLinks.appendChild(Helpers.addExtLink('https://www.google.com/search?q=' + this.user.steamID64, Helpers.createImageElement(Icons.fiGoogle), 'Google'));
        if (this.settings.prefBazaar)
            extLinks.appendChild(Helpers.addExtLink('https://bazaar.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiBazaar), 'Bazaar.tf'));
        if (this.settings.prefCsgoLounge)
            extLinks.appendChild(Helpers.addExtLink('https://csgolounge.com/profile?id=' + this.user.steamID64, Helpers.createImageElement(Icons.fiCsgoLounge), 'CSGO Lounge'));
        if (this.settings.prefDota2Lounge)
            extLinks.appendChild(Helpers.addExtLink('https://dota2lounge.com/profile?id=' + this.user.steamID64, Helpers.createImageElement(Icons.fiDota2Lounge), 'Dota2Lounge.com'));
        if (this.settings.prefTf2Outpost)
            extLinks.appendChild(Helpers.addExtLink('https://www.tf2outpost.com/user/' + this.user.steamID64, Helpers.createImageElement(Icons.fiTf2Outpost), 'TF2Outpost.com'));
    }

    /**
     * Queries SteamRep.com for the reputation of a user
     */
    querySteamRep() {
        const sr_api_url = `https://steamrep.com/api/beta/reputation/${this.user.steamID64}?json=1&source=sr-check`;
        const src_rep = <HTMLAnchorElement>document.getElementById('src_rep');

        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: sr_api_url
        }, responseText => {
            if (responseText !== -1) {
                const responseObject = <ISRResponse>JSON.parse(responseText);
                this.reputation = responseObject.steamrep.reputation;
                src_rep.title = responseObject.steamrep.reputation;

                this.handleRep();
            } else {
                src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
            }
        });
    }

    /**
     * Parses the Steamrep response
     */
    handleRep() {
        if (this.reputation === "") {
            this.tagUser("");
            this.findPendingReports(this.user.steamID64);
        }
        else if (this.reputation.search(/(banned|scammer)/i) > -1) {
            this.tagUser("scammer");
            Helpers.createScammerWarningDialog();
        }
        else if (this.reputation.search(/(admin|middleman|valve employee|trusted)/i) > -1) {
            this.tagUser("trusted");

        }
        else if (this.reputation.search(/caution/i) > -1) {
            this.tagUser("caution")
        }
    }

    /**
     * adds a visual feedback according to the steamrep tags
     * @param tagType steamrep tag
     * @param reputation detailed tag
     */
    tagUser(tagType: string) {
        const srcRepElement = <HTMLAnchorElement>document.getElementById('src_rep');
        const personaName = document.querySelector('.actual_persona_name');

        let avatar = <HTMLElement>document.querySelector('.playerAvatar.profile_header_size');
        switch (tagType) {
            case "scammer":
                srcRepElement.textContent = " " + this.reputation;
                srcRepElement.className = "scammer";

                avatar.style.border = "2px solid #F00";
                personaName.className = personaName.className + " scammer";
                personaName.insertBefore(Helpers.createImageElement(Icons.ShieldRed), personaName.firstElementChild);
                break;
            case "caution":
                srcRepElement.textContent = " " + this.reputation;
                srcRepElement.className = "caution";

                avatar.style.border = "2px solid orange";
                personaName.className = personaName.className + " caution";
                personaName.insertBefore(Helpers.createImageElement(Icons.ShieldYellow), personaName.firstElementChild);
                break;
            case "trusted":
                srcRepElement.textContent = " " + this.reputation;
                srcRepElement.className = "trusted";

                avatar.style.border = "2px solid lime";
                personaName.className = personaName.className + " trusted";
                personaName.insertBefore(Helpers.createImageElement(Icons.ShieldGreen), personaName.firstElementChild);
                break;
            default:
                srcRepElement.textContent = "No special rep (there might be pending reports against this user)";
                break;
        }
    }

    /**
     * Searches the Steamrep forums for pending reports then updates the infobox accordingly
     *
     * @param steamID64 SteamID64 of the user
     */
    findPendingReports(steamID64: string) {
        const sr_reports_url = `https://forums.steamrep.com/search/search/.json?keywords=${steamID64}&o=date`;
        const src_rep = <HTMLAnchorElement>document.getElementById('src_rep');

        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: sr_reports_url
        }, function (responseText) {
            if (responseText !== -1) {
                const srResponse = JSON.parse(responseText);
                if (typeof (srResponse.status) !== "undefined") {
                    if ((srResponse.status === "ok") && (srResponse.message === "No results found.")) {
                        src_rep.title = "No special rep (0 pending reports)";
                        src_rep.textContent = " No special rep (0 pending reports)";
                    }
                } else {
                    src_rep.title = "There might be pending reports against this user";
                    src_rep.textContent = "No special rep (there might be pending reports against this user)";
                }
            } else {
                src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
            }
        });
    }
}

const checker = new SteamRepChecker();
checker.run();
