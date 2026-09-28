# Comfifoods Bazaar — single-iPad PWA

A static, free-to-run web app. No server account, subscription, Apple developer account, iPhone pairing, nearby connection, payment gateway, or cloud database is used. Orders and events are saved automatically in IndexedDB on the iPad. A service worker caches the app files for use after installation without internet.

## Screen-by-screen setup (Mac and iPad)

### A. Publish once from your Mac with free GitHub Pages

1. Download and unzip `Comfifoods-Bazaar-PWA.zip` on your Mac. Open the resulting `comfifoods-bazaar-pwa` folder. You should see `index.html`, `app.js`, `style.css`, `sw.js`, `manifest.webmanifest`, and `icon.svg`.
2. In Safari, open `https://github.com` and sign up for a free account (or sign in).
3. Click **+** at the top right → **New repository**. Repository name: `comfifoods-bazaar`. Select **Public**. Click **Create repository**. Public means the *app code* can be seen; bazaar data stays on the iPad and is never uploaded to this repository. Do not upload backup files.
4. On the repository page, click **Add file** → **Upload files**. Drag the six files **from inside** the unzipped folder onto the upload page (the files must be at the repository root). Click **Commit changes**.
5. Click **Settings** → **Pages**. Under **Build and deployment**, select **Deploy from a branch**. Select `main`, folder `/ (root)`, then **Save**. Wait a few minutes and refresh the Pages screen until it shows the published HTTPS link. It usually looks like `https://YOURNAME.github.io/comfifoods-bazaar/`.
6. On your Mac, open that link. Check that the Kiosk page appears. Bookmark or send the link to your iPad.

GitHub Pages screens may change; if the labels differ, look in the repository's Settings → Pages. A public Pages URL means anyone with the URL can open their own blank copy of the app. Each person's data stays in their own browser. For private code/URL, choose another free HTTPS static host with suitable terms.

### B. Install on your iPad

1. Connect the iPad to Wi-Fi. Open **Safari** (not an in-app browser), then open your published HTTPS link.
2. Wait until the app appears and the top right says **Saved on this iPad**. Leave the page open briefly so its offline files finish caching.
3. Tap Safari’s **Share** button (square with an up arrow) → **Add to Home Screen**. If you do not see it, scroll down in the Share sheet. Name it **Comfifoods Bazaar**, then tap **Add**.
4. Return to your Home Screen and tap the new **Bazaar** icon. Use this icon for daily operation. Avoid using a second Safari tab as another live register.
5. With Wi-Fi still on, open **Backup** and verify that the offline status says **Installed files cached for offline use**. Then turn Wi-Fi off, close and reopen the Home Screen app. Confirm that Kiosk, Products and Backup open. Turn Wi-Fi on again when finished testing.

Offline use starts only after the published app has loaded and its files have cached at least once. A fresh installation, restore onto a new iPad, or an app update requires internet once. Keep the published HTTPS site available for future installation. iPadOS can remove browser website data under storage pressure or if you clear Safari data, so export backups regularly.

### C. Set up your first bazaar

1. Tap **Products** → enter a cookie name and price in pesos → **Add**. Repeat for every variant. Use **Save product** to edit price or deactivate a variant. Every price change records its date, previous price and new price; completed and pending orders retain the price captured when they were placed.
2. Tap **Bazaar Report** → enter event name, location, booth fee, transport and other event costs → **Open bazaar**. Opening resets the event's stock counters and order number; earlier closed events remain in History.
3. Tap **Stock** → choose **Set opening stock** for each product and enter the quantities brought to the bazaar. For extra stock or taste tests, choose **Add or remove stock**. Enter a negative quantity for a taste test, damage or other removal.
4. Tap **Kiosk** → use **Show inventory** to reveal or hide the remaining quantities beneath product names. In landscape, the uniform product tiles appear beside **Your Order**. Use +/− to build a cart → tap **Place Cash order** or **Place GCash order**. This creates an awaiting-payment order and reserves its cookies.
5. Tap **Orders**. After receiving actual Cash or checking GCash in your own GCash app, tap **Confirm payment received**. This deducts stock and counts the sale. You can mark it Ready and Completed, or cancel an unpaid order. Canceling a paid order returns its stock.
6. Tap **Bazaar Report** to review confirmed sales, quantity, listed event costs and sales less those costs. Resolve all awaiting payments, then tap **Close bazaar**. The record moves to **History**. Export the current or historic event's **orders CSV** as needed.
7. Tap **Backup** → **Download full backup**. Save the `.json` file from Downloads into **Files** (preferably iCloud Drive or an external backup location). Do this at the end of every bazaar and before any update. CSV is for reporting; JSON is the complete restore file.

### D. Restore on the same or a replacement iPad

1. Install/open the PWA using section B. Place your saved full-backup `.json` file in the iPad's Files app.
2. In the PWA, tap **Backup** → **Choose backup file…** → select the JSON file → confirm the replacement.
3. Check **Products**, **History**, and **Bazaar Report**. Restore replaces everything currently saved in this app on that iPad.

## Important limits

- The attached Swift iOS project's data lives inside that native app's sandbox. This web app cannot read it directly. Re-enter your products, current stock, and any needed event information; there is no automatic transfer from the native app. Keep the native app until you verify the web app and a full backup.
- Data is local to this one iPad's installed web app. There is no device sync or remote recovery. Deleting the Home Screen app or Safari website data may delete local data. A full JSON backup is the recovery path.
- Cash and GCash are **manual confirmations**; the app does not connect to GCash, verify transactions, or charge customers.
- Listed event costs do not include ingredient, packaging, or labor costs. “Sales less listed costs” is not net profit.
- An event may cross midnight; timestamps store full dates and times. Closing at 4 AM on the next day is supported. Locking the iPad or closing the app does not close the bazaar.
- IndexedDB and service workers require a secure HTTPS URL (or localhost for development). Opening `index.html` directly from Files does not install an offline PWA.

## Developer check

Serve the six files from a secure static host. The app has no dependencies and sends no network requests for bazaar data. On every state change, the entire state is written in a single IndexedDB transaction. `sw.js` precaches all required local assets. A backup stores `format`, `version`, `exportedAt`, and the complete state. Restores validate the format and basic data shape and require confirmation.
