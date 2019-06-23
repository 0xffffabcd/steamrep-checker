/**
 * # The MIT License (MIT)
 *
 * Copyright (c) 2019 Nasreddine HOURIA
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
/**
 * settings class
 */
var Settings = /** @class */ (function () {
    function Settings() {
        this.prefBackpack = true;
        this.prefRep = true;
        this.prefDotaBP = true;
        this.prefSteamgifts = true;
        this.prefSteamTrades = true;
        this.prefGoogle = true;
        this.prefBazaar = true;
        this.prefCsgoLounge = true;
        this.prefDota2Lounge = true;
        this.csgoExchange = true;
    }
    return Settings;
}());
/**
 * Steam user object
 *
 * @type {{SteamID64: string, VacBanned: string, TradeBanState: string, IsLimitedAccount: string, Privacy: string}}
 */
var User = /** @class */ (function () {
    function User() {
        this.steamID64 = '';
        this.vacBanned = '';
        this.tradeBanState = '';
        this.isLimitedAccount = '';
        this.privacy = '';
    }
    return User;
}());
/**
 * Icon info
 */
var IconInfo = /** @class */ (function () {
    function IconInfo(height, width, source, altText, className, style) {
        this.height = height;
        this.width = width;
        this.src = source;
        this.alt = altText;
        this.className = className || '';
        this.style = style || '';
    }
    return IconInfo;
}());
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    /**
     * Create a custom info box on a Steam profile
     *
     * @param title title of the infobox
     */
    Helpers.createInfoBox = function (title) {
        var link = document.createElement('a');
        link.href = '#';
        link.id = 'src_rep';
        link.innerText = ' Checking Steamrep....';
        link.insertBefore(Helpers.createImageElement(Icons.Loading), link.firstChild);
        var b = document.createElement('b');
        b.textContent = 'Reputation : ';
        var p = document.createElement('p');
        p.appendChild(Helpers.createImageElement(Icons.fiSteamrep));
        p.appendChild(b);
        p.appendChild(link);
        var srcDiv = document.createElement('div');
        srcDiv.id = 'steamrep_checker';
        srcDiv.appendChild(p);
        var sccbg = document.createElement('div');
        sccbg.className = 'showcase_content_bg showcase_notes';
        sccbg.appendChild(srcDiv);
        var ctsc = document.createElement('div');
        ctsc.className = 'customtext_showcase';
        ctsc.appendChild(sccbg);
        var profileCustomBlockDiv = document.createElement('div');
        profileCustomBlockDiv.className = 'profile_customization_block';
        profileCustomBlockDiv.appendChild(ctsc);
        var profileCustomHeaderDiv = document.createElement('div');
        profileCustomHeaderDiv.id = 'profile_customization_header';
        profileCustomHeaderDiv.className = 'profile_customization_header ellipsis';
        profileCustomHeaderDiv.textContent = title;
        var infobox = document.createElement('div');
        infobox.setAttribute("id", "src_profile_customization");
        infobox.className = "profile_customization";
        infobox.appendChild(profileCustomHeaderDiv);
        infobox.appendChild(profileCustomBlockDiv);
        var elements = document.getElementsByClassName('profile_customization_area');
        if (elements.length > 0) {
            elements[0].insertBefore(infobox, elements[0].firstChild);
        }
        else {
            var customizationAreaDiv = document.createElement('div');
            customizationAreaDiv.className = 'profile_customization_area';
            var leftCol = document.querySelector('.profile_leftcol');
            customizationAreaDiv.appendChild(infobox);
            leftCol.insertBefore(customizationAreaDiv, leftCol.firstElementChild);
            var clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            document.querySelector('.profile_content_inner').appendChild(clearDiv);
        }
    };
    /**
     * create an image element
     * @param image
     * @returns {Element}
     */
    Helpers.createImageElement = function (image) {
        var imageElement = document.createElement("img");
        imageElement.height = image.height;
        imageElement.width = image.width;
        imageElement.src = image.src;
        imageElement.alt = image.alt;
        imageElement.className = image.className || "";
        imageElement.style.cssFloat = image.style || "";
        return imageElement;
    };
    /**
     * Create a warning dialog in case the Steam user is a known scammer
     */
    Helpers.createScammerWarningDialog = function () {
        var scammerWarningDialog = document.createElement('div');
        scammerWarningDialog.id = "openModal";
        scammerWarningDialog.setAttribute("class", "modalDialog");
        var warningDialogInnerDiv = document.createElement('div');
        var dialogCloseLink = document.createElement('a');
        dialogCloseLink.setAttribute("class", "close");
        dialogCloseLink.href = "javascript:";
        dialogCloseLink.title = "Close";
        dialogCloseLink.textContent = "\u2716";
        dialogCloseLink.addEventListener('click', function () {
            document.getElementById("openModal").style.opacity = "0";
            document.getElementById("openModal").style.pointerEvents = "none";
        });
        var dialogTitle = document.createElement('h2');
        dialogTitle.textContent = 'WARNING: SCAMMER';
        var dialogFirstParag = document.createElement('p');
        dialogFirstParag.textContent = ' This user has been marked as a scammer on SteamRep.com. ';
        dialogFirstParag.insertBefore(Helpers.createImageElement(Icons.ShieldRedBig), dialogFirstParag.firstChild);
        warningDialogInnerDiv.appendChild(dialogCloseLink);
        warningDialogInnerDiv.appendChild(dialogTitle);
        warningDialogInnerDiv.appendChild(dialogFirstParag);
        var dialogSecondParag = document.createElement('p');
        dialogSecondParag.textContent = "To protect yourself and prevent thieves from profiting, do not trade " +
            "with this person. Players shouldn't be encouraged to steal. Supporting them can hurt your reputation";
        warningDialogInnerDiv.appendChild(dialogSecondParag);
        scammerWarningDialog.appendChild(warningDialogInnerDiv);
        document.body.insertBefore(scammerWarningDialog, document.body.children[0]);
    };
    /**
     * Add a link to the external websites links list
     * @param href website url
     * @param image image element
     * @param text link text
     * @returns {Element} li element
     * todo add steambase64 id to href in calls to this method
     */
    Helpers.addExtLink = function (href, image, text) {
        var element = document.createElement('li');
        var link = document.createElement('a');
        link.href = href;
        link.textContent = ' ' + text;
        link.insertBefore(image, link.firstChild);
        element.appendChild(link);
        return element;
    };
    return Helpers;
}());
var Icons = {
    // Shields
    ShieldGreen: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_green_24.png"), "trusted", '', ''),
    ShieldYellow: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_yellow_24.png"), "caution", '', ''),
    ShieldRed: new IconInfo(24, 24, chrome.extension.getURL("icons/shield_red_24.png"), "scammer", '', ''),
    ShieldRedBig: new IconInfo(128, 128, chrome.extension.getURL("icons/shield_red_128.png"), "scammer", "", "left"),
    // Loading
    Loading: new IconInfo(16, 16, chrome.extension.getURL("icons/loading.gif"), "loading", "loading", ''),
    // Websites
    fiTF2Bp: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/bp.tf.png"), "Backpack.tf", "src_icon", ''),
    fiRep: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/rep.png"), "Rep.tf", "src_icon", ''),
    fiDota2bp: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/d2.bp.tf.png"), "D2.backpack.tf", "src_icon", ''),
    fiSteamgifts: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/st.png"), "SteamGifts", "src_icon", ''),
    fiStreamTrades: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/steamtrades.ico"), "SteamTrades", "src_icon", ''),
    fiGoogle: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/google.png"), "Google", "src_icon", ''),
    fiBazaar: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/bazaar.png"), "Bazaar.tf", "src_icon", ''),
    fiCsgoLounge: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/csgo_lounge.png"), "CSGO Lounge", "src_icon", ''),
    fiDota2Lounge: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/dota2_lounge.png"), "Dota 2 Lounge", "src_icon", ''),
    fiSteamrep: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/sr.png"), "Steamrep", "src_icon", ''),
    fiCsgoExchange: new IconInfo(16, 16, chrome.extension.getURL("icons/websites/csgo_exchange.png"), "CSGO Exchange", "src_icon", '')
};
var SteamRepChecker = /** @class */ (function () {
    function SteamRepChecker() {
        this.user = new User();
        this.settings = new Settings();
        this.reputation = "";
    }
    SteamRepChecker.prototype.run = function () {
        Helpers.createInfoBox("SteamRep Checker Report");
        this.getSteamInfo();
    };
    /**
     * retrieve the SteamID64 and the privacy level of a Steam profile
     */
    SteamRepChecker.prototype.getSteamInfo = function () {
        var _this = this;
        var profileInfoUrl = document.location.href + '/?xml=1';
        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: profileInfoUrl
        }, function (responseText) {
            if (responseText !== -1) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(responseText, "application/xml");
                var prop = doc.getElementsByTagName("steamID64");
                if (prop.length > 0) {
                    _this.user.steamID64 = prop[0].textContent;
                }
                prop = doc.getElementsByTagName("isLimitedAccount");
                if (prop.length > 0) {
                    _this.user.isLimitedAccount = prop[0].textContent;
                }
                prop = doc.getElementsByTagName("tradeBanState");
                if (prop.length > 0) {
                    _this.user.tradeBanState = prop[0].textContent;
                }
                prop = doc.getElementsByTagName("vacBanned");
                if (prop.length > 0) {
                    _this.user.vacBanned = prop[0].textContent;
                }
                prop = doc.getElementsByTagName("privacyState");
                if (prop.length > 0) {
                    _this.user.privacy = prop[0].textContent;
                }
                _this.displaySteamInfo();
                _this.querySteamRep();
            }
            else {
                document.getElementById('src_rep').textContent = 'Error getting the SteamID64';
            }
        });
    };
    /**
     * Display the the SteamID64, privacy level and adds links to 3rd party websites
     * to ease the background check
     */
    SteamRepChecker.prototype.displaySteamInfo = function () {
        var src_rep = document.getElementById('src_rep');
        src_rep.href = "https://steamrep.com/profiles/" + this.user.steamID64;
        var privacy = "";
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
        var srcElement = document.getElementById('steamrep_checker');
        var privacyParag = document.createElement('p');
        var privacyBold = document.createElement('b');
        privacyBold.textContent = 'Profile privacy : ';
        privacyParag.appendChild(privacyBold);
        privacyParag.appendChild(document.createTextNode(privacy));
        var permalinkParag = document.createElement('p');
        var permalinkBold = document.createElement('b');
        permalinkBold.textContent = 'Permalink : ';
        permalinkParag.appendChild(permalinkBold);
        var permalink = document.createElement('a');
        permalink.textContent = 'https://steamcommunity.com/profiles/' + this.user.steamID64;
        permalink.href = 'https://steamcommunity.com/profiles/' + this.user.steamID64;
        permalink.id = 'src_profile_permalink';
        permalinkParag.appendChild(permalink);
        var pendingReportsParag = document.createElement('p');
        var boldPendingReports = document.createElement('b');
        boldPendingReports.textContent = 'Pending reports : ';
        pendingReportsParag.appendChild(boldPendingReports);
        var pendingReportsLink = document.createElement('a');
        pendingReportsLink.textContent = 'Search SteamRep Forums';
        pendingReportsLink.id = 'src_pending_reports';
        pendingReportsLink.href = 'https://forums.steamrep.com/search/search/?keywords=' + this.user.steamID64 + '&o=date';
        pendingReportsParag.appendChild(pendingReportsLink);
        var id64Box = document.createElement('p');
        var id64Label = document.createElement('label');
        id64Label.textContent = 'SteamID64 : ';
        id64Label.htmlFor = 'src_sid64tb';
        var id64Input = document.createElement('input');
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
        var extLinks = document.createElement('ul');
        extLinks.id = 'ext_links';
        var src = document.getElementById('steamrep_checker');
        src.appendChild(extLinks);
        // TF2
        if (this.settings.prefBackpack)
            extLinks.appendChild(Helpers.addExtLink('https://backpack.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiTF2Bp), 'Backpack.tf'));
        if (this.settings.prefRep)
            extLinks.appendChild(Helpers.addExtLink('https://rep.tf/' + this.user.steamID64, Helpers.createImageElement(Icons.fiRep), 'Rep.tf'));
        if (this.settings.prefBazaar)
            extLinks.appendChild(Helpers.addExtLink('https://bazaar.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiBazaar), 'Bazaar.tf'));
        // Dota 2
        if (this.settings.prefDota2Lounge)
            extLinks.appendChild(Helpers.addExtLink('https://dota2lounge.com/profile?id=' + this.user.steamID64, Helpers.createImageElement(Icons.fiDota2Lounge), 'Dota2Lounge.com'));
        if (this.settings.prefDotaBP)
            extLinks.appendChild(Helpers.addExtLink('https://dota2.backpack.tf/profiles/' + this.user.steamID64, Helpers.createImageElement(Icons.fiDota2bp), 'Dota2.BP.TF'));
        // CSGO 
        if (this.settings.csgoExchange)
            extLinks.appendChild(Helpers.addExtLink('https://csgo.exchange/id/' + this.user.steamID64, Helpers.createImageElement(Icons.fiCsgoExchange), 'CSGO Exchange'));
        if (this.settings.prefCsgoLounge)
            extLinks.appendChild(Helpers.addExtLink('https://csgolounge.com/profile?id=' + this.user.steamID64, Helpers.createImageElement(Icons.fiCsgoLounge), 'CSGO Lounge'));
        // General
        if (this.settings.prefSteamgifts)
            extLinks.appendChild(Helpers.addExtLink('https://www.steamgifts.com/go/user/' + this.user.steamID64, Helpers.createImageElement(Icons.fiSteamgifts), 'SteamGifts.com'));
        if (this.settings.prefSteamTrades)
            extLinks.appendChild(Helpers.addExtLink('https://www.steamtrades.com/user/' + this.user.steamID64, Helpers.createImageElement(Icons.fiStreamTrades), 'SteamTrades.com'));
        if (this.settings.prefGoogle)
            extLinks.appendChild(Helpers.addExtLink('https://www.google.com/search?q=' + this.user.steamID64, Helpers.createImageElement(Icons.fiGoogle), 'Google'));
    };
    /**
     * Queries SteamRep.com for the reputation of a user
     */
    SteamRepChecker.prototype.querySteamRep = function () {
        var _this = this;
        var sr_api_url = "https://steamrep.com/api/beta/reputation/" + this.user.steamID64 + "?json=1&source=sr-check";
        var src_rep = document.getElementById('src_rep');
        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: sr_api_url
        }, function (responseText) {
            if (responseText !== -1) {
                var responseObject = JSON.parse(responseText);
                _this.reputation = responseObject.steamrep.reputation;
                src_rep.title = responseObject.steamrep.reputation;
                _this.handleRep();
            }
            else {
                src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
            }
        });
    };
    /**
     * Parses the Steamrep response
     */
    SteamRepChecker.prototype.handleRep = function () {
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
            this.tagUser("caution");
        }
    };
    /**
     * adds a visual feedback according to the steamrep tags
     * @param tagType steamrep tag
     * @param reputation detailed tag
     */
    SteamRepChecker.prototype.tagUser = function (tagType) {
        var srcRepElement = document.getElementById('src_rep');
        var personaName = document.querySelector('.actual_persona_name');
        var avatar = document.querySelector('.playerAvatar.profile_header_size');
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
    };
    /**
     * Searches the Steamrep forums for pending reports then updates the infobox accordingly
     *
     * @param steamID64 SteamID64 of the user
     */
    SteamRepChecker.prototype.findPendingReports = function (steamID64) {
        var sr_reports_url = "https://forums.steamrep.com/search/search/.json?keywords=" + steamID64 + "&o=date";
        var src_rep = document.getElementById('src_rep');
        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: sr_reports_url
        }, function (responseText) {
            if (responseText !== -1) {
                var srResponse = JSON.parse(responseText);
                if (typeof (srResponse.status) !== "undefined") {
                    if ((srResponse.status === "ok") && (srResponse.message === "No results found.")) {
                        src_rep.title = "No special rep (0 pending reports)";
                        src_rep.textContent = " No special rep (0 pending reports)";
                    }
                }
                else {
                    src_rep.title = "There might be pending reports against this user";
                    src_rep.textContent = "No special rep (there might be pending reports against this user)";
                }
            }
            else {
                src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
            }
        });
    };
    return SteamRepChecker;
}());
var checker = new SteamRepChecker();
checker.run();
