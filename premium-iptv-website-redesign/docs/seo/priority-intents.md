# Priority query, intent and linking inventory

All 20 targets passed the rendered canonical/H1/sitemap/social/schema contracts. The scope column is an editorial boundary, not a conclusion from Search Console. Inbound counts exclude hub links and the source article itself; “body” excludes templated related links.

| # | Published slug / primary query | Retained intent boundary | Body inbound before → after |
| --- | --- | --- | --- |
| 1 | `firestick-buffering-but-internet-is-fine`<br>**firestick buffering but internet is fine** | Fire TV playback pauses after the app and network connection work; not Wi-Fi association or app launch. | 4 → 4 |
| 2 | `iptv-epg-not-updating`<br>**iptv epg not updating** | A cross-player guide that is stale, missing coverage or failing retrieval; not an XMLTV definition or TiviMate-only mapping. | 3 → 3 |
| 3 | `iptv-app-not-working-on-firestick`<br>**iptv app not working on firestick** | One compatible Fire TV app fails at installation, launch, login or playback; not a missing device display. | 4 → 4 |
| 4 | `tivimate-epg-no-information`<br>**tivimate epg no information** | TiviMate guide rows are blank or mapped incorrectly while the playlist exists; not a general XMLTV explainer. | 3 → 3 |
| 5 | `tivimate-playlist-is-processed-please-wait`<br>**tivimate playlist is processed please wait** | TiviMate stalls while importing a catalogue, before channel or guide troubleshooting. | 2 → 2 |
| 6 | `mag-box-portal-not-loading`<br>**mag box portal not loading** | Linux MAG embedded portal cannot load the operator interface; not an Android player or an individual failed stream. | 0 → 1 |
| 7 | `iptv-channels-not-loading`<br>**iptv channels not loading** | Distinguish missing catalogue from failing media requests in a player that opens. | 3 → 3 |
| 8 | `iptv-app-keeps-crashing`<br>**iptv app keeps crashing** | Process exits or a device reboots; distinguish runtime failures from buffering and unavailable channels. | 5 → 5 |
| 9 | `iptv-app-not-working-on-samsung-tv`<br>**iptv app not working on samsung tv** | A single IPTV app on Samsung Tizen fails; unrelated apps may work. | 1 → 1 |
| 10 | `iptv-app-not-available-on-lg-tv`<br>**iptv app not available on lg tv** | LG webOS listing or installation eligibility by exact model, region and publisher; not generic runtime troubleshooting. | 0 → 1 |
| 11 | `firestick-black-screen-after-logo`<br>**firestick black screen after logo** | Fire TV startup/display path disappears before the home screen; not black video inside a working app. | 0 → 1 |
| 12 | `how-to-organize-iptv-channels`<br>**how to organize iptv channels** | Curate favorites, hide groups and preserve identifiers across refreshes; not player purchasing or EPG transport. | 3 → 3 |
| 13 | `what-is-xmltv-epg`<br>**what is xmltv epg** | Understand schedule format, channel identifiers and timestamps; not a generic stale-guide repair checklist. | 2 → 3 |
| 14 | `iptv-player-vs-iptv-service`<br>**iptv player vs iptv service** | Separate software features, media entitlement, payments and support responsibilities; not a brand-versus-brand review. | 5 → 5 |
| 15 | `tivimate-vs-iptv-smarters`<br>**tivimate vs iptv smarters** | Compare exact official player editions by platform and household tasks; no invented ratings or provider recommendations. | 0 → 1 |
| 16 | `firestick-not-connecting-to-wifi-but-other-devices-will`<br>**firestick not connecting to wifi but other devices will** | Fire TV fails discovery, authentication, addressing or basic connectivity; not buffering after connection. | 1 → 1 |
| 17 | `samsung-tv-apps-not-working-but-connected-to-internet`<br>**samsung tv apps not working but connected to internet** | Multiple unrelated Samsung apps fail on a seemingly connected TV; shared Smart Hub and network diagnostics. | 1 → 1 |
| 18 | `android-tv-storage-space-running-out`<br>**android tv storage space running out** | Persistent capacity cleanup, cache/data distinction and supported USB storage; not RAM or every app crash. | 1 → 1 |
| 19 | `streaming-buffering-but-internet-is-fine`<br>**streaming buffering but internet is fine** | Cross-device sustained delivery, source and decoding comparisons despite a fast speed test; Fire TV specifics live elsewhere. | 1 → 2 |
| 20 | `how-does-iptv-work-on-firestick`<br>**how does iptv work on firestick** | Conceptual device-app-service request chain and Fire OS/Vega compatibility; not a repetitive installation recipe. | 0 → 1 |

## Curated related paths

These are runtime article recommendations; body-context inbound sources are enumerated separately in `after.json`.

- **firestick-buffering-but-internet-is-fine** → `streaming-buffering-but-internet-is-fine`, `firestick-not-connecting-to-wifi-but-other-devices-will`, `iptv-app-not-working-on-firestick`
- **iptv-epg-not-updating** → `what-is-xmltv-epg`, `tivimate-epg-no-information`, `iptv-channels-not-loading`
- **iptv-app-not-working-on-firestick** → `firestick-black-screen-after-logo`, `firestick-not-connecting-to-wifi-but-other-devices-will`, `iptv-app-keeps-crashing`
- **tivimate-epg-no-information** → `iptv-epg-not-updating`, `what-is-xmltv-epg`, `tivimate-playlist-is-processed-please-wait`
- **tivimate-playlist-is-processed-please-wait** → `iptv-channels-not-loading`, `tivimate-epg-no-information`, `android-tv-storage-space-running-out`
- **mag-box-portal-not-loading** → `iptv-channels-not-loading`, `iptv-player-vs-iptv-service`, `streaming-buffering-but-internet-is-fine`
- **iptv-channels-not-loading** → `mag-box-portal-not-loading`, `iptv-app-keeps-crashing`, `iptv-epg-not-updating`
- **iptv-app-keeps-crashing** → `android-tv-storage-space-running-out`, `iptv-channels-not-loading`, `iptv-app-not-working-on-firestick`
- **iptv-app-not-working-on-samsung-tv** → `samsung-tv-apps-not-working-but-connected-to-internet`, `iptv-app-not-available-on-lg-tv`, `iptv-channels-not-loading`
- **iptv-app-not-available-on-lg-tv** → `iptv-app-not-working-on-samsung-tv`, `iptv-player-vs-iptv-service`, `tivimate-vs-iptv-smarters`
- **firestick-black-screen-after-logo** → `iptv-app-not-working-on-firestick`, `firestick-not-connecting-to-wifi-but-other-devices-will`, `firestick-buffering-but-internet-is-fine`
- **how-to-organize-iptv-channels** → `what-is-xmltv-epg`, `tivimate-vs-iptv-smarters`, `iptv-player-vs-iptv-service`
- **what-is-xmltv-epg** → `iptv-epg-not-updating`, `tivimate-epg-no-information`, `how-to-organize-iptv-channels`
- **iptv-player-vs-iptv-service** → `tivimate-vs-iptv-smarters`, `how-does-iptv-work-on-firestick`, `mag-box-portal-not-loading`
- **tivimate-vs-iptv-smarters** → `iptv-player-vs-iptv-service`, `how-to-organize-iptv-channels`, `iptv-app-not-available-on-lg-tv`
- **firestick-not-connecting-to-wifi-but-other-devices-will** → `firestick-buffering-but-internet-is-fine`, `iptv-app-not-working-on-firestick`, `firestick-black-screen-after-logo`
- **samsung-tv-apps-not-working-but-connected-to-internet** → `iptv-app-not-working-on-samsung-tv`, `streaming-buffering-but-internet-is-fine`, `iptv-app-keeps-crashing`
- **android-tv-storage-space-running-out** → `iptv-app-keeps-crashing`, `tivimate-playlist-is-processed-please-wait`, `how-to-organize-iptv-channels`
- **streaming-buffering-but-internet-is-fine** → `firestick-buffering-but-internet-is-fine`, `samsung-tv-apps-not-working-but-connected-to-internet`, `iptv-channels-not-loading`
- **how-does-iptv-work-on-firestick** → `iptv-player-vs-iptv-service`, `iptv-app-not-working-on-firestick`, `what-is-xmltv-epg`
