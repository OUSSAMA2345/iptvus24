# Research ledger — priorities 1–5

Research date: 27 November 2026. This ledger covers only the five completed drafts. It does not claim that priorities 6–20 have been researched or written.

## Method and limits

For each of the first five topics, current search-result extracts were examined before drafting. Official documentation was used to verify platform behavior, the player's role, and XMLTV semantics. Competitor observations below describe the sampled results, not guaranteed ranking positions in every country or a comprehensive competitive crawl. No competitor prose was copied into the articles.

The content offers original diagnostic organization, fictional worked examples clearly labeled as such, and conditional reasoning. It does not claim laboratory testing, customer case studies, professional certifications, independent expert review, a web-wide plagiarism clearance, or guaranteed superiority/rankings. Menu paths are qualified where versions differ.

## Primary sources consulted

1. Amazon: [Fire TV network troubleshooting](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYMDPRQTTLXQD7PL). Retrieved the current help page; confirms network status access through Settings → Network → Play/Pause, with additional tools on compatible models, reconnection and restart steps. Model-specific capabilities must not be generalized.
2. Amazon: [Clear app data and cache](https://www.amazon.com/gp/help/customer/display.html?nodeId=GJZBJS5B8VBCGQ48). Retrieved the help page; confirms app-management path and the existence of distinct cache/data operations. Our guidance protects configuration before a data reset rather than treating both buttons as interchangeable.
3. Amazon: [App crashes or will not load](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYANE8DXAEUXTTFX). Retrieved the full help article; supports restart, app recovery, update and reinstall options, not a diagnosis that all crashes are cache problems.
4. Amazon Developer: [Vega announcement, 30 September 2025](https://developer.amazon.com/apps-and-games/blogs/2025/09/announcing-vega-os). Retrieved the article; confirms Fire TV Stick 4K Select introduced Vega, a separate development target, while Fire OS continues. Avoid blanket Android-package installation advice for all Fire TV models.
5. Amazon: [Disabled apps and unlicensed content FAQ](https://www.amazon.com/gp/help/customer/display.html?nodeId=TcmGzCrZPsL5bVHE3Z). Retrieved the policy page. An explicit disabled-app notice is distinct from an outage, login error or absent regional app listing. No enforcement-bypass instructions included.
6. [TiviMate official website](https://tivimate.com/). Retrieved current text: player only; own playlists required; premium unlocks features, not content; intended for Android TV, not optimized for phones/tablets. The page is not a full version-specific menu manual, so the articles do not present every menu label as officially verified or claim unverified permanent mapping behavior.
7. [XMLTV DTD](https://github.com/XMLTV/xmltv/blob/master/xmltv.dtd), also linked in articles at its [raw source](https://raw.githubusercontent.com/XMLTV/xmltv/master/xmltv.dtd). Search extracts were inspected. Page/raw fetch tools failed, so the actual DTD was retrieved through the GitHub contents API using `gh api repos/XMLTV/xmltv/contents/xmltv.dtd` and decoded locally. Verified channel/programme structure and timestamp conventions, including explicit offsets and the UTC assumption when no zone is specified. No claim that all feeds are explicitly marked UTC.

## Priority 1 — firestick buffering but internet is fine

Search: `firestick buffering but internet is fine Amazon Fire TV buffering support WiFi`.

Sampled competing results:
- [Dignited buffering guide](https://www.dignited.com/91598/how-to-better-internet-speeds-fire-tv-fix-buffering/)
- [SpeedtestHQ Fire Stick guide](https://speedtesthq.com/guides/streaming/firestick-slow-streaming-fix)
- [Manbolo buffering guide](https://www.manbolo.com/why-does-my-fire-tv-stick-keep-buffering/)

Observed gaps in extracts: strong claims that Ethernet eliminates buffering permanently; oversimplified conclusions from a fast speed test; heat diagnoses based on elapsed minutes; evening symptoms attributed to throttling without adequate evidence; VPN recommendations ahead of isolation.

Article angle: test the delivery chain rather than upgrade the broadband package. Adds symptom classification, same-device app comparisons, lower-demand and wired tests, interpretation limits, heat/power safety, and a useful support report. Illustrative bitrate arithmetic is explicitly an example, not a universal bandwidth requirement.

Intent boundary: Fire TV playback pauses, not app installation, general multi-device buffering, or router association failures. Links to the app-failure article instead of duplicating its full workflow.

## Priority 2 — iptv epg not updating

Search: `IPTV EPG not updating XMLTV guide troubleshooting gzip timezone`.

Sampled competing results:
- [IPTV Vendors guide](https://iptvvendors.com/fix-iptv-epg-not-working/)
- [IPTVUPG explanation](https://www.iptvupg.com/docs/iptv-epg-explained)
- [EPG XMLTV sync guide](https://virginmediauk.com/step-by-step-epg-xmltv-sync-guide-keep-your-iptv-showtimes-correct/)

Observed gaps: successful retrieval conflated with useful/current coverage; claims that EPG is universally transmitted in UTC; fixed seasonal offsets; suggestions that an account integration guarantees matching; weak distinction between source compression, transport and local storage.

Article angle: retrieval → parsing → matching → coverage. Adds an original valid XMLTV example, file modification versus schedule freshness, cautious identifier repair, double-timezone-correction avoidance, compression differences and private credential handling.

Intent boundary: cross-player EPG freshness and transport diagnosis. The TiviMate article owns the product-specific blank-row/mapping workflow; the existing short EPG overview remains a basic definition article.

## Priority 3 — iptv app not working on firestick

Search: `IPTV app not working on Firestick Amazon clear cache app crashes Vega OS`.

Sampled competing results:
- [Grapevine app-blocking explanation](https://store.grapevine.is/blogs/news/iptv-app-blocked-firestick)
- [Global TV troubleshooting](https://globall-tv.com/iptv-not-working-on-firestick-fix/)
- [IPTVJudge troubleshooting](https://iptvjudge.com/iptv-not-working-fixes/)

Observed gaps: generalized APK/Android instructions; app purchase confused with provider access; resets proposed without a recovery plan; all black screens or app failures treated as source problems; weak separation of an explicit platform notice and normal failures.

Article angle: last successful stage—discovery, installation, launch, authentication, import, playback. Includes current multi-OS context from Amazon, restrained cache/data guidance, account-method distinctions, no bypass instructions, and a support handoff based on the actual failing component.

Intent boundary: Fire TV app lifecycle and account setup. The dedicated buffering article handles repeated playback pauses; the playlist-processing article handles the import spinner.

## Priority 4 — tivimate epg no information

Search: `TiviMate EPG no information official support EPG source channel id`.

Sampled competing results:
- [TiviMatePremiumTV EPG guide](https://tivimatepremiumtv.com/tivimate-epg/)
- [TVimate.co EPG setup](https://tvimate.co/tivimate-epg-setup/)
- [TopIPTVServices EPG guide](https://topiptvservices.com/tivimate-epg/)
- [Community mapping discussion](https://www.reddit.com/r/TiviMate/comments/11fckrf/epg_from_elsewhere/)

These similarly named third-party domains are not treated as official TiviMate documentation.

Observed gaps: unqualified claims about automatic/permanent mapping; hard-coded wait times and source URLs; blanket conclusions from one working row; insufficient regional/timeshift verification; a missing guide treated as failed video.

Article angle: one channel, one source, one interval. Adds control-channel comparisons, version-qualified function labels, careful source-to-playlist assignment, one-row mapping tests, regional verification, source-overlap management, and three fictional diagnostic examples with distinct outcomes.

Intent boundary: TiviMate's blank guide rows and mapping, not generic file transport. XMLTV mechanics are summarized only as needed and linked to priority 2.

## Priority 5 — tivimate playlist is processed please wait

Search: `tivimate playlist is processed please wait stuck fix`.

Sampled competing/community results:
- [Reddit: Add Playlist stuck at processing](https://www.reddit.com/r/TiviMate/comments/ohf0dr/add_playlist_just_gets_stuck_at_processing/)
- [Techkings: Add Playlist error](https://www.techkings.org/threads/tivimate-add-playlist-error.174021/)
- [Reddit: playlist errors](https://www.reddit.com/r/TiviMate/comments/1g1l5gy/error_processing_playlist/)
- [Reddit: error-message discussion](https://www.reddit.com/r/TiviMate/comments/1qlkrog/getting_this_error_message/)

Observed gaps: anecdotal fixes presented as universal; guessed endpoint construction; VPN/DNS and format changes without stage isolation; deleting working playlists before protecting favorites; little distinction between retrieval, parsing and catalogue construction.

Article angle: controlled import-state diagnosis. Adds response versus website reachability, documented endpoint validation, a provider-supported reduced-catalogue test, safe app recovery, minimal illustrative M3U structure, and limits on interpreting another player/network/device comparison. No fixed import-time guarantee or undocumented compatibility matrix.

Intent boundary: import-stage stalls. Guide mapping and video playback get contextual links, not duplicated full chapters.

## Structured-data research

Google's current [Search documentation changelog](https://developers.google.com/search/updates#removing-faq-rich-result) records removal of FAQ rich-result documentation in June 2026 after the feature stopped appearing. FAQPage remains included because it was requested and describes visible questions/answers; it is **not** presented as a way to obtain Google FAQ rich results. Article markup, answer-first sections and clear entities do not guarantee featured snippets, AI Overviews, ChatGPT/Gemini/Perplexity citations, indexing or rankings.

## Outstanding research

Priorities 6–20 require their own current official-source and competitive-result research before drafting. Do not recycle the first five ledgers as evidence that the remaining subjects were researched.
