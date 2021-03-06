# What is Tabla?

A browser extension that helps you manage your tabs using a variety of tools.


<body>
    <h1>Key-Combo Tricks</h1>
    <h2>User Customizable Shortcuts</h2>
    <div class="userConfig">
        <p>If you search for "Tabla" on <a href="chrome://extensions/shortcuts">this keyboard configurations page</a> you will find 4 commands that can have any key-combination you prefer as the trigger</p>
        <details>
            <summary><b>New Tab Shortcut</b></summary>
            <p>
                Tabla's <b>"New Tab Here"</b> shortcut is uniquely different to the "New Tab" shortcut Chrome natively offers.
                <br><br>
                Try it out and see if you can spot the difference ;)
            </p>
        </details>
        <details>
            <summary><b>Activate Extension Button</b></summary>
            <p>
                Clicking the extension icon, or setting up a shortcut to <b>"Activate Extension"</b> provides another method of opening links in new tabs.
                <br><br>
                However, unlike Chrome's built-in method, Tabla is powerful enough to offer <b>multi-selection</b> of links using the <b>SHIFT</b> key!
            </p>
        </details>
        <details>
            <summary><b>Move Tab(s) Left/Right</b></summary>
            <p>
                <b>Drag'n'Drop</b> is all fine and fun... but it can be a bit imprecise, especially given the narrow margin of the top tab-bar.
                <br><br>
                Feel free to use Tabla's dedicated shortcut keys to deftly migrate tabs to and fro with ease, and more importantly, without ever having to worry about accidentally detaching tabs from the parent window because of an accidental drag past the minisicule vertical threshold Chrome offers you
            </p>
        </details>
        <details>
            <summary><b>Move Tab(s) Between Windows</b></summary>
            <p>
                Or you can use Tabla to move those tabs to another window as well. 
                <br><br>
                But no more time-consuming side-by-side window-alignment shennanigans, just toggle this shortcut as many times as you deem necessary till you've cycled through all of your open windows - even if they're living on another MacOS "Space" or Windows "Virtual Desktop"!
            </p>
        </details>
    </div>
    
<h2>Hard-Coded Hotkeys</h2>
    <div class="generalDirections">
        <p>
            <i>Unfortunately, due to a limitation of Chrome, Tabla can only offer up to 4 shortcuts that can be dynamically configured by the user</i>.
            The rest of this documentation is dedicated to all of the other tools, tricks and techniques that are hardcoded into Tabla to afford you even more exceptional control over your tab organization.
            <br><br>
            A few of these may be duplicates. 
            For instance, did you know that regardless of whether you set up your own shortcut for it, 
            you can still move the active-tab laterally along the tab-strip with <b>Ctrl+Right/Left</b>?
            <br><br>
            On the other hand, many of these are brand-new.
            Like the ability to "Pin" or "Unpin" the active-tab with <b>Ctrl+Up</b>
            <br><br>
            Whether they seem to be redundant functionality or a novel and new feature, all of the shortcuts describes moving forward have an associated checkbox that you can toggle on or off.
            So while you can't customize the key-combinations, you can still tweak Tabla's behavior to your tastes!
            Please take the time to read and understand each section so you can set up Tabla's settings to your particular needs and use-case :)
        </p>
        
<details>
            <summary><b>Un/Pin Behaviour Options</b></summary>
            <br>
            <input type="checkbox" name="options" id="enableUnPin"> "Pin" or "Unpin" the active-tab with <b>Ctrl+Up</b>
            <br>
            <input type="checkbox" name="options" id="keepFocusWhenPinning"> Keep focus on tab when pinning
            <br>
            <input type="checkbox" name="options" id="unpinToOriginalPos"> Move tab to original position when un-pinning
            <br><br>
        </details>

  <details>
            <summary><b>Moving Tabs <i>Within the Current Window</i></b></summary>
            <br>
            <input type="checkbox" name="options" id="enableTabRightLeft"> Move active-tab laterally along the tab-strip <i>one index position at-a-time</i> with <b>Ctrl+Right/Left</b>
            <br><br>
            <input type="checkbox" name="options" id="enableShiftRightLeft"> Enable <b>Ctrl+Shift+Right/Left</b> to move the active tab <b>all the way to the left</b> <i>(i.e. beginning of the tab-row,</b> immediately after your pinned-tabs)</i> or <b>all the way to the right</b> <i>(i.e. at the end of the window, as the very last tab)</i>
            <br><br>
            <input type="checkbox" name="options" id="disableWhileInTextbox"> Disable these controls when I'm editing a form-field <i>(i.e. a cursor prompt is actively blinking in a text-box)</i>
            <br><br>
        </details>
        
  <details>
            <summary><b>Move Tab <i>Between Windows</i></b></summary>
            <br>
            <input type="checkbox" name="options" id="enableShiftSpace"> Enable <b>Ctrl+Shift+Space</b> - bring current tab <b>to new window and back</b> 
            <span>[use <b>Alt</b> <i>to keep focus on previous window</i>]</span>
            <br><br>
            <input type="checkbox" name="options" id="enableShiftDown"> Enable <b>Ctrl+Shift+[Alt]+Down</b> - move current tab <b>to next Chrome Window</b> 
            <span>[use <b>Alt</b> <i>to keep focus on previous window</i>]</span>
            <br><br>
        </details>

  <details>
            <summary><b>Window Move/Resize Settings</b></summary>
            <br>
            <input type="checkbox" name="options" id="enableMoveWindowRightLeft"> Enable <b>Ctrl+Shift+</b><span class="inequality-sign">[</span> or <span class="inequality-sign">]</span> - <b>move</b> current Chrome window left/right <b>between monitors</b> (<i>moves only if other monitors exist</i>)
            <br><br>
            <input type="checkbox" name="options" id="enableResizeWindow"> Enable <b>Ctrl+Shift+</b><span class="inequality-sign">'</span> or <span class="inequality-sign">/</span> - <b>maximize or shrink</b> the current Chrome window by <input id="shrinkpercentage">%
            <br><br>
        </details>
    </div>

<h1>Context-Menu Tools</h1>
    <div class="generalDirections">
        <p>
            <b>Tabla offers a robust context-menu of options to select from</b> so you are spared such mental overhead of manually hunting down and clicking each time.
            <ol>
                <li>
                    Suppose you want to close all tabs to the right or left of (or even all others besides) your current one because that research has gone stale at this point in time?
                    <br>Tabla has a menu-item for that! &#9989;
                </li>
                <li>
                    Or what if you wanted to close a certain URL path? Or the root domain of that website? Or all tabs that are NOT from that domain?
                    <br>Take a look at all our menu-options, cuz Tabla's got you covered! &#9989;
                </li>
                <li>
                    Or perhaps, just maybe, you want to do something as simple as closing all duplicates because you accidentally or mistakenly clicked open the same link one too many times?
                    <br>Tabla de-duplication, at your service! &#9989;
                </li>
            </ol>
        </p>
    </div>
    <h1>Automation Techniques</h1>
    <div class="generalDirections">
        <h2>Pseudo-Pins</h2>
        <p>
            Assuming that your pinned tabs are your most-important resources that you'd rather not close right away, Tabla has a special feature that <b>automatically collates "pseudo-pinned tabs" all the way to the left-hand side of your window</b>
          <ol>
            <li>Consider these tabs <b>"temporary-yet-important"</b> tabs.</li>
            <li>Or <b>"urgent-yet-ephemeral"</b> resources. </li>
            <li>Perhaps they will be <b>regularly accessed until a certain deadline</b> passes, and afterwards you will no longer need them?</li>

          </ol>
            However you wish to utilize this "semi-permanence" feature, Tabla can <b>prioritize and set aside</b> certain <b>tabs that match a pattern</b> you deem to be significant.
        </p>
  <details>
        <summary><b>Regex Instructions</b></summary>
            <p>Enter one or more URL patterns below, one per line. Each pattern will be treated as a JavaScript regular expression. Tabs will be grouped on the left side of the tab bar and the groups will appear in the same order as they are listed here.</p>
            <p>For example, "^https://github.com" would group all GitHub tabs together.</p>
            <p>Set the Ignore Prefix to a regular expression that should be ignored when sorting tabs. For example, for GitHub pull requests, something like "\([0-9]+\)[ ]*" would keep tabs from being reordered when there are unread comments.</p>
            <p><em>Remember to hit "Save" when you're finished.</em></p>
        </details>
    </div>
    </div>
    <br><br>
    <h2>MRU and Limits</h2>
    <div class="generalDirections">
        <details>
            <summary><b>MRU</b> stands for "Most Recently Used."</summary>
            <p>
                In other words, turning this feature on automatically rearranges your tabs such that <br> 
                they are sorted by the order in which you accessed them from left to right. <br>
                <br>
                Simply put, just as your MacOS Dock and Windows Taskbar has functions via the concept of <br>
                "pinned apps" (located towards the far left) AND "recently accessed apps" <br>
                which goes roughly from left-to-right, so too will you always be able to see when and <br>
                in what order you accessed your tabs - after your pinned tabs first and foremost, of course <br>
                <br>
                However, Tabla takes this concept a step further by offerring an option to reorder your <br>
                pinned-tabs as well! That's right, so navigating from left-to-right via <b>Ctrl+Tab</b> <br>
                will traverse your unpinned tabs in order -- AND adding the <b>Shift</b> modifier key <br>
                will traverse your pinned tabs in order. After a configurable delay, Tabla will once again <br>
                migrate your currently active tab to the forefront once more :O
                <br><br>
                Additionally, you can also set a <b>"max tabs opened"</b> limit in this section as well <br>
                for a more focused browsing experience (and so that your system doesn't slow down from <br> 
                too many tabs consuming your computer's memory! 
            </p>
        </details>

</body>
</html>
